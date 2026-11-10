import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { scenarioRouter } from './scenarios.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { config } from '../config.js';

function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/scenarios', scenarioRouter);
  app.use(errorHandler);
  return app;
}

describe('Scenario Routes', () => {
  test('POST /generate rejects prompt shorter than 10 chars with 400', async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/scenarios/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Too short' }),
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.error.code, 'VALIDATION_ERROR');
      assert.ok(data.error.message.includes('at least 10 characters'));
    } finally {
      server.close();
    }
  });

  test('POST /generate rejects prompt longer than 500 chars with 400', async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/scenarios/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'A'.repeat(501) }),
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.error.code, 'VALIDATION_ERROR');
    } finally {
      server.close();
    }
  });

  test('POST /follow-up rejects missing scenarioContext with 400', async () => {
    const app = createTestApp();
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/scenarios/follow-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: 'Valid question?' }),
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.error.code, 'VALIDATION_ERROR');
    } finally {
      server.close();
    }
  });

  test('POST /generate returns MISSING_API_KEY if server has no GEMINI_API_KEY', async () => {
    const originalKey = config.geminiApiKey;
    config.geminiApiKey = ''; // Simulate missing key

    const app = createTestApp();
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/scenarios/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'What if humans never needed sleep?' }),
      });

      assert.equal(res.status, 503);
      const data = await res.json();
      assert.equal(data.error.code, 'MISSING_API_KEY');
      assert.ok(data.error.message.includes('API key'));
    } finally {
      config.geminiApiKey = originalKey; // Restore key
      server.close();
    }
  });
});

