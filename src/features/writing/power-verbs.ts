export interface PowerVerb {
  verb: string;
  category: string;
  impact: "high" | "medium" | "low";
}

export const powerVerbs: Record<string, PowerVerb[]> = {
  leadership: [
    { verb: "Spearheaded", category: "leadership", impact: "high" },
    { verb: "Orchestrated", category: "leadership", impact: "high" },
    { verb: "Championed", category: "leadership", impact: "high" },
    { verb: "Directed", category: "leadership", impact: "high" },
    { verb: "Mobilized", category: "leadership", impact: "high" },
    { verb: "Galvanized", category: "leadership", impact: "high" },
    { verb: "Headed", category: "leadership", impact: "medium" },
    { verb: "Supervised", category: "leadership", impact: "medium" },
    { verb: "Coordinated", category: "leadership", impact: "medium" },
    { verb: "Facilitated", category: "leadership", impact: "medium" },
  ],
  engineering: [
    { verb: "Architected", category: "engineering", impact: "high" },
    { verb: "Engineered", category: "engineering", impact: "high" },
    { verb: "Refactored", category: "engineering", impact: "high" },
    { verb: "Optimized", category: "engineering", impact: "high" },
    { verb: "Deployed", category: "engineering", impact: "high" },
    { verb: "Automated", category: "engineering", impact: "high" },
    { verb: "Built", category: "engineering", impact: "high" },
    { verb: "Developed", category: "engineering", impact: "medium" },
    { verb: "Implemented", category: "engineering", impact: "medium" },
    { verb: "Integrated", category: "engineering", impact: "medium" },
  ],
  management: [
    { verb: "Managed", category: "management", impact: "medium" },
    { verb: "Oversaw", category: "management", impact: "medium" },
    { verb: "Administered", category: "management", impact: "medium" },
    { verb: "Streamlined", category: "management", impact: "high" },
    { verb: "Restructured", category: "management", impact: "high" },
    { verb: "Transformed", category: "management", impact: "high" },
    { verb: "Revitalized", category: "management", impact: "high" },
    { verb: "Simplified", category: "management", impact: "high" },
    { verb: "Consolidated", category: "management", impact: "medium" },
    { verb: "Standardized", category: "management", impact: "medium" },
  ],
  marketing: [
    { verb: "Launched", category: "marketing", impact: "high" },
    { verb: "Propelled", category: "marketing", impact: "high" },
    { verb: "Amplified", category: "marketing", impact: "high" },
    { verb: "Captured", category: "marketing", impact: "high" },
    { verb: "Positioned", category: "marketing", impact: "high" },
    { verb: "Rebranded", category: "marketing", impact: "high" },
    { verb: "Promoted", category: "marketing", impact: "medium" },
    { verb: "Marketed", category: "marketing", impact: "medium" },
    { verb: "Advertised", category: "marketing", impact: "low" },
    { verb: "Showcased", category: "marketing", impact: "medium" },
  ],
  finance: [
    { verb: "Forecasted", category: "finance", impact: "high" },
    { verb: "Allocated", category: "finance", impact: "high" },
    { verb: "Reduced", category: "finance", impact: "high" },
    { verb: "Maximized", category: "finance", impact: "high" },
    { verb: "Minimized", category: "finance", impact: "high" },
    { verb: "Audited", category: "finance", impact: "medium" },
    { verb: "Budgeted", category: "finance", impact: "medium" },
    { verb: "Reconciled", category: "finance", impact: "medium" },
    { verb: "Projected", category: "finance", impact: "medium" },
    { verb: "Valued", category: "finance", impact: "low" },
  ],
  sales: [
    { verb: "Negotiated", category: "sales", impact: "high" },
    { verb: "Secured", category: "sales", impact: "high" },
    { verb: "Closed", category: "sales", impact: "high" },
    { verb: "Exceeded", category: "sales", impact: "high" },
    { verb: "Surpassed", category: "sales", impact: "high" },
    { verb: "Converted", category: "sales", impact: "high" },
    { verb: "Prospected", category: "sales", impact: "medium" },
    { verb: "Cultivated", category: "sales", impact: "medium" },
    { verb: "Generated", category: "sales", impact: "high" },
    { verb: "Acquired", category: "sales", impact: "high" },
  ],
  design: [
    { verb: "Designed", category: "design", impact: "high" },
    { verb: "Conceptualized", category: "design", impact: "high" },
    { verb: "Crafted", category: "design", impact: "high" },
    { verb: "Sculpted", category: "design", impact: "high" },
    { verb: "Visualized", category: "design", impact: "medium" },
    { verb: "Illustrated", category: "design", impact: "medium" },
    { verb: "Prototyped", category: "design", impact: "high" },
    { verb: "Iterated", category: "design", impact: "medium" },
    { verb: "Refined", category: "design", impact: "medium" },
    { verb: "Polished", category: "design", impact: "medium" },
  ],
  research: [
    { verb: "Investigated", category: "research", impact: "high" },
    { verb: "Discovered", category: "research", impact: "high" },
    { verb: "Uncovered", category: "research", impact: "high" },
    { verb: "Analyzed", category: "research", impact: "high" },
    { verb: "Evaluated", category: "research", impact: "medium" },
    { verb: "Assessed", category: "research", impact: "medium" },
    { verb: "Surveyed", category: "research", impact: "medium" },
    { verb: "Examined", category: "research", impact: "medium" },
    { verb: "Tested", category: "research", impact: "medium" },
    { verb: "Validated", category: "research", impact: "high" },
  ],
  communication: [
    { verb: "Presented", category: "communication", impact: "high" },
    { verb: "Articulated", category: "communication", impact: "high" },
    { verb: "Authored", category: "communication", impact: "high" },
    { verb: "Published", category: "communication", impact: "high" },
    { verb: "Communicated", category: "communication", impact: "medium" },
    { verb: "Advocated", category: "communication", impact: "high" },
    { verb: "Persuaded", category: "communication", impact: "high" },
    { verb: "Influenced", category: "communication", impact: "high" },
    { verb: "Reported", category: "communication", impact: "medium" },
    { verb: "Documented", category: "communication", impact: "medium" },
  ],
  problem_solving: [
    { verb: "Resolved", category: "problem_solving", impact: "high" },
    { verb: "Troubleshot", category: "problem_solving", impact: "high" },
    { verb: "Diagnosed", category: "problem_solving", impact: "high" },
    { verb: "Mitigated", category: "problem_solving", impact: "high" },
    { verb: "Alleviated", category: "problem_solving", impact: "high" },
    { verb: "Remedied", category: "problem_solving", impact: "high" },
    { verb: "Rectified", category: "problem_solving", impact: "high" },
    { verb: "Overcame", category: "problem_solving", impact: "high" },
    { verb: "Addressed", category: "problem_solving", impact: "medium" },
    { verb: "Identified", category: "problem_solving", impact: "medium" },
  ],
  growth: [
    { verb: "Grew", category: "growth", impact: "high" },
    { verb: "Expanded", category: "growth", impact: "high" },
    { verb: "Scaled", category: "growth", impact: "high" },
    { verb: "Accelerated", category: "growth", impact: "high" },
    { verb: "Boosted", category: "growth", impact: "high" },
    { verb: "Elevated", category: "growth", impact: "high" },
    { verb: "Advanced", category: "growth", impact: "medium" },
    { verb: "Progressed", category: "growth", impact: "medium" },
    { verb: "Enhanced", category: "growth", impact: "high" },
    { verb: "Improved", category: "growth", impact: "high" },
  ],
  efficiency: [
    { verb: "Automated", category: "efficiency", impact: "high" },
    { verb: "Streamlined", category: "efficiency", impact: "high" },
    { verb: "Simplified", category: "efficiency", impact: "high" },
    { verb: "Expedited", category: "efficiency", impact: "high" },
    { verb: "Accelerated", category: "efficiency", impact: "high" },
    { verb: "Consolidated", category: "efficiency", impact: "medium" },
    { verb: "Centralized", category: "efficiency", impact: "medium" },
    { verb: "Digitized", category: "efficiency", impact: "high" },
    { verb: "Modernized", category: "efficiency", impact: "high" },
    { verb: "Revamped", category: "efficiency", impact: "high" },
  ],
  healthcare: [
    { verb: "Treated", category: "healthcare", impact: "medium" },
    { verb: "Diagnosed", category: "healthcare", impact: "high" },
    { verb: "Administered", category: "healthcare", impact: "medium" },
    { verb: "Monitored", category: "healthcare", impact: "medium" },
    { verb: "Implemented", category: "healthcare", impact: "high" },
    { verb: "Coordinated", category: "healthcare", impact: "medium" },
    { verb: "Streamlined", category: "healthcare", impact: "high" },
    { verb: "Reduced", category: "healthcare", impact: "high" },
    { verb: "Improved", category: "healthcare", impact: "high" },
    { verb: "Trained", category: "healthcare", impact: "medium" },
  ],
  education: [
    { verb: "Taught", category: "education", impact: "medium" },
    { verb: "Mentored", category: "education", impact: "high" },
    { verb: "Curated", category: "education", impact: "high" },
    { verb: "Developed", category: "education", impact: "high" },
    { verb: "Designed", category: "education", impact: "high" },
    { verb: "Implemented", category: "education", impact: "high" },
    { verb: "Evaluated", category: "education", impact: "medium" },
    { verb: "Adapted", category: "education", impact: "medium" },
    { verb: "Facilitated", category: "education", impact: "medium" },
    { verb: "Inspired", category: "education", impact: "high" },
  ],
  legal: [
    { verb: "Litigated", category: "legal", impact: "high" },
    { verb: "Negotiated", category: "legal", impact: "high" },
    { verb: "Advised", category: "legal", impact: "high" },
    { verb: "Represented", category: "legal", impact: "high" },
    { verb: "Drafted", category: "legal", impact: "medium" },
    { verb: "Reviewed", category: "legal", impact: "medium" },
    { verb: "Complied", category: "legal", impact: "medium" },
    { verb: "Advocated", category: "legal", impact: "high" },
    { verb: "Mediated", category: "legal", impact: "high" },
    { verb: "Arbitrated", category: "legal", impact: "high" },
  ],
  startup: [
    { verb: "Founded", category: "startup", impact: "high" },
    { verb: "Launched", category: "startup", impact: "high" },
    { verb: "Pivoted", category: "startup", impact: "high" },
    { verb: "Bootstrapped", category: "startup", impact: "high" },
    { verb: "Iterated", category: "startup", impact: "medium" },
    { verb: "Validated", category: "startup", impact: "high" },
    { verb: "Disrupted", category: "startup", impact: "high" },
    { verb: "Discovered", category: "startup", impact: "high" },
    { verb: "Acquired", category: "startup", impact: "high" },
    { verb: "Retained", category: "startup", impact: "high" },
  ],
  operations: [
    { verb: "Operated", category: "operations", impact: "medium" },
    { verb: "Maintained", category: "operations", impact: "medium" },
    { verb: "Managed", category: "operations", impact: "medium" },
    { verb: "Coordinated", category: "operations", impact: "medium" },
    { verb: "Optimized", category: "operations", impact: "high" },
    { verb: "Streamlined", category: "operations", impact: "high" },
    { verb: "Standardized", category: "operations", impact: "medium" },
    { verb: "Implemented", category: "operations", impact: "high" },
    { verb: "Reduced", category: "operations", impact: "high" },
    { verb: "Automated", category: "operations", impact: "high" },
  ],
  human_resources: [
    { verb: "Recruited", category: "human_resources", impact: "high" },
    { verb: "Onboarded", category: "human_resources", impact: "high" },
    { verb: "Trained", category: "human_resources", impact: "high" },
    { verb: "Developed", category: "human_resources", impact: "high" },
    { verb: "Retained", category: "human_resources", impact: "high" },
    { verb: "Evaluated", category: "human_resources", impact: "medium" },
    { verb: "Mentored", category: "human_resources", impact: "high" },
    { verb: "Cultivated", category: "human_resources", impact: "medium" },
    { verb: "Mediated", category: "human_resources", impact: "high" },
    { verb: "Fostered", category: "human_resources", impact: "high" },
  ],
  data: [
    { verb: "Analyzed", category: "data", impact: "high" },
    { verb: "Modeled", category: "data", impact: "high" },
    { verb: "Predicted", category: "data", impact: "high" },
    { verb: "Visualized", category: "data", impact: "medium" },
    { verb: "Aggregated", category: "data", impact: "medium" },
    { verb: "Extracted", category: "data", impact: "medium" },
    { verb: "Transformed", category: "data", impact: "high" },
    { verb: "Cleaned", category: "data", impact: "medium" },
    { verb: "Interpreted", category: "data", impact: "high" },
    { verb: "Correlated", category: "data", impact: "medium" },
  ],
  customer: [
    { verb: "Served", category: "customer", impact: "medium" },
    { verb: "Retained", category: "customer", impact: "high" },
    { verb: "Acquired", category: "customer", impact: "high" },
    { verb: "Satisfied", category: "customer", impact: "high" },
    { verb: "Delighted", category: "customer", impact: "high" },
    { verb: "Supported", category: "customer", impact: "medium" },
    { verb: "Assisted", category: "customer", impact: "low" },
    { verb: "Resolved", category: "customer", impact: "high" },
    { verb: "Escalated", category: "customer", impact: "medium" },
    { verb: "Recovered", category: "customer", impact: "high" },
  ],
};

