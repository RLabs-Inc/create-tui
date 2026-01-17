/**
 * Root Application Component
 *
 * Layout structure:
 * ┌─────────────────────────────────────────────┐
 * │                   HEADER                     │
 * ├──────────┬──────────────────────────────────┤
 * │          │         MAIN CONTENT              │
 * │ SIDEBAR  │  ┌─────────────┬────────────┐    │
 * │          │  │  METRICS    │  TRAFFIC   │    │
 * │          │  ├─────────────┴────────────┤    │
 * │          │  │         LOGS             │    │
 * │          │  └──────────────────────────┘    │
 * ├──────────┴──────────────────────────────────┤
 * │                   FOOTER                     │
 * └─────────────────────────────────────────────┘
 */

import { box } from '@rlabs-inc/tui'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { MetricsPanel } from './components/MetricsPanel'
import { TrafficPanel } from './components/TrafficPanel'
import { LogsPanel } from './components/LogsPanel'
import { Footer } from './components/Footer'

export function App() {
  box({
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    children: () => {
      // Header
      Header()

      // Main area: Sidebar + Content
      box({
        grow: 1,
        flexDirection: 'row',
        children: () => {
          // Sidebar
          Sidebar()

          // Main content
          box({
            grow: 1,
            flexDirection: 'column',
            padding: 1,
            gap: 1,
            children: () => {
              // Top row: Metrics + Traffic
              box({
                flexDirection: 'row',
                gap: 1,
                children: () => {
                  MetricsPanel()
                  TrafficPanel()
                },
              })

              // Bottom: Logs
              LogsPanel()
            },
          })
        },
      })

      // Footer
      Footer()
    },
  })
}
