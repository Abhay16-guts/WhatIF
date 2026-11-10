import { Clock } from 'lucide-react';
import CopyButton from './CopyButton';

export default function TimelineRail({ timeline = [] }) {
  const timelineCopy = timeline
    .map((item) => `• ${item.yearLabel}: ${item.eventTitle}\n  ${item.description}`)
    .join('\n\n');

  return (
    <section className="py-8 border-b border-paper-300" aria-labelledby="timeline-heading">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 id="timeline-heading" className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" aria-hidden="true" />
            <span>Chronological Fallout</span>
          </h2>
          <p className="text-xs text-ink-faint mt-1">
            Sequential progression of historical, technical, and societal shifts across time.
          </p>
        </div>
        <CopyButton
          text={timelineCopy}
          label="Copy Timeline"
          toastMessage="Timeline copied to clipboard"
        />
      </div>

      <div className="relative border-l-2 border-paper-300 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 my-4">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Pin */}
            <span
              className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-paper-100 border-2 border-accent transition-transform duration-200 group-hover:scale-125"
              aria-hidden="true"
            />
            <div className="bg-paper-50 p-5 rounded-lg border border-paper-300 shadow-xs hover:border-accent/40 transition-colors">
              <span className="inline-block text-xs font-sans font-bold text-accent uppercase tracking-wider mb-1">
                {event.yearLabel}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-ink mb-2">
                {event.eventTitle}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
