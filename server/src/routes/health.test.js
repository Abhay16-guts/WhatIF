import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { healthRouter } from './health.js';

describe('Health Route', () => {
  test('GET /health returns 200 with status ok and uptime', async () => {
    const app = express();
    app.use('/api', healthRouter);

    const server = app.listen(0);
    const port = server.address().port;

    try {
      const response = await fetch(`http://localhost:${port}/api/health`);
      assert.equal(response.status, 200);

      const data = await response.json();
      assert.equal(data.status, 'ok');
      assert.ok(typeof data.timestamp === 'string');
      assert.ok(typeof data.uptime === 'number');
    } finally {
      server.close();
    }
  });
});
