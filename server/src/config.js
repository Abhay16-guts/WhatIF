/**
 * Centralized server configuration.
 * Reads from environment variables with sensible defaults.
 * Never exports secret values to logs or responses.
 */
export const config = {
  port: parseInt(process.env.PORT, 10) || 3001,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Gemini
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',

  // Rate limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60_000,
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 10,

  // Request timeout
  requestTimeoutMs: parseInt(process.env.REQUEST_TIMEOUT_MS, 10) || 30_000,
};

