# CareerSaathi — AGENTS.md

## 1. Project Overview

**CareerSaathi** is an AI-enabled career counselling and family decision-support platform for vocational education, developed for the Smart India Hackathon.

The core idea is:

> **An AI career mentor that talks to students like a supportive friend while helping students and families make informed career decisions using simple, localized and evidence-backed information.**

The platform is designed around the reality that career decisions in India are often made jointly by students and their families.

CareerSaathi should therefore address both:

- Student aspirations
- Parent/family concerns

Common family concerns include:

- Income potential
- Job security
- Career growth
- Safety
- Social perception
- Further education
- Local employment opportunities
- Long-term career progression

---

# 2. CURRENT IMPLEMENTATION STATUS

The current application already contains the following working functionality:

### Implemented

- AI mentor named **Saathi**
- Illustrated AI avatar
- Animated avatar states
- Avatar breathing
- Avatar blinking
- Avatar eye movement
- Avatar thinking/head movement
- Listening state
- Talking animation
- Mouth movement
- Hand movement
- Emotion-based avatar reactions
- Happy state
- Caring state
- Encouraging state
- Curious state
- Voice conversation
- English voice support
- Hindi voice support
- Text chat fallback
- Microphone interaction
- Mute AI voice
- Stop AI speech
- Replay previous AI response
- User authentication
- Email authentication
- Google authentication
- Email confirmation flow
- User-specific conversations
- Multiple conversations
- New conversation
- Conversation switching
- Conversation deletion
- Persistent conversation history
- AI mentor-style conversational behavior

The current AI is intentionally designed to behave like a **mentor**, not a quiz.

Saathi should ask questions and understand the user before suggesting career directions.

---

# 3. IMPORTANT — DO NOT BREAK EXISTING FUNCTIONALITY

The following features are already implemented and should be treated as protected functionality:

```text
AI Avatar
Voice interaction
Hindi/English voice
Text chat
Authentication
Google login
Email verification
Conversation persistence
Conversation switching
Conversation deletion
Avatar animations
Avatar emotion states
```

Before modifying any of these:

1. Inspect the existing implementation.
2. Understand its dependencies.
3. Preserve existing behavior.
4. Make the smallest safe change.
5. Test the affected flow.

Do NOT replace a working implementation with a completely new architecture unless absolutely necessary.

Do NOT recreate authentication if it already exists.

Do NOT recreate the avatar if the requested change can be implemented within the existing avatar architecture.

---

# 4. PRODUCT PHILOSOPHY

CareerSaathi should NOT become a generic chatbot.

The product experience should feel like:

> "I'm talking to a friendly career mentor who understands my situation."

Not:

> "I'm filling out a career recommendation form."

The AI should follow:

```text
UNDERSTAND
    ↓
ASK QUESTIONS
    ↓
IDENTIFY INTERESTS
    ↓
UNDERSTAND FAMILY CONCERNS
    ↓
EXPLORE OPTIONS
    ↓
COMPARE
    ↓
DISCUSS WITH FAMILY
    ↓
MAKE AN INFORMED DECISION
    ↓
CREATE AN ACTION PLAN
```

The AI should support decision-making, not make the decision for the user.

---

# 5. AI PERSONALITY

Saathi should behave like a knowledgeable older friend and mentor.

Personality:

- Friendly
- Warm
- Empathetic
- Patient
- Encouraging
- Curious
- Respectful
- Non-judgmental
- Evidence-oriented
- Simple
- Context-aware

Saathi should use natural conversational language.

Prefer:

> "I understand why you're worried. Let's look at both options together."

Instead of:

> "Your profile indicates a high probability of success in this career."

---

# 6. AI CONVERSATION BEHAVIOR

Saathi should NOT immediately recommend a career.

The conversation should first understand:

- Education
- Interests
- Skills
- Preferences
- Location
- Career goals
- Family expectations
- Family concerns
- Financial priorities
- Preference for staying near home
- Interest in further education

