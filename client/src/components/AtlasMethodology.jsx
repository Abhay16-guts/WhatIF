import { Compass, GitBranch, Split, Sparkles } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Compass,
    title: 'The Counterfactual Premise',
    description: 'Establish the explicit turning point and necessary physical, biological, or historical boundary conditions.',
  },
  {
    number: '02',
    icon: GitBranch,
    title: 'Chronological Fallout',
    description: 'Map ripple effects sequentially across decades, tracing initial disruption to generational equilibrium.',
  },
  {
    number: '03',
    icon: Split,
    title: 'Multidimensional Impact',
    description: 'Evaluate structural consequences across economy, culture, technology, climate, and daily domestic life.',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Ground-Level Vignette',
    description: 'Experience an ordinary human perspective inside the alternate reality through an evocative short narrative.',
  },
];

export default function AtlasMethodology() {
  return (
    <section className="py-16 sm:py-24 border-b border-paper-300">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-sans font-semibold tracking-widest uppercase text-accent mb-2">
            System of Inquiry
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink tracking-tight mb-4">
            How the Atlas Constructs Reality
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Every hypothetical exploration is parsed through an editorial framework designed to prevent 
            generic hand-waving and construct cohesive speculative models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="relative p-6 rounded-lg bg-paper-50 border border-paper-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-ink-faint">
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-paper-200">
                  <span className="text-[0.65rem] uppercase tracking-wider text-ink-faint font-semibold">
                    Rigorous extrapolation
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
