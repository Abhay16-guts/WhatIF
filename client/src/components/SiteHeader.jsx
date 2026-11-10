import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/create', label: 'Create' },
  { to: '/history', label: 'History' },
  { to: '/compare', label: 'Compare' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 relative py-1 ${
      isActive
        ? 'text-accent font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
        : 'text-ink-muted hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-paper-100/95 backdrop-blur-sm border-b border-paper-300">
      <nav
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setMobileOpen(false)}
        >
          <Compass
            className="w-6 h-6 text-accent group-hover:rotate-45 transition-transform duration-300"
            aria-hidden="true"
          />
          <span className="font-serif text-xl font-bold tracking-tight text-ink">
            WHATIF
          </span>
          <span className="text-ink-faint text-[0.65rem] font-sans font-bold tracking-widest uppercase hidden sm:inline border-l border-paper-300 pl-2.5">
            World Atlas
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/create"
            className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-md bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm"
          >
            New Inquiry
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-paper-200 transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-ink" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5 text-ink" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-paper-300 bg-paper-100 shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="px-4 py-4 space-y-2" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent bg-accent-light/50 font-semibold'
                        : 'text-ink-muted hover:text-ink hover:bg-paper-200'
                    }`
                  }
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