Example:

User:

> "I like computers but my parents want me to do engineering."

Saathi:

> "I understand. Your parents probably want to make sure you have a secure future. Let's first understand what you enjoy and then compare the different paths together."

The AI should ask follow-up questions naturally.

Avoid turning the conversation into a rigid questionnaire.

---

# 7. AI TRUST RULES

Saathi must NOT:

- Guarantee employment
- Guarantee salary
- Guarantee placement
- Invent statistics
- Invent government data
- Invent training-provider outcomes
- Manipulate parents
- Pressure students
- Claim one career is universally best
- Present uncertain information as fact
- Make decisions on behalf of the family

Saathi SHOULD:

- Explain
- Compare
- Ask questions
- Provide evidence
- Explain uncertainty
- Present multiple reasonable options
- Encourage discussion
- Recommend human counselling when necessary

---

# 8. CURRENT UI STRUCTURE

The main counselling experience currently consists of:

```text
┌─────────────────────────────────────────────┐
│                                             │
│               AI AVATAR                    │
│                 SAATHI                      │
│                                             │
│                                             │
├──────────────────────────┬──────────────────┤
│                          │                  │
│                          │   CHAT           │
│                          │                  │
│                          │                  │
│                          │                  │
├──────────────────────────┴──────────────────┤
│       Microphone / Text Input / Controls    │
└─────────────────────────────────────────────┘
```

Desktop should keep the avatar visually prominent.

Mobile should adapt to:

```text
Avatar
  ↓
Conversation
  ↓
Voice / Text controls
```

Do not allow secondary UI elements to overpower the avatar.

---

# 9. AVATAR REQUIREMENTS

Saathi's avatar is one of the primary differentiators of CareerSaathi.

Current avatar behaviors include:

### Idle

- Breathing
- Blinking
- Looking around

### Listening

- Hands relatively still
- Attentive expression
- Eye focus

### Thinking

- Head tilt
- Thoughtful expression

### Speaking

- Mouth movement
- Hand movement
- Natural animation

### Emotional states

Supported/relevant states include:

```text
happy
caring
encouraging
curious
```

When modifying the avatar, preserve these states.

Future states may include:

```text
empathetic
concerned
celebrating
confused
excited
```

Do not make emotional transitions random.

Avatar emotion should correspond to conversation context.

---

# 10. VOICE EXPERIENCE

Voice is an important part of CareerSaathi.

Current behavior:

```text
Microphone
    ↓
User speaks
    ↓
Speech recognition
    ↓
AI response
    ↓
Text response
    ↓
Speech synthesis
    ↓
Avatar speaking animation
```

Supported languages:

- English
- Hindi

Voice controls include:

- Start listening
- Stop listening
- Mute
- Stop current response
- Replay response

Typing must remain available as a fallback.

Voice may work differently depending on browser capabilities.

Chrome and Edge are preferred for voice testing.

Do not assume every browser provides identical speech APIs.

---

# 11. CONVERSATION PERSISTENCE

Users can:

- Create conversations
- Switch conversations
- Continue previous conversations
- Delete conversations

Conversation history is user-specific.

Never expose one user's conversations to another user.

When modifying conversation storage:

- Preserve user ownership
- Preserve ordering
- Preserve timestamps
- Preserve message roles
- Preserve deletion behavior

---

# 12. AUTHENTICATION

Authentication already exists.

Current supported methods:

- Email
- Google

Email confirmation is required for new email accounts.

Do not bypass or weaken authentication just to make development easier.

The application should support authenticated and unauthenticated states correctly.

Protect user-specific pages.

Do not expose conversation history to logged-out users.

---

# 13. CURRENT DEVELOPMENT LIMITATION

The current implementation intentionally covers:

```text
Avatar
+
Voice
+
Chat
+
Authentication
+
Saved Conversations
```

The following major features are NOT yet implemented and should be developed next:

