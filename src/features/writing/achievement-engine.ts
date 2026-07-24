import type { Resume } from "@/types/resume";

export interface AchievementSuggestion {
  id: string;
  originalBullet: string;
  improvedBullet: string;
  category: string;
  confidence: number;
}

const metricPatterns = [
  { pattern: /(\d+)%/, label: "percentage" },
  { pattern: /\$[\d,]+/, label: "revenue" },
  { pattern: /(\d+[,.]?\d*)\s*(million|billion|thousand|M|B|K)/i, label: "scale" },
  { pattern: /(\d+)\s*(users?|customers?|clients?|employees?|team members?|people)/i, label: "count" },
  { pattern: /(\d+)\s*(hours?|days?|weeks?|months?|years?)/i, label: "time" },
  { pattern: /(\d+)\s*(percent|percentage)/i, label: "percentage" },
];

const weakStarters = [
  "responsible for",
  "worked on",
  "helped with",
  "assisted",
  "was involved in",
  "participated in",
  "contributed to",
  "handled",
  "dealt with",
  "took care of",
  "was in charge of",
  "tasked with",
  "duties included",
  "job included",
];

const impactTransforms: Array<{
  pattern: RegExp;
  transform: (fullMatch: string, ...groups: string[]) => string;
}> = [
  {
    pattern: /^responsible for (managing|overseeing|running) (.+)/i,
    transform: (_full, _action, rest) => `Directed ${rest.toLowerCase()} operations`,
  },
  {
    pattern: /^worked on (building|developing|creating) (.+)/i,
    transform: (_full, _action, rest) => `Built ${rest.toLowerCase()}`,
  },
  {
    pattern: /^helped (increase|improve|reduce|grow) (.+)/i,
    transform: (_full, action, rest) => `${action.charAt(0).toUpperCase() + action.slice(1)} ${rest}`,
  },
  {
    pattern: /^assisted (with|in) (.+)/i,
    transform: (_full, _prep, rest) => `Supported ${rest}`,
  },
  {
    pattern: /^managed (?:a team of|team of) (\d+)/i,
    transform: (_full, count) => `Led a team of ${count} professionals`,
  },
];

function hasMetrics(bullet: string): boolean {
  return metricPatterns.some(({ pattern }) => pattern.test(bullet));
}

function detectCategory(bullet: string): string {
  const lower = bullet.toLowerCase();
  if (/team|manage|lead|direct|supervise/.test(lower)) return "leadership";
  if (/code|develop|build|deploy|implement|engineer/.test(lower)) return "engineering";
  if (/design|ux|ui|visual|brand/.test(lower)) return "design";
  if (/market|campaign|brand|content|social/.test(lower)) return "marketing";
  if (/sale|revenue|customer|client|deal/.test(lower)) return "sales";
  if (/budget|cost|financial|revenue|profit/.test(lower)) return "finance";
  if (/research|analyz|data|study/.test(lower)) return "research";
  if (/recruit|hire|train|onboard/.test(lower)) return "human_resources";
  return "general";
}

function transformBullet(bullet: string): { improved: string; confidence: number } {
  const lower = bullet.toLowerCase().trim();

  // Already good
  if (hasMetrics(bullet) && !weakStarters.some((w) => lower.startsWith(w))) {
    return { improved: bullet, confidence: 0.9 };
  }

  // Try pattern transforms
  for (const { pattern, transform } of impactTransforms) {
    const match = bullet.match(pattern);
    if (match) {
      const improved = transform(match[0], ...match.slice(1));
      return { improved, confidence: 0.85 };
    }
  }

  // Remove weak starter
  for (const starter of weakStarters) {
    if (lower.startsWith(starter)) {
      const remainder = bullet.slice(starter.length).trim();
      const actionWord = remainder.charAt(0).toUpperCase() + remainder.slice(1);
      return { improved: actionWord, confidence: 0.7 };
    }
  }

  // Passive voice fix: "Was built a new system" → "Built a new system"
  const passiveMatch = bullet.match(/^was\s+(\w+)\s+(.+)/i);
  if (passiveMatch && /^(built|created|developed|implemented|designed|launched)$/i.test(passiveMatch[1])) {
    const action = passiveMatch[1];
    const rest = passiveMatch[2];
    return {
      improved: `${action.charAt(0).toUpperCase() + action.slice(1)} ${rest}`,
      confidence: 0.75,
    };
  }

  // Generic improvement — capitalize first letter
  const improved = bullet.charAt(0).toUpperCase() + bullet.slice(1);
  return { improved, confidence: 0.5 };
}

export function analyzeAchievements(resume: Resume): AchievementSuggestion[] {
  const suggestions: AchievementSuggestion[] = [];

  resume.sections.forEach((section) => {
    section.items.forEach((item) => {
      item.bullets.filter((b) => b.trim()).forEach((bullet, bulletIndex) => {
        const { improved, confidence } = transformBullet(bullet);
        const category = detectCategory(bullet);

        if (improved !== bullet || confidence < 0.8) {
          suggestions.push({
            id: `ach-${section.id}-${item.id}-${bulletIndex}`,
            originalBullet: bullet,
            improvedBullet: improved,
            category,
            confidence,
          });
        }
      });
    });
  });

  return suggestions.sort((a, b) => a.confidence - b.confidence);
}

export function calculateAchievementScore(resume: Resume): number {
  let totalBullets = 0;
  let strongBullets = 0;

  resume.sections.forEach((section) => {
    section.items.forEach((item) => {
      item.bullets.filter((b) => b.trim()).forEach((bullet) => {
        totalBullets++;
        if (hasMetrics(bullet) && !weakStarters.some((w) => bullet.toLowerCase().startsWith(w))) {
          strongBullets++;
        }
      });
    });
  });

  if (totalBullets === 0) return 0;
  return Math.round((strongBullets / totalBullets) * 100);
}
