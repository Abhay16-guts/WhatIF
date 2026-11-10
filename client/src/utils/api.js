/**
 * API client module for WhatIf AI.
 * Centralizes all communication with the backend Express server.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const DEFAULT_TIMEOUT_MS = 45000;

class ApiError extends Error {
  constructor(message, code = 'INTERNAL_ERROR', status = 500) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

/**
 * Executes a fetch request with timeout and error normalization.
 */
async function request(endpoint, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    // Parse JSON safely
    let data;
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch (_err) {
      data = { raw: text };
    }

    if (!res.ok) {
      const code = data?.error?.code || `HTTP_${res.status}`;
      const message =
        data?.error?.message ||
        (res.status === 404
          ? 'Endpoint not found.'
          : res.status >= 500
          ? 'The server encountered an error processing your request.'
          : 'Request failed.');
      throw new ApiError(message, code, res.status);
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new ApiError(
        'The inquiry timed out. The server or AI model took too long to respond.',
        'MODEL_TIMEOUT',
        504
      );
    }

    if (err instanceof ApiError) {
      throw err;
    }

    // Network failure / backend offline
    throw new ApiError(
      'Unable to connect to the backend server. Please verify the server is running.',
      'NETWORK_ERROR',
      0
    );
  }
}

/**
 * Health check
 */
export async function checkHealth() {
  return request('/health', { method: 'GET' }, 5000);
}

/**
 * Generates an alternate reality scenario.
 */
export async function generateScenarioApi({ prompt, tone, timelineScale }) {
  return request('/scenarios/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt, tone, timelineScale }),
  });
}

/**
 * Answers a follow-up inquiry with scenario context.
 */
export async function askFollowUpApi({ question, scenarioContext }) {
  return request('/scenarios/follow-up', {
    method: 'POST',
    body: JSON.stringify({ question, scenarioContext }),
  });
}
