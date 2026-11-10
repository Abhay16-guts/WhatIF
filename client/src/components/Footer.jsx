import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-paper-300 bg-paper-100" role="contentinfo">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-ink-faint" aria-hidden="true" />
            <span className="font-serif text-sm font-semibold text-ink-muted">
              WHATIF
            </span>
            <span className="text-ink-faint text-[0.65rem] font-sans font-medium tracking-widest uppercase">
              World Atlas
            </span>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6 text-sm text-ink-muted" role="list">
              <li>
                <Link to="/" className="hover:text-ink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-ink transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-ink transition-colors">
                  Compare
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-paper-300">
          <p className="text-xs text-ink-faint leading-relaxed max-w-prose">
            WhatIf AI generates fictional alternate realities for entertainment and thought experiments.
            All scenarios are speculative and should not be interpreted as predictions, advice, or factual analysis.
          </p>
          <p className="text-xs text-ink-faint mt-2">
            &copy; {new Date().getFullYear()} WhatIf AI. A speculative exploration project.
          </p>
        </div>
      </div>
    </footer>
  );
}

