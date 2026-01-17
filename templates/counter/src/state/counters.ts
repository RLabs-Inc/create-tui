/**
 * Counter State Management
 *
 * Centralized state using signals with derived computations.
 */

import { signal, derived, type WritableSignal } from '@rlabs-inc/signals'
import { setTheme, themes } from '@rlabs-inc/tui'

// =============================================================================
// COUNTER STATE
// =============================================================================

export interface Counter {
  id: number
  name: string
  value: WritableSignal<number>
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'info'
}

let nextId = 1

function createCounter(
  name: string,
  variant: Counter['variant'],
  initial = 0
): Counter {
  return {
    id: nextId++,
    name,
    value: signal(initial),
    variant,
  }
}

// Initial counters with different variants
export const counters = signal<Counter[]>([
  createCounter('Alpha', 'primary', 0),
  createCounter('Beta', 'secondary', 10),
  createCounter('Gamma', 'success', 5),
  createCounter('Delta', 'warning', -3),
])

// =============================================================================
// DERIVED STATE
// =============================================================================

/** Total of all counter values */
export const total = derived(() =>
  counters.value.reduce((sum, c) => sum + c.value.value, 0)
)

/** Average of all counter values */
export const average = derived(() => {
  const list = counters.value
  if (list.length === 0) return 0
  return Math.round(total.value / list.length * 10) / 10
})

/** Minimum counter value */
export const min = derived(() => {
  const values = counters.value.map(c => c.value.value)
  return values.length > 0 ? Math.min(...values) : 0
})

/** Maximum counter value */
export const max = derived(() => {
  const values = counters.value.map(c => c.value.value)
  return values.length > 0 ? Math.max(...values) : 0
})

// =============================================================================
// HISTORY (demonstrates auto-scroll)
// =============================================================================

export interface HistoryEntry {
  id: number
  timestamp: string
  message: string
}

let historyId = 1
export const history = signal<HistoryEntry[]>([])

export function addHistoryEntry(message: string) {
  const entry: HistoryEntry = {
    id: historyId++,
    timestamp: new Date().toLocaleTimeString(),
    message,
  }
  // Keep last 50 entries
  history.value = [...history.value.slice(-49), entry]
}

// =============================================================================
// ACTIONS
// =============================================================================

export function resetAll() {
  counters.value.forEach(c => {
    c.value.value = 0
  })
}

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

const themeNames = Object.keys(themes)
export const currentThemeIndex = signal(0)
export const currentThemeName = derived(() => themeNames[currentThemeIndex.value])

export function cycleTheme(): string {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themeNames.length
  const themeName = themeNames[currentThemeIndex.value]
  setTheme(themeName as any)
  return themeName
}

// Initialize with first entry
addHistoryEntry('Application started')