export const categoryLabels: Record<string, string> = {
  leadership: "Leadership",
  engineering: "Engineering",
  management: "Management",
  marketing: "Marketing",
  finance: "Finance",
  sales: "Sales",
  design: "Design",
  research: "Research",
  communication: "Communication",
  problem_solving: "Problem Solving",
  growth: "Growth",
  efficiency: "Efficiency",
  healthcare: "Healthcare",
  education: "Education",
  legal: "Legal",
  startup: "Startup",
  operations: "Operations",
  human_resources: "Human Resources",
  data: "Data & Analytics",
  customer: "Customer Success",
};

export function getVerbsByCategory(category: string): PowerVerb[] {
  return powerVerbs[category] || [];
}

export function getRandomVerb(category: string): PowerVerb | null {
  const verbs = powerVerbs[category];
  if (!verbs || verbs.length === 0) return null;
  return verbs[Math.floor(Math.random() * verbs.length)];
}

export function getHighImpactVerbs(): PowerVerb[] {
  return Object.values(powerVerbs)
    .flat()
    .filter((v) => v.impact === "high");
}

export function suggestVerb(currentVerb: string): PowerVerb | null {
  const lower = currentVerb.toLowerCase();
  const allVerbs = Object.values(powerVerbs).flat();
  const match = allVerbs.find((v) => v.verb.toLowerCase() === lower);
  if (match) {
    const sameCategory = allVerbs.filter(
      (v) => v.category === match.category && v.impact === "high" && v.verb.toLowerCase() !== lower
    );
    return sameCategory[Math.floor(Math.random() * sameCategory.length)] || null;
  }
  return null;
}
