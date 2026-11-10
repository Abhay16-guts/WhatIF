/**
 * Storage utilities for WhatIf AI.
 * Handles localStorage with defensive parsing, versioned key, and error boundaries.
 */

export const STORAGE_KEY = 'whatif:history:v1';
export const MAX_HISTORY_ITEMS = 30;

/**
 * Checks if localStorage is available in the current environment.
 */
function isLocalStorageAvailable() {
  try {
    const testKey = '__whatif_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (_e) {
    return false;
  }
}

/**
 * Validates whether an object has the essential shape of a scenario.
 */
export function isValidScenario(item) {
  return Boolean(
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.premise === 'string' &&
    Array.isArray(item.timeline) &&
    typeof item.impacts === 'object' &&
    typeof item.story === 'object'
  );
}

/**
 * Retrieves all saved scenarios, sorted newest first.
 */
export function getSavedScenarios() {
  if (!isLocalStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter valid items only and sort by timestamp descending
    return parsed
      .filter(isValidScenario)
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } catch (err) {
    console.warn('Failed to read scenarios from localStorage:', err);
    return [];
  }
}

/**
 * Saves a scenario to history. Returns { success: boolean, reason?: string }.
 */
export function saveScenario(scenario) {
  if (!isLocalStorageAvailable()) {
    return { success: false, reason: 'Local storage is not supported in this browser.' };
  }

  if (!isValidScenario(scenario)) {
    return { success: false, reason: 'Invalid scenario data format.' };
  }

  try {
    const current = getSavedScenarios();
    const existingIndex = current.findIndex((item) => item.id === scenario.id);

    const scenarioToSave = {
      ...scenario,
      savedAt: new Date().toISOString(),
      createdAt: scenario.createdAt || new Date().toISOString(),
    };

    let updated;
    if (existingIndex >= 0) {
      // Update existing
      updated = [...current];
      updated[existingIndex] = scenarioToSave;
    } else {
      // Add new, check limit
      if (current.length >= MAX_HISTORY_ITEMS) {
        return {
          success: false,
          reason: `History limit reached (${MAX_HISTORY_ITEMS} items). Please remove some old scenarios first.`,
        };
      }
      updated = [scenarioToSave, ...current];
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  } catch (err) {
    console.error('Error saving scenario:', err);
    return { success: false, reason: 'Failed to write to local storage (quota may be exceeded).' };
  }
}

/**
 * Removes a scenario by ID.
 */
export function removeScenario(id) {
  if (!isLocalStorageAvailable()) return false;

  try {
    const current = getSavedScenarios();
    const updated = current.filter((item) => item.id !== id);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Error removing scenario:', err);
    return false;
  }
}

/**
 * Checks if a scenario is saved in localStorage.
 */
export function isScenarioSaved(id) {
  if (!isLocalStorageAvailable() || !id) return false;
  const current = getSavedScenarios();
  return current.some((item) => item.id === id);
}

/**
 * Clears all saved scenarios from localStorage.
 */
export function clearAllScenarios() {
  if (!isLocalStorageAvailable()) return false;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Error clearing scenarios:', err);
    return false;
  }
}
