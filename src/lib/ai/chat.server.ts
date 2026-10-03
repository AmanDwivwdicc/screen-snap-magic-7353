import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const MODEL = "openai/gpt-6-astra";
const GATEWAY = "https://ai.gateway.lovable.dev/v1";

function systemPrompt(lang: string) {
  return `You are Saathi, the warm AI career mentor inside CareerSaathi ("Your Career. Your Future. Your Family."), an Indian platform for vocational education and skilling.

Personality: a supportive elder sibling / friend. Natural, warm, simple words, zero jargon, never robotic or formal. Short replies (2-5 sentences usually), one question at a time. Use the student's name if known. Light emoji is fine occasionally.

Approach — never just announce "your career is X". Guide them through: UNDERSTAND → DISCOVER → EXPLORE → COMPARE → DISCUSS WITH FAMILY → DECIDE → PLAN. Ask about interests, strengths, location, family situation and worries first.

Address family concerns honestly: income (give realistic Indian ranges in ₹/month for entry level and growth), job security, career growth, social perception, safety, local opportunities, further education, NSQF levels and progression, ITI/polytechnic/PMKVY training quality, placement outcomes. Respect parents' wish for stability — help student and family decide together. If you're unsure of a number say so and suggest verifying on official sources (NCVET, Skill India, NCS portal). If the student is distressed or needs more help, suggest talking to a human counsellor.

Reply language: ${lang === "hi" ? "Hindi (Devanagari), simple conversational Hinglish words are OK" : "English (simple Indian English)"}.

FORMAT RULE (mandatory): Begin EVERY reply with exactly one hidden mood tag that matches your emotional tone, one of: [[mood:neutral]] [[mood:happy]] [[mood:empathetic]] [[mood:encouraging]] [[mood:curious]] — then the reply. Use light markdown only (bold, short lists).`;
}

function json(status: number, error: string) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function partsText(m: UIMessage) {
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .trim();
}

export async function handleChat(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const token = auth.replace(/^Bearer\s+/i, "");
  if (!token) return json(401, "Please sign in again.");

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return json(500, "AI is not configured.");

  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData.user) return json(401, "Please sign in again.");
  const userId = userData.user.id;

  let body: { messages?: UIMessage[]; threadId?: string; lang?: string };
  try {
    body = await request.json();
  } catch {
    return json(400, "Invalid request.");
  }
  const messages = body.messages;
  const threadId = body.threadId;
  if (!Array.isArray(messages) || messages.length === 0 || !threadId) return json(400, "Invalid request.");

  const { data: thread } = await supabase
    .from("threads")
    .select("id, title")
    .eq("id", threadId)
    .maybeSingle();
  if (!thread) return json(404, "Conversation not found.");

  // persist latest user message
  const last = messages[messages.length - 1];
  if (last.role === "user") {
    const { error } = await supabase
      .from("messages")
      .upsert(
        { thread_id: threadId, user_id: userId, sdk_id: last.id, role: "user", parts: last.parts as never },
        { onConflict: "thread_id,sdk_id", ignoreDuplicates: true },
      );
    if (error) console.error("save user message failed", error);
    const patch: { updated_at: string; title?: string } = { updated_at: new Date().toISOString() };
    if (thread.title === "New conversation") patch.title = partsText(last).slice(0, 60) || "New conversation";
    await supabase.from("threads").update(patch).eq("id", threadId);
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: systemPrompt(body.lang ?? "en"),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const response = result.toUIMessageStreamResponse({
    originalMessages: messages,
    sendReasoning: false,
    onFinish: async ({ responseMessage }) => {
      const { error } = await supabase.from("messages").upsert(
        {
          thread_id: threadId,
          user_id: userId,
          sdk_id: responseMessage.id,
          role: "assistant",
          parts: responseMessage.parts.filter((p) => p.type === "text") as never,
        },
        { onConflict: "thread_id,sdk_id", ignoreDuplicates: true },
      );
      if (error) console.error("save assistant message failed", error);
    },
    onError: (err) => {
      console.error("chat stream error", err);
      const status = (err as { statusCode?: number })?.statusCode;
      if (status === 402) return "AI credits are used up. Please add credits to continue.";
      if (status === 429) return "Too many requests right now — please wait a moment and try again.";
      return "Saathi couldn't answer just now. Please try again.";
    },
  });
  return withLovableAiGatewayRunIdHeader(response, runIdFetch);
}
