import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Compass className="w-16 h-16 text-ink-faint opacity-40" aria-hidden="true" />
        </div>
        <p className="text-sm font-sans font-medium tracking-widest uppercase text-ink-faint mb-3">
          Page Not Found
        </p>
        <h1 className="font-serif text-display font-bold text-ink mb-4">
          This reality doesn't exist
        </h1>
        <p className="text-ink-muted leading-relaxed mb-8">
          The page you're looking for may have slipped into an alternate timeline.
          Let's get you back to exploring.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-sm rounded-md hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}

