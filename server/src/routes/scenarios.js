import { Router } from 'express';
import { generateRequestSchema, followUpRequestSchema } from '../schemas/scenarioSchemas.js';
import { geminiService } from '../services/geminiService.js';

export const scenarioRouter = Router();

/**
 * POST /api/scenarios/generate
 * Synthesizes a structured counterfactual reality using Gemini.
 */
scenarioRouter.post('/generate', async (req, res, next) => {
  try {
    // 1. Validate request body
    const parseResult = generateRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0];
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: firstIssue ? firstIssue.message : 'Invalid request parameters.',
        },
      });
    }

    const { prompt, tone, timelineScale } = parseResult.data;

    // 2. Call service
    const scenario = await geminiService.generateScenario({
      prompt,
      tone,
      timelineScale,
    });

    res.json(scenario);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/scenarios/follow-up
 * Answers a follow-up inquiry grounded in a scenario's timeline and premise.
 */
scenarioRouter.post('/follow-up', async (req, res, next) => {
  try {
    // 1. Validate request body
    const parseResult = followUpRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0];
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: firstIssue ? firstIssue.message : 'Invalid request parameters.',
        },
      });
    }

    const { question, scenarioContext } = parseResult.data;

    // 2. Call service
    const answer = await geminiService.generateFollowUp({
      question,
      scenarioContext,
    });

    res.json({ answer });
  } catch (err) {
    next(err);
  }
});
