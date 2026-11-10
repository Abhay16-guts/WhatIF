import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_PROMPTS } from '../utils/constants';

export default function HomeHero() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim().length >= 5) {
      navigate('/create', { state: { initialPrompt: prompt.trim() } });
    }
  };

  const handleChipClick = (sample) => {
    setPrompt(sample);
  };

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-paper-300">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-paper-200/80 border border-paper-300 text-xs font-sans font-medium tracking-widest uppercase text-ink-muted">
            <Compass className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            <span>Speculative Atlas • Volume I</span>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-[1.1] mb-6">
            A different world begins with one question.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto mb-10">
            Pose any hypothetical question. Step into a structured alternate reality complete with 
            divergent timelines, multidimensional societal fallout, and human stories from the alternate future.
          </p>

          {/* Prompt Composer Box */}
          <div className="bg-paper-50 rounded-lg border border-paper-300 shadow-sm p-4 sm:p-6 text-left mb-6 transition-all duration-200 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hero-prompt-input" className="block text-xs font-sans font-semibold tracking-wider uppercase text-ink-faint mb-2">
                  Inquire into the Multiverse
                </label>
                <div className="relative">
                  <textarea
                    id="hero-prompt-input"
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. What if antibiotics were never discovered?"
                    className="w-full bg-paper-100/60 border border-paper-300 rounded-md px-4 py-3 text-ink placeholder:text-ink-faint text-sm sm:text-base focus:bg-paper-50 focus:outline-none transition-colors resize-none"
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-ink-faint mt-1">
                    {prompt.length}/500
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-paper-200">
                <span className="text-xs text-ink-faint flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                  Structured speculation • Fully cited premises
                </span>

                <button
                  type="submit"
                  disabled={prompt.trim().length < 5}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-accent text-white font-medium text-sm hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>Explore World</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          {/* Sample Chips */}
          <div className="space-y-2">
            <p className="text-xs font-sans font-semibold tracking-wider uppercase text-ink-faint text-center">
              Or examine a documented divergence:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {SAMPLE_PROMPTS.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleChipClick(sample)}
                  className="text-xs px-3 py-1.5 rounded-full bg-paper-50 hover:bg-paper-200 border border-paper-300 text-ink-muted hover:text-ink transition-colors text-left"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Notice */}
          <p className="text-xs text-ink-faint mt-8 text-center">
            All generated scenarios are speculative fiction for thought experimentation — not factual predictions or advice.
          </p>
        </div>
      </div>
    </section>
  );
}
