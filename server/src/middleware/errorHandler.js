/**
 * Global Express error handler.
 * Returns safe user-facing errors without leaking internals.
 */
export function errorHandler(err, req, res, _next) {
  // Log the full error internally
  req.log?.error(err, 'Unhandled error');

  // Never expose stack traces or internal details
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message =
    statusCode === 500
      ? 'An unexpected error occurred. Please try again.'
      : err.message || 'Something went wrong.';

  res.status(statusCode).json({
    error: { code, message },
  });
}

