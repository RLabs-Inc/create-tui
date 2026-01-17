/**
 * Stats Panel Component
 *
 * Displays derived statistics computed from counter values.
 * Demonstrates reactive derived state.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import { total, average, min, max, counters } from '../state/counters'

export function StatsPanel() {
  box({
    border: BorderStyle.SINGLE,
    borderColor: t.border,
    children: () => {
      // Header
      box({
        padding: 1,
        borderBottom: BorderStyle.SINGLE,
        borderColor: t.border,
        children: () => {
          text({
            content: 'STATISTICS',
            fg: t.textBright,
            attrs: Attr.BOLD,
          })
        },
      })

      // Stats grid
      box({
        padding: 1,
        gap: 1,
        children: () => {
          // Row 1: Total and Average
          box({
            flexDirection: 'row',
            gap: 2,
            children: () => {
              StatItem({ label: 'Total', value: total, color: t.primary })
              StatItem({
                label: 'Average',
                value: derived(() => average.value.toFixed(1)),
                color: t.secondary,
              })
            },
          })

          // Row 2: Min and Max
          box({
            flexDirection: 'row',
            gap: 2,
            children: () => {
              StatItem({ label: 'Min', value: min, color: t.error })
              StatItem({ label: 'Max', value: max, color: t.success })
            },
          })

          // Row 3: Count
          box({
            flexDirection: 'row',
            gap: 2,
            children: () => {
              StatItem({
                label: 'Counters',
                value: derived(() => counters.value.length),
                color: t.info,
              })
            },
          })
        },
      })
    },
  })
}

interface StatItemProps {
  label: string
  value: { value: number | string } | (() => number | string)
  color: { value: import('@rlabs-inc/tui').RGBA }
}

function StatItem({ label, value, color }: StatItemProps) {
  box({
    flexDirection: 'row',
    gap: 1,
    width: '45%',
    children: () => {
      text({ content: `${label}:`, fg: t.textDim, width: 10 })
      text({
        content: derived(() => {
          const v = typeof value === 'function' ? value() : value.value
          return String(v)
        }),
        fg: color,
        attrs: Attr.BOLD,
      })
    },
  })
}
