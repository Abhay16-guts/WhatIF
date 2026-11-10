import { BookOpen } from 'lucide-react';
import CopyButton from './CopyButton';

export default function StoryPanel({ story = {} }) {
  const storyCopy = `SPECULATIVE VIGNETTE: "${story?.title}"\n\n${story?.body}`;

  return (
    <section className="py-8 border-b border-paper-300" aria-labelledby="story-heading">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 id="story-heading" className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" aria-hidden="true" />
            <span>Ground-Level Narrative</span>
          </h2>
          <p className="text-xs text-ink-faint mt-1">
            An evocative human vignette captured from inside the alternate reality.
          </p>
        </div>
        <CopyButton
          text={storyCopy}
          label="Copy Story"
          toastMessage="Story copied to clipboard"
        />
      </div>

      <div className="bg-ink text-paper-50 p-6 sm:p-10 rounded-lg shadow-md border border-ink-light relative overflow-hidden">
        {/* Subtle decorative watermark */}
        <div className="absolute right-4 bottom-2 text-paper-200/5 font-serif text-8xl select-none pointer-events-none">
          §
        </div>

        <div className="relative z-10 max-w-prose">
          <div className="inline-block text-xs font-sans font-bold uppercase tracking-widest text-accent-light mb-3">
            Speculative Vignette
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper-50 mb-6 leading-tight">
            "{story?.title || 'Untitled Fragment'}"
          </h3>

          <p className="font-serif text-base sm:text-lg text-paper-200 leading-relaxed italic">
            {story?.body || 'No narrative excerpt available.'}
          </p>
        </div>
      </div>
    </section>
  );
}

