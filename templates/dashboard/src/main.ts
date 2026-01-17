/**
 * {{PROJECT_NAME}} - System Dashboard
 *
 * A comprehensive dashboard demonstrating all TUI Framework features:
 * - Multi-panel flexbox layouts
 * - Real-time reactive updates
 * - Theme switching
 * - Auto-scrolling logs
 * - Keyboard navigation
 */

import { mount, keyboard } from '@rlabs-inc/tui'
import { App } from './App'
import { cycleTheme } from './state/theme'
import { refreshMetrics, togglePause, isPaused } from './state/metrics'
import { addLog } from './state/logs'

async function main() {
  // Start metric simulation
  const metricsInterval = setInterval(() => {
    if (!isPaused.value) {
      refreshMetrics()
    }
  }, 1000)

  const cleanup = await mount(
    () => App(),
    { mode: 'fullscreen', mouse: true }
  )

  // Cleanup function
  const doCleanup = () => {
    clearInterval(metricsInterval)
    cleanup()
  }

  // ==========================================================================
  // KEYBOARD HANDLERS
  // ==========================================================================

  // Theme cycling
  keyboard.onKey('t', () => {
    const themeName = cycleTheme()
    addLog(`Theme changed to ${themeName}`)
    return true
  })

  // Manual refresh
  keyboard.onKey('r', () => {
    refreshMetrics()
    addLog('Metrics refreshed')
    return true
  })

  // Pause/Resume
  keyboard.onKey('p', () => {
    togglePause()
    addLog(isPaused.value ? 'Updates paused' : 'Updates resumed')
    return true
  })

  // Quit
  keyboard.onKey(['q', 'Q', 'Escape'], doCleanup)
}

main().catch(console.error)
