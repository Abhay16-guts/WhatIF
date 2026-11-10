import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import ScenarioHeader from '../components/ScenarioHeader';
import AssumptionsList from '../components/AssumptionsList';
import TimelineRail from '../components/TimelineRail';
import ImpactGrid from '../components/ImpactGrid';
import StoryPanel from '../components/StoryPanel';
import FollowUpComposer from '../components/FollowUpComposer';
import { getSavedScenarios, saveScenario, removeScenario, isScenarioSaved } from '../utils/storage';
import { askFollowUpApi } from '../utils/api';
import { MOCK_SCENARIOS } from '../utils/mockData';
import { useToast } from '../context/ToastContext';

export default function ScenarioDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [scenario, setScenario] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check location state
    if (location.state?.scenario && location.state.scenario.id === id) {
      setScenario(location.state.scenario);
      setSaved(isScenarioSaved(id));
      setLoading(false);
      return;
    }

    // 2. Check saved scenarios in localStorage
    const savedList = getSavedScenarios();
    const found = savedList.find((s) => s.id === id);

    if (found) {
      setScenario(found);
      setSaved(true);
      setLoading(false);
      return;
    }

    // 3. Fallback match from mock data by id
    const mockFound = MOCK_SCENARIOS.find((s) => s.id === id);
    if (mockFound) {
      setScenario(mockFound);
      setSaved(isScenarioSaved(mockFound.id));
      setLoading(false);
      return;
    }

    // 4. Default to first mock scenario if id not found
    if (MOCK_SCENARIOS.length > 0) {
      setScenario({
        ...MOCK_SCENARIOS[0],
        id: id || MOCK_SCENARIOS[0].id,
      });
      setSaved(isScenarioSaved(id));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, location.state]);

  const handleToggleSave = () => {
    if (!scenario) return;

    if (saved) {
      removeScenario(scenario.id);
      setSaved(false);
      toast.info('Scenario removed from saved history.');
    } else {
      const res = saveScenario(scenario);
      if (res.success) {
        setSaved(true);
        toast.success('Scenario saved to your Atlas archive!');
      } else {
        toast.error(res.reason || 'Failed to save scenario.');
      }
    }
  };

  const handleRegenerate = () => {
    if (!scenario) return;
    navigate('/create', { state: { initialPrompt: scenario.prompt || scenario.title } });
  };

  if (loading) {
    return (
      <div className="max-w-content mx-auto px-4 py-24 text-center">
        <Compass className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
        <p className="text-sm text-ink-muted">Loading timeline dossier…</p>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="max-w-content mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-2xl font-bold text-ink mb-4">
          Scenario Not Located
        </h1>
        <p className="text-sm text-ink-muted mb-6">
          This alternate reality does not exist in local records.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-accent text-white text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Create New Scenario
        </Link>
      </div>
    );
  }

  return (
    <div className="paper-texture">
      {/* Back button bar */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Atlas Home</span>
        </Link>
      </div>

      <article className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-2">
        {/* Scenario Header */}
        <ScenarioHeader
          scenario={scenario}
          isSaved={saved}
          onToggleSave={handleToggleSave}
          onRegenerate={handleRegenerate}
        />

        {/* Premise & Assumptions */}
        <AssumptionsList
          premise={scenario.premise}
          assumptions={scenario.assumptions}
        />

        {/* Chronological Timeline */}
        <TimelineRail timeline={scenario.timeline} />

        {/* Multidimensional Impacts */}
        <ImpactGrid impacts={scenario.impacts} />

        {/* Speculative Short Story */}
        <StoryPanel story={scenario.story} />

        {/* Grounded Follow-up Questions */}
        <FollowUpComposer
          suggestedQuestions={scenario.followUpQuestions}
          scenarioContext={{
            title: scenario.title,
            premise: scenario.premise,
            timeline: scenario.timeline,
          }}
          onAskFollowUp={async (question, scenarioContext) => {
            try {
              const res = await askFollowUpApi({ question, scenarioContext });
              return res.answer;
            } catch (err) {
              if (err.code === 'MISSING_API_KEY' || err.code === 'NETWORK_ERROR') {
                return `In this alternate reality, ${question.toLowerCase().replace(/\?$/, '')} resolved through the established institutional and physical mechanisms outlined in the premise. The community mobilized civic councils and adapted logistical protocols to maintain stability. (Add GEMINI_API_KEY in server/.env for live dynamic Q&A)`;
              }
              throw err;
            }
          }}
        />

        {/* Persistent Editorial Disclaimer */}
        <footer className="pt-8 text-center" aria-label="Speculative disclaimer">
          <div className="p-4 rounded-lg bg-paper-200/60 border border-paper-300 max-w-2xl mx-auto">
            <p className="text-xs text-ink-faint leading-relaxed">
              {scenario.fictionNotice ||
                'WhatIf AI produces speculative fiction and thought experiments. This dossier does not constitute scientific consensus, factual prediction, or professional advice.'}
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}
