import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Search, Trash2, ArrowRight, Clock, Plus, Split } from 'lucide-react';
import { getSavedScenarios, removeScenario, clearAllScenarios } from '../utils/storage';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../context/ToastContext';

export default function History() {
  const [scenarios, setScenarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const toast = useToast();

  const loadScenarios = () => {
    const list = getSavedScenarios();
    setScenarios(list);
  };

  useEffect(() => {
    loadScenarios();
  }, []);

  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    const ok = removeScenario(itemToDelete.id);
    if (ok) {
      toast.success('Scenario removed from history.');
      loadScenarios();
    } else {
      toast.error('Failed to remove scenario.');
    }
    setItemToDelete(null);
  };

  const handleClearAll = () => {
    const ok = clearAllScenarios();
    if (ok) {
      toast.success('All history cleared.');
      loadScenarios();
    } else {
      toast.error('Failed to clear history.');
    }
    setShowClearConfirm(false);
  };

  // Filtered by title or prompt
  const filtered = scenarios.filter((s) => {
    const q = searchTerm.toLowerCase();
    const titleMatch = s.title?.toLowerCase().includes(q);
    const promptMatch = s.prompt?.toLowerCase().includes(q);
    const premiseMatch = s.premise?.toLowerCase().includes(q);
    return titleMatch || promptMatch || premiseMatch;
  });

  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 paper-texture min-h-[75vh]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8 border-b border-paper-300">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-accent mb-2">
            <Bookmark className="w-4 h-4" />
            <span>Local Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-2">
            Saved Scenarios Library
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed max-w-xl">
            Browse and manage your locally archived counterfactual realities. All records are 
            stored securely inside your browser's private offline storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-accent text-white text-xs uppercase tracking-wider font-semibold hover:bg-accent-hover transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Inquiry</span>
          </Link>
          {scenarios.length >= 2 && (
            <Link
              to="/compare"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-paper-300 bg-paper-50 text-ink text-xs uppercase tracking-wider font-semibold hover:bg-paper-200 transition-colors"
            >
              <Split className="w-3.5 h-3.5 text-accent" />
              <span>Compare Scenarios</span>
            </Link>
          )}
          {scenarios.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-paper-300 bg-paper-50 text-error text-xs font-medium hover:bg-error/10 transition-colors"
              title="Clear all saved history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      {scenarios.length > 0 && (
        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by question, title, or premise…"
              className="w-full bg-paper-50 border border-paper-300 rounded-md pl-10 pr-4 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent"
              aria-label="Filter saved scenarios"
            />
          </div>
        </div>
      )}

      {/* Content / List */}
      {scenarios.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-paper-50 rounded-lg border border-paper-300 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-paper-200 flex items-center justify-center mx-auto mb-4 border border-paper-300">
            <Bookmark className="w-6 h-6 text-ink-faint" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-ink mb-2">
            No Saved Scenarios Yet
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-6 max-w-sm mx-auto">
            Your personal archive is currently vacant. Formulate your first counterfactual question 
            to start building a catalogue of alternate timelines.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors shadow-sm"
          >
            <span>Begin Your First Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        /* No filter results */
        <div className="text-center py-12 bg-paper-50 rounded-lg border border-paper-300">
          <p className="text-ink-muted text-sm mb-3">
            No archived scenarios matched "<span className="font-semibold">{searchTerm}</span>".
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-accent font-semibold hover:underline"
          >
            Clear filter query
          </button>
        </div>
      ) : (
        /* Scenarios Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => {
            const dateStr = item.createdAt
              ? new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Unknown Date';

            return (
              <div
                key={item.id}
                className="bg-paper-50 p-6 rounded-lg border border-paper-300 shadow-xs hover:border-accent/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-faint mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {dateStr}
                    </span>
                    {item.tone && (
                      <span className="px-2 py-0.5 rounded bg-paper-200 text-ink-muted font-medium">
                        {item.tone}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-xl font-bold text-ink mb-2 line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-accent font-medium italic mb-3 line-clamp-1">
                    {item.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3 mb-4">
                    {item.premise}
                  </p>
                </div>

                <div className="pt-4 border-t border-paper-200 flex items-center justify-between gap-3">
                  <Link
                    to={`/scenario/${item.id}`}
                    state={{ scenario: item }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
                  >
                    <span>Read Full Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="p-1.5 rounded hover:bg-paper-200 text-ink-faint hover:text-error transition-colors"
                    title="Delete scenario"
                    aria-label={`Delete scenario: ${item.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Item Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(itemToDelete)}
        title="Delete this scenario?"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Scenario"
        isDestructive
        onConfirm={handleDeleteItem}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Clear All Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear all saved history?"
        message="This will permanently delete all saved alternate reality scenarios from your local browser storage."
        confirmLabel="Clear All"
        isDestructive
        onConfirm={handleClearAll}
        onCancel={() => setShowClearConfirm(false)}
      />
    </section>
  );
}