```text
Career Discovery
Career Comparison
Family Decision Room
Local Opportunity Map
Human Counsellor Booking
Career Evidence / Verified Data
Personalized Onboarding
Student Profile
Parent Profile
Career Action Plan
Admin Analytics
Counsellor Dashboard
```

Do not assume these already exist.

Build them incrementally around the current working AI mentor.

---

# 14. NEXT DEVELOPMENT PRIORITY

Recommended order:

## Phase 1 — User understanding

Build:

- Onboarding
- Student profile
- Education information
- Interests
- Location
- Family concerns
- Career goals

The onboarding should integrate naturally with Saathi.

Avoid a large static form.

Saathi should conversationally collect information wherever practical.

---

## Phase 2 — Career Discovery

Create:

```text
/careers
/careers/:id
```

Career discovery should show multiple relevant career options.

Each career card should include:

- Career name
- Description
- Required education
- Skills
- Training duration
- Job roles
- Career growth
- Further education
- Local availability

Recommendations must be explainable.

Example:

```text
Why Saathi suggested this:

✓ Matches your interest in electronics
✓ Compatible with your current education
✓ Relevant training available nearby
✓ Multiple progression pathways
```

---

# 15. CAREER DETAIL PAGE

A career page should contain:

```text
Career overview
What the job involves
Required skills
Training pathway
Training duration
Typical job roles
Earnings
Placement/outcome data
Career growth
NSQF progression
Further education
Local opportunities
Work environment
Things to consider
Verified sources
```

Use simple language.

The page must be understandable to both:

- Students
- Parents

---

# 16. VERIFIED DATA ARCHITECTURE

This is extremely important.

The LLM must NOT be the source of truth for:

- Salary
- Placement
- Employment statistics
- Government information
- NSQF progression
- Training provider outcomes
- Local opportunities

The architecture should eventually follow:

```text
Verified Sources
      ↓
Data Processing
      ↓
Database
      ↓
Retrieval / RAG
      ↓
AI
      ↓
Simple explanation
```

Every factual data card should support:

```text
Source
Data year
Location
```

Example:

```text
✓ Verified information

Placement Rate
78%

Location
Madhya Pradesh

Data Year
2025

View source →
```

Until real datasets are integrated, use clearly labelled demo data.

Never present mock values as real government statistics.

---

# 17. FAMILY DECISION ROOM

This is a core future feature.

Route:

```text
/family-room
```

Purpose:

Bring the student and parent into the same decision-making experience.

Visual model:

```text
Student
   ↘
    Saathi
   ↙
Parent
```

Saathi should act as a neutral facilitator.

Example:

Student:

> "I want to work in automobiles."

Parent:

> "I'm worried about job security."

Saathi:

> "Let's look at the actual training pathway, job roles, career growth and available evidence together."

The interface should show:

```text
Student priorities
Family priorities
Shared concerns
Career options
Evidence
Discussion points
```

Do not design this as a tool for "convincing" or manipulating parents.

It should facilitate informed family discussion.

---

# 18. CAREER COMPARISON

Create a comparison interface.

Possible comparison dimensions:

```text
Education required
Training duration
Entry roles
Income
Career growth
Further education
Local availability
Work environment
Demand
```

Do not create an overall winner score.

The purpose is to help users understand trade-offs.

---

# 19. LOCAL OPPORTUNITIES

Future route:

```text
/opportunities
```

Possible data:

```text
ITI
Training centre
Employer
Apprenticeship
College
Counsellor
```

Filters:

```text
Distance
Trade
Training type
Government / Private
Fees
Duration
```

Use a service abstraction for maps and location data.

Do not hardcode a specific maps provider into UI components.

---

# 20. HUMAN COUNSELLOR

Future feature:

```text
Talk to a Human Counsellor
```

Potential actions:

- Request callback
- Live chat
- Schedule appointment

Saathi should suggest human counselling when:

- User requests it
- AI lacks sufficient evidence
- The question is too complex
- The user needs personalized human guidance

