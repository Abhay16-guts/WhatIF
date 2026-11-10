import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Split, ArrowRight, Plus, Compass } from 'lucide-react';
import { getSavedScenarios } from '../utils/storage';
import { MOCK_SCENARIOS } from '../utils/mockData';

export default function Compare() {
  const [allScenarios, setAllScenarios] = useState([]);
  const [scenarioAId, setScenarioAId] = useState('');
  const [scenarioBId, setScenarioBId] = useState('');

  useEffect(() => {
    let list = getSavedScenarios();

    // If local storage has fewer than 2 items, seed or provide mock scenarios for convenience
    if (list.length < 2) {
      list = [...list, ...MOCK_SCENARIOS.filter((m) => !list.some((s) => s.id === m.id))];
    }

    setAllScenarios(list);
    if (list.length >= 2) {
      setScenarioAId(list[0].id);
      setScenarioBId(list[1].id);
    }
  }, []);

  const scenarioA = allScenarios.find((s) => s.id === scenarioAId);
  const scenarioB = allScenarios.find((s) => s.id === scenarioBId);

  if (allScenarios.length < 2) {
    return (
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 paper-texture min-h-[70vh]">
        <div className="text-center max-w-lg mx-auto bg-paper-50 p-8 sm:p-12 rounded-lg border border-paper-300 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-paper-200 flex items-center justify-center mx-auto mb-4 border border-paper-300">
            <Split className="w-8 h-8 text-ink-faint" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink mb-2">
            Comparison Requires Two Scenarios
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed mb-6">
            To juxtapose causal trajectories, the Atlas needs at least two distinct scenarios in your records.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Alternate Scenario</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 paper-texture">
      {/* Header */}
      <div className="pb-8 mb-8 border-b border-paper-300">
        <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-accent mb-2">
          <Split className="w-4 h-4" />
          <span>Multiverse Juxtaposition</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-2">
          Comparative Atlas Analysis
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed max-w-2xl">
          Evaluate two distinct counterfactual trajectories side by side. Compare divergence points, 
          temporal fallout velocity, and systemic structural consequences.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-paper-50 border border-paper-300 shadow-xs mb-10">
        {/* Scenario A Selector */}
        <div>
          <label htmlFor="scenario-a-select" className="block text-xs font-sans font-bold uppercase tracking-wider text-accent mb-2">
            Timeline Coordinate Alpha
          </label>
          <select
            id="scenario-a-select"
            value={scenarioAId}
            onChange={(e) => setScenarioAId(e.target.value)}
            className="w-full bg-paper-100 border border-paper-300 rounded p-2.5 text-sm font-medium text-ink focus:outline-none focus:border-accent"
          >
            {allScenarios.map((s) => (
              <option key={s.id} value={s.id} disabled={s.id === scenarioBId}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Scenario B Selector */}
        <div>
          <label htmlFor="scenario-b-select" className="block text-xs font-sans font-bold uppercase tracking-wider text-accent mb-2">
            Timeline Coordinate Beta
          </label>
          <select
            id="scenario-b-select"
            value={scenarioBId}
            onChange={(e) => setScenarioBId(e.target.value)}
            className="w-full bg-paper-100 border border-paper-300 rounded p-2.5 text-sm font-medium text-ink focus:outline-none focus:border-accent"
          >
            {allScenarios.map((s) => (
              <option key={s.id} value={s.id} disabled={s.id === scenarioAId}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {scenarioA && scenarioB && (
        <div className="space-y-12">
          {/* Section 1: Titles & Premise */}
          <div className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-ink-faint border-b border-paper-300 pb-2">
              01 — Divergence Premise
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alpha */}
              <div className="bg-paper-50 p-6 rounded-lg border border-paper-300">
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent block mb-1">
                  Timeline Alpha
                </span>
                <h3 className="font-serif text-xl font-bold text-ink mb-2">
                  {scenarioA.title}
                </h3>
                <p className="text-xs text-accent italic font-serif mb-4">
                  {scenarioA.tagline}
                </p>
                <p className="text-sm text-ink-muted leading-relaxed font-serif mb-4">
                  {scenarioA.premise}
                </p>
                <Link
                  to={`/scenario/${scenarioA.id}`}
                  state={{ scenario: scenarioA }}
                  className="text-xs text-accent font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Alpha Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Beta */}
              <div className="bg-paper-50 p-6 rounded-lg border border-paper-300">
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-accent block mb-1">
                  Timeline Beta
                </span>
                <h3 className="font-serif text-xl font-bold text-ink mb-2">
                  {scenarioB.title}
                </h3>
                <p className="text-xs text-accent italic font-serif mb-4">
                  {scenarioB.tagline}
                </p>
                <p className="text-sm text-ink-muted leading-relaxed font-serif mb-4">
                  {scenarioB.premise}
                </p>
                <Link
                  to={`/scenario/${scenarioB.id}`}
                  state={{ scenario: scenarioB }}
                  className="text-xs text-accent font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Beta Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Section 2: Timeline Rails */}
          <div className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-ink-faint border-b border-paper-300 pb-2">
              02 — Chronological Progression
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alpha Timeline */}
              <div className="bg-paper-50 p-6 rounded-lg border border-paper-300 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                  Alpha Milestones
                </span>
                {scenarioA.timeline?.map((ev, i) => (
                  <div key={i} className="pb-3 border-b border-paper-200 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-accent block mb-0.5">
                      {ev.yearLabel}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-ink mb-1">
                      {ev.eventTitle}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Beta Timeline */}
              <div className="bg-paper-50 p-6 rounded-lg border border-paper-300 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-2">
                  Beta Milestones
                </span>
                {scenarioB.timeline?.map((ev, i) => (
                  <div key={i} className="pb-3 border-b border-paper-200 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-accent block mb-0.5">
                      {ev.yearLabel}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-ink mb-1">
                      {ev.eventTitle}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Comparative Impact Matrix */}
          <div className="space-y-4">
            <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-ink-faint border-b border-paper-300 pb-2">
              03 — Multidimensional Divergence Matrix
            </h2>
            <div className="space-y-4">
              {['society', 'economy', 'technology', 'environment', 'culture'].map((dim) => (
                <div key={dim} className="bg-paper-50 p-5 rounded-lg border border-paper-300">
                  <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-ink mb-3 capitalize">
                    {dim}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-paper-100 rounded border border-paper-200">
                      <span className="text-[0.65rem] uppercase font-bold text-accent block mb-1">
                        Alpha: {scenarioA.title}
                      </span>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                        {scenarioA.impacts?.[dim] || 'Not recorded.'}
                      </p>
                    </div>
                    <div className="p-3 bg-paper-100 rounded border border-paper-200">
                      <span className="text-[0.65rem] uppercase font-bold text-accent block mb-1">
                        Beta: {scenarioB.title}
                      </span>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                        {scenarioB.impacts?.[dim] || 'Not recorded.'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
