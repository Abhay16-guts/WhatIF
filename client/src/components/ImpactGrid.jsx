import { Users, TrendingUp, Cpu, Leaf, Palette, Layers } from 'lucide-react';
import CopyButton from './CopyButton';

const DIMENSIONS = [
  { key: 'society', label: 'Society & Daily Life', icon: Users },
  { key: 'economy', label: 'Economic Infrastructure', icon: TrendingUp },
  { key: 'technology', label: 'Technological Evolution', icon: Cpu },
  { key: 'environment', label: 'Ecological & Physical World', icon: Leaf },
  { key: 'culture', label: 'Culture, Arts & Beliefs', icon: Palette },
];

export default function ImpactGrid({ impacts = {} }) {
  const impactsCopy = DIMENSIONS.map(
    (dim) => `• ${dim.label.toUpperCase()}:\n${impacts[dim.key] || 'No recorded data.'}`
  ).join('\n\n');

  return (
    <section className="py-8 border-b border-paper-300" aria-labelledby="impacts-heading">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 id="impacts-heading" className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" aria-hidden="true" />
            <span>Multidimensional Impacts</span>
          </h2>
          <p className="text-xs text-ink-faint mt-1">
            Systemic transformations evaluated across structural domains.
          </p>
        </div>
        <CopyButton
          text={impactsCopy}
          label="Copy Impacts"
          toastMessage="Impacts copied to clipboard"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DIMENSIONS.map((dim) => {
          const Icon = dim.icon;
          const text = impacts[dim.key];

          return (
            <div
              key={dim.key}
              className="bg-paper-50 p-5 rounded-lg border border-paper-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded bg-paper-200 text-accent">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-ink">
                    {dim.label}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {text || 'Not analyzed for this scenario.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-paper-200 text-[0.65rem] uppercase font-bold tracking-wider text-ink-faint">
                Domain Dimension
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