---

# 21. ACTION PLAN

Future route:

```text
/my-plan
```

The action plan should convert discussion into practical steps.

Example:

```text
This Month

☐ Research 3 careers
☐ Visit nearby training centre
☐ Discuss options with family
☐ Talk to counsellor

Next 3 Months

☐ Select training pathway
☐ Apply for course
☐ Explore apprenticeship
```

Tasks should be interactive.

---

# 22. ADMIN ANALYTICS

Future admin dashboard should help administrators understand:

- Number of counselling sessions
- Student engagement
- Parent engagement
- Most discussed careers
- Common parental concerns
- Income concerns
- Job-security concerns
- Social perception concerns
- Safety concerns
- Further-study concerns
- Sentiment changes
- Geographic trends

Do not expose private conversations unnecessarily.

Prefer aggregated/anonymized analytics.

---

# 23. COUNSELLOR DASHBOARD

Future counsellor dashboard should show:

```text
Student
Education
Interests
Career concerns
Family concerns
AI conversation summary
AI confidence
Previous sessions
Recommended follow-up
```

Counsellors should be able to continue from the AI conversation instead of asking the student to repeat everything.

---

# 24. RESPONSIVE DESIGN

The application must support:

### Desktop

1366 × 768
1440 × 900
1920 × 1080

### Mobile

360px
390px
430px

Mobile is NOT a smaller desktop.

Use:

- Bottom navigation
- Bottom sheets
- Swipeable cards
- Large touch targets
- Sticky voice controls
- Responsive avatar
- Mobile-friendly conversation UI

Test every major feature on both desktop and mobile.

---

# 25. DESIGN LANGUAGE

Maintain the current CareerSaathi visual identity.

Target feeling:

```text
Human
Modern
Warm
Trustworthy
Premium
Accessible
Indian
Educational
Professional
```

Avoid:

- Neon cyberpunk
- Excessive gradients
- Excessive glassmorphism
- Childish cartoon styling
- Generic chatbot styling
- Excessive animations
- Cluttered dashboards

The avatar should remain the emotional center.

---

# 26. ACCESSIBILITY

Maintain:

- Keyboard navigation
- Focus states
- ARIA labels
- Good contrast
- Large touch targets
- Screen-reader compatibility
- Reduced-motion support

Voice interaction must always have a text fallback.

---

# 27. ERROR HANDLING

Never leave the user with a blank screen.

AI error:

> "I'm having trouble connecting right now."

Actions:

```text
Try again
Continue with text
Talk to counsellor
```

Voice error:

> "Voice input isn't available in this browser."

Action:

```text
Continue with typing
```

Network error:

Provide retry.

Authentication error:

Explain the issue clearly.

---

# 28. LOADING STATES

Use meaningful loading states.

Examples:

```text
Saathi is thinking...
Saathi is listening...
Saathi is preparing your answer...
Checking career information...
Loading your conversations...
```

Use the avatar's thinking/listening animation rather than generic spinners whenever possible.

---

# 29. EMPTY STATES

Every list needs a useful empty state.

Example:

```text
No conversations yet.

Start a conversation with Saathi
and let's explore your future together.

[Talk to Saathi]
```

Avoid empty blank containers.

---

# 30. COMPONENT PRINCIPLES

Prefer reusable components.

Important existing/future components may include:

```text
Avatar
AvatarState
ChatPanel
ChatMessage
VoiceButton
VoiceWaveform
ConversationList
ConversationItem
CareerCard
CareerDetail
CareerPath
EvidenceCard
DataSourceBadge
FamilyRoom
FamilyConcernCard
ComparisonTable
OpportunityCard
CounsellorCard
ActionPlan
```

Before creating a new component, check whether an existing component can be extended.

Avoid duplicate components with slightly different names.

---

# 31. CODE QUALITY

Use:

- TypeScript
- Strong typing
- Reusable components
- Clear naming
- Small focused components
- Service abstractions
- Error handling
- Environment variables
- Consistent formatting

