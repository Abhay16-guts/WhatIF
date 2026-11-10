import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Sliders, Clock, ArrowRight } from 'lucide-react';
import GenerationStatus from '../components/GenerationStatus';
import { SAMPLE_PROMPTS } from '../components/HomeHero';
import { useToast } from '../context/ToastContext';
import { saveScenario } from '../utils/storage';
import { MOCK_SCENARIOS } from '../utils/mockData';

const TONE_OPTIONS = [
  { id: 'Thoughtful', label: 'Thoughtful', desc: 'Philosophical, measured, and nuanced' },
  { id: 'Scientific', label: 'Scientific', desc: 'Empirical, analytical, and rigorous' },
  { id: 'Cinematic', label: 'Cinematic', desc: 'Evocative, dramatic, and immersive' },
  { id: 'Playful', label: 'Playful', desc: 'Whimsical, curious, and lighthearted' },
];

const TIMELINE_OPTIONS = [
  { id: '10', label: '10 Years', desc: 'Immediate disruption & early adaptation' },
  { id: '50', label: '50 Years', desc: 'Generational equilibrium & societal shift' },
  { id: '100', label: '100 Years', desc: 'Deep systemic evolution & new civilization' },
];

export default function Create() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [prompt, setPrompt] = useState(location.state?.initialPrompt || '');
  const [tone, setTone] = useState('Thoughtful');
  const [timelineScale, setTimelineScale] = useState('50');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length < 10) {
      toast.error('Please enter a question with at least 10 characters.');
      return;
    }
    if (cleanPrompt.length > 500) {
      toast.error('Question exceeds maximum limit of 500 characters.');
      return;
    }

    setIsGenerating(true);

    try {
      // For Phase 3, we simulate generation using realistic mock generator with user parameters
      await new Promise((resolve) => setTimeout(resolve, 4000));

      const matchedMock = MOCK_SCENARIOS.find((s) =>
        s.prompt.toLowerCase().includes(cleanPrompt.toLowerCase().slice(0, 15))
      ) || MOCK_SCENARIOS[0];

      const newScenario = {
        ...matchedMock,
        id: `scenario-${Date.now()}`,
        prompt: cleanPrompt,
        tone,
        timelineScale,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage automatically on creation
      saveScenario(newScenario);
      toast.success('Alternate reality established!');
      navigate(`/scenario/${newScenario.id}`, { state: { scenario: newScenario } });
    } catch (err) {
      console.error('Generation error:', err);
      toast.error('Failed to generate scenario. Please try again.');
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-content mx-auto px-4 py-16 paper-texture min-h-[70vh]">
        <GenerationStatus promptText={prompt} onCancel={() => setIsGenerating(false)} />
      </div>
    );
  }

  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 paper-texture">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-paper-300">
          <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-accent mb-2">
            <Compass className="w-4 h-4" />
            <span>Atlas Composer</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-2">
            Formulate a Counterfactual Inquiry
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed">
            Construct the parameters of an alternate timeline. Our synthesis engine extrapolates 
            causal fallout across institutions, culture, technology, and individual experience.
          </p>
        </div>

        {/* Composer Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Prompt Input */}
          <div className="bg-paper-50 p-6 rounded-lg border border-paper-300 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="composer-prompt"
                className="text-xs font-sans font-bold uppercase tracking-wider text-ink"
              >
                The Hypothetical Divergence <span className="text-error">*</span>
              </label>
              <span className={`text-xs ${prompt.length > 500 ? 'text-error font-bold' : 'text-ink-faint'}`}>
                {prompt.length} / 500
              </span>
            </div>

            <textarea
              id="composer-prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. What if antibiotics were discovered in 1750? What if gravity was 20% weaker on Earth?"
              className="w-full bg-paper-100/70 border border-paper-300 rounded-md p-4 text-sm sm:text-base text-ink placeholder:text-ink-faint focus:bg-paper-50 focus:outline-none focus:border-accent transition-colors resize-none"
              required
              minLength={10}
              maxLength={500}
            />

            {/* Quick Chips */}
            <div className="pt-2">
              <span className="text-xs text-ink-faint block mb-2">Sample inquiries:</span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setPrompt(sample)}
                    className="text-xs px-2.5 py-1 rounded bg-paper-200/60 hover:bg-paper-200 border border-paper-300 text-ink-muted hover:text-ink transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tone Selector */}
          <div className="bg-paper-50 p-6 rounded-lg border border-paper-300 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-ink">
              <Sliders className="w-4 h-4 text-accent" />
              <span>Inquiry Tone & Perspective</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Tone selection">
              {TONE_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={tone === t.id}
                  onClick={() => setTone(t.id)}
                  className={`p-3.5 rounded-md border text-left transition-all ${
                    tone === t.id
                      ? 'border-accent bg-accent-light/30 ring-1 ring-accent'
                      : 'border-paper-300 bg-paper-100 hover:bg-paper-200/60'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-ink mb-0.5">
                    {t.label}
                  </div>
                  <div className="text-xs text-ink-muted">
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Scale */}
          <div className="bg-paper-50 p-6 rounded-lg border border-paper-300 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-ink">
              <Clock className="w-4 h-4 text-accent" />
              <span>Temporal Horizon</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Temporal scale selection">
              {TIMELINE_OPTIONS.map((scale) => (
                <button
                  key={scale.id}
                  type="button"
                  role="radio"
                  aria-checked={timelineScale === scale.id}
                  onClick={() => setTimelineScale(scale.id)}
                  className={`p-3.5 rounded-md border text-left transition-all ${
                    timelineScale === scale.id
                      ? 'border-accent bg-accent-light/30 ring-1 ring-accent'
                      : 'border-paper-300 bg-paper-100 hover:bg-paper-200/60'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-ink mb-0.5">
                    {scale.label}
                  </div>
                  <div className="text-xs text-ink-muted">
                    {scale.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-paper-300">
            <p className="text-xs text-ink-faint">
              Generates premise, timeline, impacts, narrative, and follow-up paths.
            </p>

            <button
              type="submit"
              disabled={prompt.trim().length < 10}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md bg-accent text-white font-medium text-sm hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Alternate Reality</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
