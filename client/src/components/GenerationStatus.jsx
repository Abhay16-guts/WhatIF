import { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';

const STATUS_MESSAGES = [
  'Isolating historical and physical divergence coordinates…',
  'Consulting speculative boundary conditions and assumptions…',
  'Simulating chronological chain reactions and milestones…',
  'Evaluating social, economic, and technological fallout…',
  'Composing ground-level narrative from the alternate timeline…',
  'Conducting internal consistency and plausibility checks…',
  'Finalizing speculative atlas documentation…',
];

export default function GenerationStatus({ promptText, onCancel }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-xl mx-auto my-12 p-8 sm:p-10 rounded-lg bg-paper-50 border border-paper-300 shadow-sm text-center animate-fade-in"
    >
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-accent-light/40 flex items-center justify-center border border-accent/20">
            <Compass className="w-8 h-8 text-accent animate-spin" style={{ animationDuration: '6s' }} aria-hidden="true" />
          </div>
          <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" aria-hidden="true" />
        </div>
      </div>

      <div className="text-xs font-sans font-bold tracking-widest uppercase text-accent mb-2">
        Synthesizing Counterfactual Reality
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-4">
        {STATUS_MESSAGES[index]}
      </h3>

      {promptText && (
        <div className="p-3 bg-paper-100 rounded border border-paper-300 text-xs text-ink-muted italic mb-6 max-w-md mx-auto line-clamp-2">
          "{promptText}"
        </div>
      )}

      <p className="text-xs text-ink-faint leading-relaxed max-w-sm mx-auto mb-6">
        Constructing a fully structured alternate reality model. This deep speculative inquiry typically takes 5–15 seconds.
      </p>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-ink-faint hover:text-ink underline transition-colors"
        >
          Cancel inquiry
        </button>
      )}
    </div>
  );
}
