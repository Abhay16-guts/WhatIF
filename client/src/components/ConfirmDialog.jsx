import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      // Focus the confirmation button when opened
      setTimeout(() => {
        confirmBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
        // Focus trap
        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        if (previouslyFocusedElement.current && previouslyFocusedElement.current.focus) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-md bg-paper-50 rounded-lg border border-paper-300 shadow-xl p-6 text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          {isDestructive && (
            <div className="p-2 rounded-full bg-error/10 text-error shrink-0">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            </div>
          )}
          <div className="flex-1">
            <h3
              id="dialog-title"
              className="font-serif text-lg font-bold text-ink mb-2"
            >
              {title}
            </h3>
            <p
              id="dialog-description"
              className="text-sm text-ink-muted leading-relaxed"
            >
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-ink-faint hover:text-ink p-1 rounded transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-paper-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-paper-300 text-sm font-medium text-ink-muted hover:text-ink hover:bg-paper-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmBtnRef}
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors shadow-sm focus-visible:ring-2 ${
              isDestructive
                ? 'bg-error hover:bg-error/90 focus-visible:ring-error'
                : 'bg-accent hover:bg-accent-hover focus-visible:ring-accent'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

