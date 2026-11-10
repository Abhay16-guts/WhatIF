import { createContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, duration) => addToast(msg, 'success', duration),
    error: (msg, duration) => addToast(msg, 'error', duration),
    info: (msg, duration) => addToast(msg, 'info', duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast viewport */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg text-sm transition-all duration-300 animate-slide-up ${
              item.type === 'success'
                ? 'bg-paper-50 border-success/30 text-ink'
                : item.type === 'error'
                ? 'bg-paper-50 border-error/30 text-ink'
                : 'bg-paper-50 border-paper-300 text-ink'
            }`}
          >
            {item.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {item.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {item.type === 'info' && (
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <p className="flex-1 leading-snug">{item.message}</p>
            <button
              onClick={() => removeToast(item.id)}
              className="text-ink-faint hover:text-ink p-0.5 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Re-export for backward compatibility
export { useToast } from '../hooks/useToast';
