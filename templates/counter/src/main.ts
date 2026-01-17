/**
 * {{PROJECT_NAME}} - Reactive Counter Showcase
 *
 * Demonstrates TUI Framework's key features:
 * - Fine-grained reactivity with signals
 * - Template primitives (each, show)
 * - Focus management
 * - Auto-scroll detection
 * - Theme switching
 */

import { mount, keyboard, focusManager } from '@rlabs-inc/tui'
import { App } from './App'
import { counters, resetAll, addHistoryEntry, cycleTheme } from './state/counters'

async function main() {
  const cleanup = await mount(
    () => App(),
    { mode: 'fullscreen', mouse: true }
  )

  // ==========================================================================
  // KEYBOARD HANDLERS
  // ==========================================================================

  // Counter controls (apply to focused counter)
  keyboard.onKey(['+', '='], () => {
    const idx = focusManager.focusedIndex
    if (idx >= 0 && idx < counters.value.length) {
      const counter = counters.value[idx]
      counter.value.value++
      addHistoryEntry(`Counter ${idx + 1}: +1 = ${counter.value.value}`)
    }
    return true
  })

  keyboard.onKey('-', () => {
    const idx = focusManager.focusedIndex
    if (idx >= 0 && idx < counters.value.length) {
      const counter = counters.value[idx]
      counter.value.value--
      addHistoryEntry(`Counter ${idx + 1}: -1 = ${counter.value.value}`)
    }
    return true
  })

  keyboard.onKey('r', () => {
    const idx = focusManager.focusedIndex
    if (idx >= 0 && idx < counters.value.length) {
      const counter = counters.value[idx]
      counter.value.value = 0
      addHistoryEntry(`Counter ${idx + 1}: reset to 0`)
    }
    return true
  })

  keyboard.onKey('R', () => {
    resetAll()
    addHistoryEntry('All counters reset')
    return true
  })

  // Theme cycling
  keyboard.onKey('t', () => {
    const themeName = cycleTheme()
    addHistoryEntry(`Theme: ${themeName}`)
    return true
  })

  // Focus navigation
  keyboard.onKey('Tab', () => {
    focusManager.focusNext()
    return true
  })

  keyboard.onKey('Shift+Tab', () => {
    focusManager.focusPrevious()
    return true
  })

  // Quit
  keyboard.onKey(['q', 'Q', 'Escape'], () => {
    cleanup()
  })
}

main().catch(console.error)