Avoid:

- `any` unless necessary
- Huge components
- Duplicate logic
- Hardcoded API keys
- Hardcoded user-specific data
- Business logic directly inside presentation components

---

# 32. SERVICE ARCHITECTURE

External functionality should be abstracted.

Suggested structure:

```text
services/
    ai/
    avatar/
    voice/
    auth/
    careers/
    opportunities/
    counselling/
    analytics/
```

The UI should not directly depend on a specific AI/voice/avatar provider.

This allows future replacement of:

- LLM
- TTS
- STT
- Avatar provider
- Maps
- Database

without rewriting the entire application.

---

# 33. ENVIRONMENT VARIABLES

Never commit secrets.

Use `.env` / `.env.local`.

Potential variables:

```text
VITE_AI_API_URL=
VITE_AI_API_KEY=
VITE_AVATAR_API_URL=
VITE_AVATAR_API_KEY=
VITE_MAP_API_KEY=
```

Actual variable names should follow the existing implementation if already defined.

Do NOT create duplicate environment variables when an existing one already serves the purpose.

Never expose secret server-side credentials through frontend code.

---

# 34. DATABASE / AUTH DATA

User-specific information must remain isolated.

At minimum, data relationships should conceptually follow:

```text
User
 ├── Profile
 ├── Conversations
 │     └── Messages
 ├── Career Activity
 ├── Family Sessions
 └── Action Plans
```

Never query another user's conversation using only a conversation ID without validating ownership.

---

# 35. SECURITY

Never:

- Commit secrets
- Trust user IDs from the client blindly
- Expose admin APIs to students
- Expose counsellor data to unauthorized users
- Expose private conversations
- Store unnecessary sensitive information

Validate permissions server-side.

---

# 36. GIT WORKFLOW

Use meaningful commits.

Examples:

```text
feat: add career discovery
feat: add family decision room
feat: add career comparison
feat: add verified career evidence
fix: improve mobile avatar layout
fix: handle voice recognition failure
refactor: separate AI service
```

Before committing:

```text
Check build
Check TypeScript
Check console errors
Check authentication
Check voice
Check avatar
Check mobile layout
Check desktop layout
Check existing conversations
```

---

# 37. CHANGE SAFETY

Before changing an existing feature:

1. Search for all usages.
2. Understand the component.
3. Understand its state management.
4. Check API/service dependencies.
5. Make the smallest appropriate change.
6. Test the original behavior.
7. Test the new behavior.

Never rewrite a large working feature merely to make a small visual change.

---

# 38. DEMO MODE

The final SIH version should have a demo mode.

Example profile:

```text
Name: Aman
Education: Class 12
Location: Madhya Pradesh
Interests: Computers + Electronics
Family concern: Job security
```

The demo should allow judges to experience:

```text
AI Avatar
    ↓
Conversation
    ↓
Career Discovery
    ↓
Career Evidence
    ↓
Family Decision Room
    ↓
Career Comparison
    ↓
Action Plan
    ↓
Human Counsellor
```

The demo must remain usable even if optional external APIs are unavailable.

---

# 39. SIH DEMONSTRATION STORY

The ideal demonstration should tell a story.

Example:

### Step 1

Student opens CareerSaathi.

### Step 2

Saathi greets the student.

### Step 3

Student speaks:

> "I like computers and electronics."

### Step 4

Saathi asks about education and goals.

### Step 5

Student explains:

> "My parents want me to choose a traditional degree."

### Step 6

Saathi asks what concerns the parents have.

### Step 7

Student selects:

> Job security

### Step 8

Career options appear.

### Step 9

Student explores a vocational pathway.

### Step 10

Verified information is shown.

### Step 11

Parent joins Family Decision Room.

### Step 12

Parent asks about career growth.

### Step 13

Saathi explains the pathway simply.

### Step 14

Family compares options.

### Step 15

Career Action Plan is created.

