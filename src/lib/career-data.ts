import type { LucideIcon } from "lucide-react";
import { Code2, HeartPulse, Leaf, Plane, Wrench } from "lucide-react";

export type Career = {
  id: string;
  title: string;
  sector: string;
  icon: LucideIcon;
  fit: number;
  summary: string;
  training: string;
  startingIncome: string;
  experiencedIncome: string;
  jobSecurity: "High" | "Growing" | "Steady";
  growth: string;
  localOpportunity: string;
  safety: string;
  familyNote: string;
  tags: string[];
};

export const CAREERS: Career[] = [
  {
    id: "solar-technician",
    title: "Solar Energy Technician",
    sector: "Green energy",
    icon: Leaf,
    fit: 92,
    summary: "Install and maintain solar systems for homes, businesses, and public projects.",
    training: "ITI Electrician or 3–6 month solar technician course",
    startingIncome: "₹18k–25k / month",
    experiencedIncome: "₹40k–65k / month",
    jobSecurity: "Growing",
    growth: "Technician → Site supervisor → Solar contractor",
    localOpportunity: "Strong demand in cities, towns, and rural energy projects",
    safety: "Formal safety training and protective equipment are essential",
    familyNote: "A fast-growing field with a clear route to self-employment.",
    tags: ["Hands-on", "Outdoor", "Self-employment"],
  },
  {
    id: "healthcare-technician",
    title: "Medical Lab Technician",
    sector: "Healthcare",
    icon: HeartPulse,
    fit: 87,
    summary: "Support doctors by testing blood and other samples in clinics and diagnostic labs.",
    training: "DMLT certificate or diploma, usually 1–2 years",
    startingIncome: "₹16k–24k / month",
    experiencedIncome: "₹35k–55k / month",
    jobSecurity: "High",
    growth: "Lab assistant → Senior technician → Lab manager",
    localOpportunity: "Hospitals and diagnostic centres across most districts",
    safety: "Controlled indoor workplace with strict hygiene procedures",
    familyNote: "Healthcare demand is stable and the work has strong social respect.",
    tags: ["Healthcare", "Indoor", "Stable"],
  },
  {
    id: "cnc-operator",
    title: "CNC Machine Operator",
    sector: "Advanced manufacturing",
    icon: Wrench,
    fit: 84,
    summary: "Use computer-controlled machines to make precise parts for automotive and engineering companies.",
    training: "ITI Machinist, Turner, or CNC operator certificate",
    startingIncome: "₹17k–26k / month",
    experiencedIncome: "₹38k–60k / month",
    jobSecurity: "Steady",
    growth: "Operator → Programmer → Production supervisor",
    localOpportunity: "Best near industrial clusters, with relocation options",
    safety: "Structured factory safety rules and supervised equipment use",
    familyNote: "A recognised technical career with apprenticeships and steady progression.",
    tags: ["Technical", "Precision", "Industry"],
  },
  {
    id: "web-developer",
    title: "Junior Web Developer",
    sector: "Digital technology",
    icon: Code2,
    fit: 81,
    summary: "Build and maintain websites and simple digital products for companies and clients.",
    training: "6–12 month practical certificate plus a project portfolio",
    startingIncome: "₹20k–32k / month",
    experiencedIncome: "₹50k–90k / month",
    jobSecurity: "Growing",
    growth: "Junior developer → Developer → Technical lead or freelancer",
    localOpportunity: "Remote, freelance, and city-based roles are available",
    safety: "Indoor work; healthy screen-time habits matter",
    familyNote: "Skills and a strong portfolio can matter more than a traditional degree.",
    tags: ["Computers", "Remote", "Creative"],
  },
  {
    id: "drone-technician",
    title: "Drone Service Technician",
    sector: "Emerging technology",
    icon: Plane,
    fit: 78,
    summary: "Repair, maintain, and support drones used in agriculture, surveying, and media.",
    training: "Electronics foundation plus approved drone maintenance training",
    startingIncome: "₹18k–28k / month",
    experiencedIncome: "₹45k–75k / month",
    jobSecurity: "Growing",
    growth: "Technician → Specialist → Service centre owner",
    localOpportunity: "Growing in agricultural and surveying regions",
    safety: "Requires certified procedures and responsible flight practices",
    familyNote: "A newer field with good upside, but training quality should be checked carefully.",
    tags: ["Electronics", "Field work", "Emerging"],
  },
];

export const getCareer = (id: string) => CAREERS.find((career) => career.id === id);