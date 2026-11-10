import { Clock, Layers, BookOpen, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SAMPLE_SCENARIO_DATA = {
  id: 'sample-awake-era',
  title: 'The Great Vigil: The Century Without Slumber',
  tagline: 'When human biochemistry evolved past the circadian necessity of sleep.',
  premise: 'In 2042, an atmospheric catalyst permanently altered the adenosine feedback loop in Homo sapiens. Within six months, the requirement for biological sleep vanished entirely, giving every person eight extra waking hours every single day.',
  assumptions: [
    'Cellular repair occurs passively through micro-rests during regular wakefulness.',
    'Cognitive fatigue is managed by caloric intake rather than unconscious rest.',
    'Brain neuroplasticity remains stable without REM cycles.',
  ],
  timeline: [
    {
      yearLabel: 'Year 1 (2042)',
      eventTitle: 'The 24-Hour Grid Shift',
      description: 'Global power consumption surges 34%. Residential real estate redesigns remove bedrooms in favor of private studios and secondary workshops.',
    },
    {
      yearLabel: 'Year 10 (2052)',
      eventTitle: 'The Tri-Career Paradigm',
      description: 'The standard working day fractures. Adults routinely master two independent professions simultaneously, doubling scientific publication rates.',
    },
    {
      yearLabel: 'Year 50 (2092)',
      eventTitle: 'The Great Cultural Deceleration',
      description: 'With 33% more lifespan-hours, the hurry of modern life evaporates. Books lengthen, symphonies expand to twelve hours, and generational wisdom deepens.',
    },
  ],
  impacts: {
    society: 'The concept of nightlife ceases to exist; cities operate at continuous steady-state vibrancy without curfews.',
    economy: 'Output triples over two decades, but labor unions successfully mandate 16-hour weekly leisure quotas.',
    technology: 'Personal computing interfaces adapt to non-stop cognitive flow, creating adaptive brainwave modulation screens.',
    environment: 'Light pollution doubles, forcing subterranean observatories and bio-luminescent city street canopies.',
    culture: 'Sleep is romanticized as an ancient mystical trance; simulated sleep parlors become luxury retreats.',
  },
  story: {
    title: 'The 4 A.M. Tea Merchant',
    body: 'Maren set the brass kettle down over the induction coil as the chime struck 04:00. Fifty years ago, she was told, this street was bathed in quiet darkness, shuttered behind drawn blinds. Tonight, poets and structural architects sat at her terrace tables arguing over tensile bridge calculations under the gentle amber glow of street lanterns. "To think our ancestors spent a third of life behind closed eyelids," an old professor murmured. Maren poured the steeped mint tea and smiled. In the eternal morning, there was finally time for everything.',
  },
};

export default function FeaturedScenario() {
  return (
    <section className="py-16 sm:py-24 bg-paper-50 border-b border-paper-300">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-paper-300">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Atlas Showcase № 402</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ink tracking-tight">
              Anatomy of a Divergence
            </h2>
          </div>
          <p className="text-sm text-ink-muted max-w-md">
            Every hypothetical inquiry generates a multidimensional study with verified internal logic, 
            temporal consequences, and grounded narratives.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Premise & Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Divergence Header */}
            <div className="bg-paper-100 p-6 sm:p-8 rounded-lg border border-paper-300 shadow-sm">
              <div className="flex items-center justify-between text-xs text-ink-faint uppercase tracking-wider mb-3">
                <span>Divergence Point</span>
                <span>Circadian Shift</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-2">
                {SAMPLE_SCENARIO_DATA.title}
              </h3>
              <p className="text-sm font-medium text-accent mb-4">
                {SAMPLE_SCENARIO_DATA.tagline}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                {SAMPLE_SCENARIO_DATA.premise}
              </p>

              {/* Assumptions */}
              <div className="pt-4 border-t border-paper-200">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-faint mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  Underlying Assumptions
                </h4>
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  {SAMPLE_SCENARIO_DATA.assumptions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent font-serif font-bold">§{idx + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline Rail Preview */}
            <div className="bg-paper-100 p-6 sm:p-8 rounded-lg border border-paper-300 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-accent" />
                <h4 className="font-serif text-lg font-bold text-ink">Chronological Rail</h4>
              </div>

              <div className="relative border-l-2 border-paper-300 ml-3 pl-6 space-y-8">
                {SAMPLE_SCENARIO_DATA.timeline.map((event, idx) => (
                  <div key={idx} className="relative group">
                    {/* Rail Pin */}
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-paper-50 border-2 border-accent" />
                    <span className="text-xs font-sans font-bold text-accent tracking-wider uppercase block mb-1">
                      {event.yearLabel}
                    </span>
                    <h5 className="font-serif text-base font-semibold text-ink mb-1">
                      {event.eventTitle}
                    </h5>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Impacts & Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Impact Matrix */}
            <div className="bg-paper-100 p-6 sm:p-8 rounded-lg border border-paper-300 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Layers className="w-4 h-4 text-accent" />
                <h4 className="font-serif text-lg font-bold text-ink">Dimensional Fallout</h4>
              </div>

              <div className="space-y-4">
                {Object.entries(SAMPLE_SCENARIO_DATA.impacts).map(([category, detail]) => (
                  <div key={category} className="pb-3 border-b border-paper-200 last:border-b-0 last:pb-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint block capitalize mb-1">
                      {category}
                    </span>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Speculative Narrative Card */}
            <div className="bg-ink text-paper-50 p-6 sm:p-8 rounded-lg shadow-md border border-ink-light">
              <div className="flex items-center justify-between text-xs text-accent-light uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Speculative Vignette
                </span>
                <span>Scene 01</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-paper-50 mb-3">
                "{SAMPLE_SCENARIO_DATA.story.title}"
              </h4>
              <p className="text-xs sm:text-sm text-paper-200/90 leading-relaxed italic font-serif mb-6">
                {SAMPLE_SCENARIO_DATA.story.body}
              </p>

              <Link
                to="/create"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:text-white transition-colors"
              >
                <span>Compose your own timeline</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