### Step 16

Human counsellor option is available.

This should demonstrate the core SIH problem rather than just showing an AI chatbot.

---

# 40. PRODUCT DIFFERENTIATION

CareerSaathi is NOT:

> A quiz that tells students which career to choose.

CareerSaathi IS:

> **A family-aware AI career mentor that connects student aspirations, parent concerns, and verified career information in one conversational experience.**

The strongest differentiators are:

1. Interactive AI avatar
2. Natural voice conversation
3. Family-aware counselling
4. Evidence-backed career information
5. Regional language support
6. Family Decision Room
7. Localized opportunities
8. Human counsellor escalation
9. Engagement and concern analytics

---

# 41. FUTURE FEATURE PRIORITY

When choosing what to implement next, follow this order:

### Priority 1
Personalized onboarding

### Priority 2
Career Discovery

### Priority 3
Career Detail + Verified Evidence

### Priority 4
Career Comparison

### Priority 5
Family Decision Room

### Priority 6
Local Opportunity Map

### Priority 7
Human Counsellor

### Priority 8
Action Plan

### Priority 9
Counsellor Dashboard

### Priority 10
Admin Analytics

Do not prioritize decorative features over these core capabilities.

---

# 42. GOLDEN RULE FOR FUTURE AGENTS

Before implementing anything, ask:

> Does this make CareerSaathi a better career mentor, or is it merely adding another UI element?

The application should always optimize for:

**Human guidance over form filling.**

**Evidence over assumptions.**

**Conversation over quizzes.**

**Family discussion over family pressure.**

**Multiple informed options over one arbitrary recommendation.**

**Trust over flashy AI claims.**

---

# 43. FINAL PRODUCT FEEL

When a user opens CareerSaathi, they should feel:

> "Someone is here to help me figure this out."

When a parent opens it, they should feel:

> "I can understand this career without needing technical knowledge."

When a judge sees it, they should understand:

> "This is not just an AI chatbot. It is a family-aware career counselling platform."

The central relationship is:

```text
        STUDENT
           ↘
            ↘
          SAATHI
          🤖 / 👩
            ↗
           ↗
        FAMILY
```

Saathi is the bridge between:

**Student aspirations**

and

**Family concerns**

using

**simple, evidence-backed career information.**

---

# 44. CURRENT STATUS SUMMARY

As of the current implementation:

### WORKING

- [x] AI mentor
- [x] Saathi avatar
- [x] Avatar animations
- [x] Emotion states
- [x] Voice input
- [x] Voice output
- [x] English
- [x] Hindi
- [x] Text chat
- [x] Authentication
- [x] Google login
- [x] Email verification
- [x] Saved conversations
- [x] Multiple conversations
- [x] Conversation switching
- [x] Conversation deletion

### NEXT

- [ ] Personalized onboarding
- [ ] Student profile
- [ ] Parent profile
- [ ] Career discovery
- [ ] Career database
- [ ] Verified evidence
- [ ] Career detail pages
- [ ] Career comparison
- [ ] Family Decision Room
- [ ] Local opportunities
- [ ] Human counsellor
- [ ] Action plan
- [ ] Counsellor dashboard
- [ ] Admin analytics

---

# 45. INSTRUCTION TO CODING AGENTS

When asked to implement a feature:

1. Read this file.
2. Inspect the existing code before changing it.
3. Determine whether the requested feature already partially exists.
4. Reuse existing components and services.
5. Preserve working authentication, avatar, voice and conversation functionality.
6. Follow the existing design system.
7. Make the UI responsive.
8. Add loading, empty and error states.
9. Avoid unnecessary rewrites.
10. Do not fabricate real-world data.
11. Keep AI claims evidence-based.
12. Test the existing flow after changes.
13. Report what was changed and any assumptions made.

If a requested change conflicts with an existing working feature, prefer the smallest compatible implementation.

**Never sacrifice the core Saathi experience merely to add a new feature.**
