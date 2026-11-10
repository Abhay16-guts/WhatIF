import { z } from 'zod';

/**
 * Request schema for POST /api/scenarios/generate
 */
export const generateRequestSchema = z.object({
  prompt: z
    .string({ required_error: 'Prompt is required.' })
    .trim()
    .min(10, 'Prompt must be at least 10 characters long.')
    .max(500, 'Prompt cannot exceed 500 characters.'),
  tone: z
    .enum(['Thoughtful', 'Scientific', 'Cinematic', 'Playful'])
    .optional()
    .default('Thoughtful'),
  timelineScale: z
    .enum(['10', '50', '100'])
    .optional()
    .default('50'),
});

/**
 * Request schema for POST /api/scenarios/follow-up
 */
export const followUpRequestSchema = z.object({
  question: z
    .string({ required_error: 'Question is required.' })
    .trim()
    .min(5, 'Question must be at least 5 characters long.')
    .max(300, 'Question cannot exceed 300 characters.'),
  scenarioContext: z.object({
    title: z.string().min(1),
    premise: z.string().min(1),
    timeline: z
      .array(
        z.object({
          yearLabel: z.string(),
          eventTitle: z.string(),
          description: z.string(),
        })
      )
      .optional(),
  }),
});

/**
 * Server-side Zod validation schema for Gemini scenario output
 * Matches 00_MASTER_BRIEF.md specification exactly.
 */
export const scenarioResponseSchema = z.object({
  title: z.string().min(3).max(120),
  tagline: z.string().min(5).max(200),
  premise: z.string().min(20).max(1000),
  assumptions: z
    .array(z.string().min(5).max(300))
    .min(2, 'Must provide at least 2 assumptions.')
    .max(5, 'Maximum of 5 assumptions allowed.'),
  timeline: z
    .array(
      z.object({
        yearLabel: z.string().min(2).max(40),
        eventTitle: z.string().min(3).max(120),
        description: z.string().min(10).max(500),
      })
    )
    .min(3, 'Timeline must include at least 3 events.')
    .max(8, 'Timeline cannot exceed 8 events.'),
  impacts: z.object({
    society: z.string().min(10).max(600),
    economy: z.string().min(10).max(600),
    technology: z.string().min(10).max(600),
    environment: z.string().min(10).max(600),
    culture: z.string().min(10).max(600),
  }),
  story: z.object({
    title: z.string().min(3).max(120),
    body: z.string().min(50).max(1500),
  }),
  followUpQuestions: z
    .array(z.string().min(10).max(250))
    .min(3, 'At least 3 follow-up questions required.')
    .max(6, 'Maximum 6 follow-up questions allowed.'),
  fictionNotice: z.string().min(10).max(400),
});

/**
 * JSON Schema representation for Gemini's responseSchema configuration
 */
export const geminiScenarioJsonSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Oversized evocative editorial title for the alternate reality' },
    tagline: { type: 'string', description: 'One-sentence poetic subtitle capturing the core divergence' },
    premise: { type: 'string', description: 'Concise summary of the physical, historical, or biological divergence point' },
    assumptions: {
      type: 'array',
      items: { type: 'string' },
      description: '2 to 5 necessary underlying physical, biological, or social boundary conditions that make this reality work',
    },
    timeline: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          yearLabel: { type: 'string', description: 'e.g. Year 1 (2042), Year 10 (2052), or Year 50' },
          eventTitle: { type: 'string', description: 'Brief evocative title of the milestone event' },
          description: { type: 'string', description: '1-2 sentence description of what changed and its consequences' },
        },
        required: ['yearLabel', 'eventTitle', 'description'],
      },
      description: '4 to 6 chronological milestones tracking the progression of this reality over the selected timeframe',
    },
    impacts: {
      type: 'object',
      properties: {
        society: { type: 'string', description: 'Impact on daily life, community structures, education, and human relationships' },
        economy: { type: 'string', description: 'Impact on labor, trade, industries, resource allocation, and currencies' },
        technology: { type: 'string', description: 'Impact on science, engineering, computing, transportation, and tools' },
        environment: { type: 'string', description: 'Impact on ecosystems, energy grids, climate, and geography' },
        culture: { type: 'string', description: 'Impact on arts, philosophy, religion, myths, and human recreation' },
      },
      required: ['society', 'economy', 'technology', 'environment', 'culture'],
      description: 'Multidimensional fallout across 5 structural domains',
    },
    story: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the ground-level short vignette' },
        body: { type: 'string', description: 'An evocative 1-2 paragraph human story illustrating everyday life inside this reality' },
      },
      required: ['title', 'body'],
      description: 'Evocative fictional narrative set in this alternate world',
    },
    followUpQuestions: {
      type: 'array',
      items: { type: 'string' },
      description: '3 to 5 intriguing follow-up inquiry questions exploring deep implications of this world',
    },
    fictionNotice: {
      type: 'string',
      description: 'Explicit editorial note stating that this is speculative fiction for thought experimentation, not factual prediction',
    },
  },
  required: [
    'title',
    'tagline',
    'premise',
    'assumptions',
    'timeline',
    'impacts',
    'story',
    'followUpQuestions',
    'fictionNotice',
  ],
};

