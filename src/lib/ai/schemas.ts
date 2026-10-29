import { z } from 'zod';

export const generateBulletsSchema = z.object({
  role: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  skills: z.array(z.string()).min(1).max(20),
  metricsHints: z.array(z.string()).max(10).optional(),
  count: z.number().int().min(1).max(10).default(4),
  language: z.enum(['en', 'fa']).default('en'),
  targetRole: z.string().max(100).optional(),
});

export const enhanceBulletSchema = z.object({
  bullet: z.string().min(1).max(500),
  context: z.object({
    role: z.string().max(100).optional(),
    company: z.string().max(100).optional(),
    skills: z.array(z.string()).max(20).optional(),
  }).optional(),
  language: z.enum(['en', 'fa']).default('en'),
});

export const generateSummarySchema = z.object({
  currentResume: z.object({
    personalInfo: z.object({
      firstName: z.string(),
      lastName: z.string(),
      title: z.string(),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      summary: z.string(),
    }),
    sections: z.array(z.object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
      titleFa: z.string().optional(),
      items: z.array(z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string(),
        bullets: z.array(z.string()),
        tags: z.array(z.string()).optional(),
      })),
      visible: z.boolean(),
      order: z.number(),
      custom: z.boolean().optional(),
    })),
    settings: z.object({
      templateId: z.string(),
      primaryColor: z.string(),
      fontFamily: z.string(),
      fontSize: z.number(),
      lineHeight: z.number(),
      margins: z.object({
        top: z.number(),
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
      }),
      paperSize: z.enum(['a4', 'letter']),
      showDividers: z.boolean(),
      showIcons: z.boolean(),
      columnLayout: z.enum(['single', 'two']),
    }),
    language: z.enum(['en', 'fa', 'mixed']),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  targetRole: z.string().max(100).optional(),
  language: z.enum(['en', 'fa']).default('en'),
});

export const generateSkillsSchema = z.object({
  skills: z.array(z.string()).min(1).max(30),
  role: z.string().max(100).optional(),
  language: z.enum(['en', 'fa']).default('en'),
});

export const interviewQuestionsSchema = z.object({
  resume: z.object({
    personalInfo: z.object({
      firstName: z.string(),
      lastName: z.string(),
      title: z.string(),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      summary: z.string(),
    }),
    sections: z.array(z.object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
      titleFa: z.string().optional(),
      items: z.array(z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string(),
        bullets: z.array(z.string()),
        tags: z.array(z.string()).optional(),
      })),
      visible: z.boolean(),
      order: z.number(),
      custom: z.boolean().optional(),
    })),
    settings: z.object({
      templateId: z.string(),
      primaryColor: z.string(),
      fontFamily: z.string(),
      fontSize: z.number(),
      lineHeight: z.number(),
      margins: z.object({
        top: z.number(),
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
      }),
      paperSize: z.enum(['a4', 'letter']),
      showDividers: z.boolean(),
      showIcons: z.boolean(),
      columnLayout: z.enum(['single', 'two']),
    }),
    language: z.enum(['en', 'fa', 'mixed']),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  jobDescription: z.string().max(5000).optional(),
  count: z.number().int().min(1).max(20).default(10),
  language: z.enum(['en', 'fa']).default('en'),
});

export const atsAnalyzeSchema = z.object({
  resume: z.object({
    personalInfo: z.object({
      firstName: z.string(),
      lastName: z.string(),
      title: z.string(),
      email: z.string(),
      phone: z.string(),
      location: z.string(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      summary: z.string(),
    }),
    sections: z.array(z.object({
      id: z.string(),
      type: z.string(),
      title: z.string(),
      titleFa: z.string().optional(),
      items: z.array(z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string(),
        bullets: z.array(z.string()),
        tags: z.array(z.string()).optional(),
      })),
      visible: z.boolean(),
      order: z.number(),
      custom: z.boolean().optional(),
    })),
    settings: z.object({
      templateId: z.string(),
      primaryColor: z.string(),
      fontFamily: z.string(),
      fontSize: z.number(),
      lineHeight: z.number(),
      margins: z.object({
        top: z.number(),
        bottom: z.number(),
        left: z.number(),
        right: z.number(),
      }),
      paperSize: z.enum(['a4', 'letter']),
      showDividers: z.boolean(),
      showIcons: z.boolean(),
      columnLayout: z.enum(['single', 'two']),
    }),
    language: z.enum(['en', 'fa', 'mixed']),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  jobDescription: z.string().max(5000).optional(),
  language: z.enum(['en', 'fa']).default('en'),
});

export type GenerateBulletsInput = z.infer<typeof generateBulletsSchema>;
export type EnhanceBulletInput = z.infer<typeof enhanceBulletSchema>;
export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;
export type GenerateSkillsInput = z.infer<typeof generateSkillsSchema>;
export type InterviewQuestionsInput = z.infer<typeof interviewQuestionsSchema>;
export type ATSAnalyzeInput = z.infer<typeof atsAnalyzeSchema>;
