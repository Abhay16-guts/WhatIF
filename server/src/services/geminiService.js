import { GoogleGenAI } from '@google/genai';
import { config } from '../config.js';
import { scenarioResponseSchema, geminiScenarioJsonSchema } from '../schemas/scenarioSchemas.js';

class GeminiService {
  constructor() {
    this.client = null;
  }

  getClient() {
    if (!config.geminiApiKey) {
      const err = new Error('Google Gemini API key is not configured on the server. Please set GEMINI_API_KEY in server/.env.');
      err.code = 'MISSING_API_KEY';
      err.statusCode = 503;
      throw err;
    }

    if (!this.client) {
      this.client = new GoogleGenAI({ apiKey: config.geminiApiKey });
    }
    return this.client;
  }

  /**
   * Generates a structured alternate reality scenario.
   */
  async generateScenario({ prompt, tone = 'Thoughtful', timelineScale = '50' }) {
    const ai = this.getClient();

    const systemInstruction = `You are the Lead World Architect for WHATIF / WORLD ATLAS, a prestigious speculative world-building journal.
Your task is to take a hypothetical counterfactual inquiry and construct a structured, internally coherent, fascinating alternate reality.

Strict Guidelines:
1. Treat all inquiries strictly as a fictional thought experiment.
2. Clearly distinguish physical/social assumptions from established historical facts.
3. Plausible causality: maintain an unbroken chain of consequences where each milestone triggers the next.
4. Balanced perspective: explore both profound advancements and unforeseen complications/inequalities.
5. Tone: adopt a "${tone}" perspective throughout.
6. Temporal scale: the chronological rail should span approximately ${timelineScale} years from the divergence point.
7. Ground-level narrative: include an evocative, literary vignette focusing on an ordinary human moment in this world.
8. NEVER present speculation as medical, financial, or legal advice.
9. Return valid structured JSON matching the provided schema exactly.`;

    const contents = `Counterfactual inquiry: "${prompt}"
Tone: ${tone}
Temporal Scope: ${timelineScale} Years

Generate the complete structured alternate reality dossier now.`;

    // Attempt generation with up to 1 controlled retry if validation fails
    let lastError = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await Promise.race([
          ai.models.generateContent({
            model: config.geminiModel,
            contents,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              responseSchema: geminiScenarioJsonSchema,
              temperature: 0.75,
            },
          }),
          new Promise((_, reject) =>
            setTimeout(() => {
              const timeoutErr = new Error('Model request timed out.');
              timeoutErr.code = 'MODEL_TIMEOUT';
              timeoutErr.statusCode = 504;
              reject(timeoutErr);
            }, config.requestTimeoutMs)
          ),
        ]);

        const rawText = response.text?.trim();
        if (!rawText) {
          throw new Error('Empty response received from Gemini.');
        }

        // Clean potential Markdown wrapper if any
        const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        const parsed = JSON.parse(cleaned);

        // Validate with server Zod schema
        const validated = scenarioResponseSchema.parse(parsed);

        return {
          id: `scenario-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          prompt,
          tone,
          timelineScale,
          createdAt: new Date().toISOString(),
          ...validated,
        };
      } catch (err) {
        lastError = err;
        if (attempt === 1 && err.name === 'ZodError') {
          // One controlled repair retry
          continue;
        }
        break;
      }
    }

    // Map error to user-facing code
    throw this.mapError(lastError);
  }

  /**
   * Answers a follow-up inquiry grounded in the scenario context.
   */
  async generateFollowUp({ question, scenarioContext }) {
    const ai = this.getClient();

    const systemInstruction = `You are an archivist at the WHATIF Speculative World Atlas.
Answer the user's follow-up question grounded strictly in the provided alternate reality scenario.
Do not contradict the scenario's established premise or timeline.
Answer concisely in 2-3 engaging, well-reasoned paragraphs. Maintain an authoritative speculative tone.`;

    const timelineSummary = scenarioContext.timeline
      ?.map((t) => `${t.yearLabel}: ${t.eventTitle} - ${t.description}`)
      .join('\n');

    const contents = `SCENARIO CONTEXT:
Title: ${scenarioContext.title}
Premise: ${scenarioContext.premise}
${timelineSummary ? `Chronological Milestones:\n${timelineSummary}` : ''}

USER INQUIRY:
"${question}"

Provide a grounded, detailed speculative answer exploring how this specific reality adapted.`;

    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model: config.geminiModel,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => {
            const timeoutErr = new Error('Follow-up request timed out.');
            timeoutErr.code = 'MODEL_TIMEOUT';
            timeoutErr.statusCode = 504;
            reject(timeoutErr);
          }, config.requestTimeoutMs)
        ),
      ]);

      const answer = response.text?.trim();
      if (!answer) {
        throw new Error('Received empty follow-up answer.');
      }
      return answer;
    } catch (err) {
      throw this.mapError(err);
    }
  }

  /**
   * Maps internal or SDK errors to safe user-facing API error codes.
   */
  mapError(err) {
    if (!err) return new Error('Unknown server error');

    if (err.code === 'MISSING_API_KEY') {
      return err;
    }

    if (err.code === 'MODEL_TIMEOUT' || err.message?.includes('timed out')) {
      const mapped = new Error('The AI generation request took too long. Please try again.');
      mapped.code = 'MODEL_TIMEOUT';
      mapped.statusCode = 504;
      return mapped;
    }

    const msg = err.message || '';

    if (msg.includes('Resource has been exhausted') || msg.includes('429') || msg.includes('quota')) {
      const mapped = new Error('Gemini API quota or rate limit exceeded. Please try again in a few moments.');
      mapped.code = 'MODEL_QUOTA_EXCEEDED';
      mapped.statusCode = 429;
      return mapped;
    }

    if (msg.includes('API_KEY_INVALID') || msg.includes('API key not valid')) {
      const mapped = new Error('The configured Gemini API key is invalid or unauthorized.');
      mapped.code = 'MISSING_API_KEY';
      mapped.statusCode = 401;
      return mapped;
    }

    if (msg.includes('503') || msg.includes('Unavailable')) {
      const mapped = new Error('The Gemini model is temporarily unavailable. Please retry shortly.');
      mapped.code = 'MODEL_UNAVAILABLE';
      mapped.statusCode = 503;
      return mapped;
    }

    if (err.name === 'ZodError' || msg.includes('JSON')) {
      const mapped = new Error('The model response did not conform to the expected format. Please retry.');
      mapped.code = 'INVALID_MODEL_RESPONSE';
      mapped.statusCode = 502;
      return mapped;
    }

    const generic = new Error('An error occurred during scenario synthesis.');
    generic.code = 'INTERNAL_ERROR';
    generic.statusCode = 500;
    return generic;
  }
}

export const geminiService = new GeminiService();
