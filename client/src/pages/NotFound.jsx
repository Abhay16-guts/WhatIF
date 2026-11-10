import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16 paper-texture">
      <div className="text-center max-w-lg mx-auto bg-paper-50 p-8 sm:p-12 rounded-lg border border-paper-300 shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-paper-200 flex items-center justify-center border border-paper-300">
            <Compass className="w-8 h-8 text-accent animate-pulse" aria-hidden="true" />
          </div>
        </div>
        <p className="text-xs font-sans font-bold tracking-widest uppercase text-accent mb-2">
          Coordinates Uncharted • Error 404
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-4">
          This Alternate Reality Does Not Exist
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed mb-8">
          The requested coordinate lies beyond the recorded timeline of this Atlas.
          The timeline may have collapsed or the link may have diverged.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-white font-medium text-sm rounded-md hover:bg-accent-hover transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to Atlas Home</span>
          </Link>
          <Link
            to="/create"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-paper-200 text-ink font-medium text-sm rounded-md hover:bg-paper-300 transition-colors"
          >
            <span>Begin New Inquiry</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
