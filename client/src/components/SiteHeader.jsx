import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/history', label: 'History' },
  { to: '/compare', label: 'Compare' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  const handleNavClick = () => setMobileOpen(false);

  // Close on Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setMobileOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-accent'
        : 'text-ink-muted hover:text-ink'
    }`;

  return (
    <header
      className="sticky top-0 z-50 bg-paper-100/95 backdrop-blur-sm border-b border-paper-300"
      onKeyDown={handleKeyDown}
    >
      <nav
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={handleNavClick}
        >
          <Compass
            className="w-6 h-6 text-accent group-hover:rotate-45 transition-transform duration-300"
            aria-hidden="true"
          />
          <span className="font-serif text-lg font-bold tracking-tight">
            WHATIF
          </span>
          <span className="text-ink-faint text-xs font-sans font-medium tracking-widest uppercase hidden sm:inline">
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

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-paper-200 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-paper-300 bg-paper-100"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="px-4 py-4 space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent bg-accent-light/50'
                        : 'text-ink-muted hover:text-ink hover:bg-paper-200'
                    }`
                  }
                  end={link.to === '/'}
                  onClick={handleNavClick}
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

