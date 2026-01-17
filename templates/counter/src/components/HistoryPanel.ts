/**
 * History Panel Component
 *
 * Scrollable history log demonstrating auto-scroll detection.
 * When content exceeds the container height, TUI automatically
 * enables scrolling.
 *
 * Demonstrates:
 * - Auto-scroll when content overflows
 * - each() for dynamic list rendering
 * - show() for conditional empty state
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, each, show, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import { history } from '../state/counters'

export function HistoryPanel() {
  box({
    border: BorderStyle.SINGLE,
    borderColor: t.border,
    grow: 1,
    flexDirection: 'column',
    children: () => {
      // Header
      box({
        padding: 1,
        borderBottom: BorderStyle.SINGLE,
        borderColor: t.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({
            content: 'HISTORY',
            fg: t.textBright,
            attrs: Attr.BOLD,
          })
          text({
            content: derived(() => `${history.value.length} entries`),
            fg: t.textDim,
          })
        },
      })

      // Scrollable content area
      box({
        grow: 1,
        padding: 1,
        overflow: 'scroll', // Enable scrolling
        children: () => {
          // Empty state using show()
          show(
            () => history.value.length === 0,
            () => {
              return box({
                alignItems: 'center',
                padding: 2,
                children: () => {
                  text({ content: 'No history yet', fg: t.textDim })
                  text({
                    content: 'Actions will appear here',
                    fg: t.textDim,
                  })
                },
              })
            }
          )

          // History entries using each()
          each(
            () => history.value,
            (getEntry) => {
              const entry = getEntry()
              return box({
                flexDirection: 'row',
                gap: 1,
                children: () => {
                  text({
                    content: entry.timestamp,
                    fg: t.textDim,
                    width: 10,
                  })
                  text({
                    content: entry.message,
                    fg: t.text,
                  })
                },
              })
            },
            { key: (e) => String(e.id) }
          )
        },
      })
    },
  })
}
