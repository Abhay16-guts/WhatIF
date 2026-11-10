export default function Home() {
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-xs font-sans font-medium tracking-widest uppercase text-ink-faint mb-4">
          Speculative World Atlas
        </p>

        {/* Headline */}
        <h1 className="font-serif text-display-lg sm:text-display-xl font-bold text-ink mb-6">
          A different world begins with one question.
        </h1>

        {/* Subtext */}
        <p className="text-lg text-ink-muted leading-relaxed max-w-xl mx-auto mb-10">
          Ask a "What if" question and explore a structured alternate reality — complete with
          timelines, impacts, and a short story set in that world.
        </p>

        {/* Prompt composer placeholder */}
        <div className="bg-paper-50 border border-paper-300 rounded-lg p-6 shadow-sm max-w-xl mx-auto mb-6">
          <p className="text-ink-muted text-sm italic">
            Prompt composer coming in Phase 3…
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-ink-faint mt-8">
          All scenarios are fictional thought experiments — not predictions or advice.
        </p>
      </div>
    </section>
  );
}

