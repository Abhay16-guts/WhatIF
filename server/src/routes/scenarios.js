import { Router } from 'express';

export const scenarioRouter = Router();

/**
 * POST /api/scenarios/generate
 * Placeholder — will be implemented in Phase 4.
 */
scenarioRouter.post('/generate', (req, res) => {
  res.status(501).json({
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'Scenario generation will be available after Gemini integration (Phase 4).',
    },
  });
});

/**
 * POST /api/scenarios/follow-up
 * Placeholder — will be implemented in Phase 4.
 */
scenarioRouter.post('/follow-up', (req, res) => {
  res.status(501).json({
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'Follow-up answers will be available after Gemini integration (Phase 4).',
    },
  });
});

