import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSavedScenarios,
  saveScenario,
  removeScenario,
  isScenarioSaved,
  clearAllScenarios,
  isValidScenario,
  STORAGE_KEY,
} from '../utils/storage';

const sampleScenario = {
  id: 'test-1',
  title: 'Test World',
  premise: 'What if gravity was reversed?',
  timeline: [{ yearLabel: 'Year 1', eventTitle: 'Fall Up', description: 'Everything floated.' }],
  impacts: { society: 'Chairs were bolted to ceilings.' },
  story: { title: 'Upward', body: 'Looking up was looking down.' },
  createdAt: '2026-11-10T10:00:00.000Z',
};

describe('Storage Utils', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('validates scenario format', () => {
    expect(isValidScenario(sampleScenario)).toBe(true);
    expect(isValidScenario({})).toBe(false);
    expect(isValidScenario(null)).toBe(false);
  });

  it('saves and retrieves a scenario', () => {
    const saveResult = saveScenario(sampleScenario);
    expect(saveResult.success).toBe(true);

    const saved = getSavedScenarios();
    expect(saved).toHaveLength(1);
    expect(saved[0].id).toBe('test-1');
    expect(isScenarioSaved('test-1')).toBe(true);
  });

  it('removes a scenario by id', () => {
    saveScenario(sampleScenario);
    expect(isScenarioSaved('test-1')).toBe(true);

    const removeResult = removeScenario('test-1');
    expect(removeResult).toBe(true);
    expect(isScenarioSaved('test-1')).toBe(false);
    expect(getSavedScenarios()).toHaveLength(0);
  });

  it('clears all scenarios', () => {
    saveScenario(sampleScenario);
    saveScenario({ ...sampleScenario, id: 'test-2' });
    expect(getSavedScenarios()).toHaveLength(2);

    clearAllScenarios();
    expect(getSavedScenarios()).toHaveLength(0);
  });

  it('handles corrupted localStorage gracefully', () => {
    window.localStorage.setItem(STORAGE_KEY, 'invalid-json{{{');
    const scenarios = getSavedScenarios();
    expect(scenarios).toEqual([]);
  });
});
