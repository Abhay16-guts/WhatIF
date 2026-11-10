import { useState } from 'react';
import { HelpCircle, Send, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function FollowUpComposer({
  suggestedQuestions = [],
  scenarioContext,
  onAskFollowUp,
}) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qaList, setQaList] = useState([]);
  const toast = useToast();

  const handleAsk = async (textToAsk) => {
    const q = (textToAsk || question).trim();
    if (q.length < 5) {
      toast.error('Question must be at least 5 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      if (onAskFollowUp) {
        const answer = await onAskFollowUp(q, scenarioContext);
        setQaList((prev) => [...prev, { question: q, answer, id: Date.now() }]);
        setQuestion('');
      } else {
        // Fallback / mock response for Phase 3
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockAnswer = `In this reality, ${q.toLowerCase().replace(/\?$/, '')} evolved along strict institutional lines. Because the baseline assumptions established continuous metabolic recovery, traditional friction points were resolved through decentralized cooperative networks and revised civic charters.`;
        setQaList((prev) => [...prev, { question: q, answer: mockAnswer, id: Date.now() }]);
        setQuestion('');
      }
    } catch (err) {
      console.error('Follow-up error:', err);
      toast.error(err.message || 'Failed to analyze follow-up question.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChipClick = (q) => {
    setQuestion(q);
    handleAsk(q);
  };

  return (
    <section className="py-8 border-b border-paper-300" aria-labelledby="followup-heading">
      <div className="mb-6">
        <h2 id="followup-heading" className="font-serif text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent" aria-hidden="true" />
          <span>Interrogate the Timeline</span>
        </h2>
        <p className="text-xs text-ink-faint mt-1">
          Pose targeted questions grounded within this scenario's established rules and timeline.
        </p>
      </div>

      {/* Suggested Follow-up Chips */}
      {suggestedQuestions.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-sans font-semibold uppercase tracking-wider text-ink-faint mb-2">
            Suggested Angles of Inquiry
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(q)}
                disabled={isLoading}
                className="text-xs px-3 py-2 rounded-full bg-paper-50 hover:bg-paper-200 border border-paper-300 text-ink-muted hover:text-ink transition-colors text-left flex items-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3 text-accent shrink-0" aria-hidden="true" />
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(question);
        }}
        className="mb-8"
      >
        <div className="bg-paper-50 p-4 rounded-lg border border-paper-300 shadow-xs focus-within:border-accent">
          <label htmlFor="followup-input" className="sr-only">
            Ask a follow-up question
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="followup-input"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How did legal and court systems function?"
              disabled={isLoading}
              maxLength={300}
              className="flex-1 bg-paper-100/70 border border-paper-300 rounded px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:bg-paper-50 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || question.trim().length < 5}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-accent text-white font-medium text-sm hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Examining…</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Inquire</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Answers History */}
      {qaList.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-ink-faint">
            Timeline Dispatches
          </h3>
          <div className="space-y-4">
            {qaList.map((item) => (
              <div
                key={item.id}
                className="bg-paper-50 rounded-lg border border-paper-300 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start gap-2 text-ink font-serif font-bold text-sm sm:text-base">
                  <MessageSquare className="w-4 h-4 text-accent shrink-0 mt-1" aria-hidden="true" />
                  <span>Q: {item.question}</span>
                </div>
                <div className="pl-6 border-l-2 border-accent/40 text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
