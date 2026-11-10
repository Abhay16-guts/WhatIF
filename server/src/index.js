import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { healthRouter } from './routes/health.js';
import { scenarioRouter } from './routes/scenarios.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config.js';

const logger = pino({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  transport: config.nodeEnv !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
});

const app = express();

// ===== Security =====
app.use(helmet());

// ===== CORS =====
app.use(cors({
  origin: config.clientOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ===== Body parsing =====
app.use(express.json({ limit: '16kb' }));

// ===== Request logging =====
app.use(pinoHttp({
  logger,
  // Never log request bodies (may contain user prompts)
  serializers: {
    req(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },
  },
}));

// ===== Rate limiting =====
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests. Please wait a moment and try again.',
    },
  },
});
app.use('/api/scenarios', limiter);

// ===== Routes =====
app.use('/api', healthRouter);
app.use('/api/scenarios', scenarioRouter);

// ===== Error handler =====
app.use(errorHandler);

// ===== Start =====
const PORT = config.port;
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`CORS origin: ${config.clientOrigin}`);
  if (!config.geminiApiKey) {
    logger.warn('GEMINI_API_KEY is not set — generation endpoints will fail');
  }
});

export default app;

