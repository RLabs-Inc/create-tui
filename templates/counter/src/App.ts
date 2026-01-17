/**
 * Root Application Component
 *
 * Layout structure:
 * - Header (app title + theme indicator)
 * - Main area:
 *   - Left: Counter panel with focusable counters
 *   - Right: Stats panel + scrollable history
 * - Footer (key bindings)
 */

import { box, text, t, BorderStyle } from '@rlabs-inc/tui'
import { Header } from './components/Header'
import { CounterPanel } from './components/CounterPanel'
import { StatsPanel } from './components/StatsPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { KeyBindings } from './components/KeyBindings'

export function App() {
  box({
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    children: () => {
      // Header
      Header()

      // Main content area
      box({
        grow: 1,
        flexDirection: 'row',
        padding: 1,
        gap: 1,
        children: () => {
          // Left panel: Counters
          box({
            width: '50%',
            flexDirection: 'column',
            gap: 1,
            children: () => {
              CounterPanel()
            },
          })

          // Right panel: Stats + History
          box({
            grow: 1,
            flexDirection: 'column',
            gap: 1,
            children: () => {
              // Statistics
              StatsPanel()

              // History with auto-scroll
              HistoryPanel()
            },
          })
        },
      })

      // Footer: Key bindings
      KeyBindings()
    },
  })
}
