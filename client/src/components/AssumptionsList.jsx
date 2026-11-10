import { ShieldCheck } from 'lucide-react';
import CopyButton from './CopyButton';

export default function AssumptionsList({ premise, assumptions = [] }) {
  const assumptionsCopy = `PREMISE:\n${premise}\n\nASSUMPTIONS:\n${assumptions.map((a, i) => `§${i + 1}. ${a}`).join('\n')}`;

  return (
    <section className="py-8 border-b border-paper-300" aria-labelledby="premise-heading">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 id="premise-heading" className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />
          <span>The Divergence Point & Assumptions</span>
        </h2>
        <CopyButton
          text={assumptionsCopy}
          label="Copy Premise"
          toastMessage="Premise and assumptions copied"
        />
      </div>

      {/* Premise narrative */}
      <div className="bg-paper-50 p-6 rounded-lg border border-paper-300 shadow-xs mb-6">
        <span className="text-xs font-sans font-bold uppercase tracking-wider text-accent block mb-2">
          Core Counterfactual Divergence
        </span>
        <p className="text-base sm:text-lg text-ink leading-relaxed font-serif">
          {premise}
        </p>
      </div>

      {/* Assumptions Grid */}
      <div>
        <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-ink-faint mb-3">
          Necessary Boundary Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assumptions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-md bg-paper-100 border border-paper-300 flex items-start gap-3"
            >
              <span className="font-serif font-bold text-accent text-sm shrink-0">
                §{idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

