/**
 * Sidebar Component
 *
 * Quick stats and navigation.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import {
  cpuUsage,
  memoryUsage,
  diskUsage,
  cpuBar,
  memoryBar,
  diskBar,
  networkIn,
  networkOut,
} from '../state/metrics'

export function Sidebar() {
  box({
    width: 26,
    border: BorderStyle.SINGLE,
    borderColor: t.border,
    flexDirection: 'column',
    children: () => {
      // Header
      box({
        padding: 1,
        borderBottom: BorderStyle.SINGLE,
        borderColor: t.border,
        children: () => {
          text({ content: 'QUICK STATS', fg: t.textBright, attrs: Attr.BOLD })
        },
      })

      // Resources section
      box({
        padding: 1,
        gap: 1,
        borderBottom: BorderStyle.SINGLE,
        borderColor: t.border,
        children: () => {
          text({ content: 'Resources', fg: t.info, attrs: Attr.BOLD })

          // CPU
          ResourceMeter({
            label: 'CPU',
            value: cpuUsage,
            bar: cpuBar,
            thresholds: { warn: 60, crit: 80 },
          })

          // Memory
          ResourceMeter({
            label: 'Memory',
            value: memoryUsage,
            bar: memoryBar,
            thresholds: { warn: 60, crit: 80 },
          })

          // Disk
          ResourceMeter({
            label: 'Disk',
            value: diskUsage,
            bar: diskBar,
            thresholds: { warn: 75, crit: 90 },
          })
        },
      })

      // Network section
      box({
        padding: 1,
        gap: 1,
        borderBottom: BorderStyle.SINGLE,
        borderColor: t.border,
        children: () => {
          text({ content: 'Network I/O', fg: t.info, attrs: Attr.BOLD })

          box({
            flexDirection: 'row',
            justifyContent: 'space-between',
            children: () => {
              text({ content: 'In:', fg: t.textDim })
              text({
                content: derived(() => `${networkIn.value.toFixed(1)} MB/s`),
                fg: t.success,
              })
            },
          })

          box({
            flexDirection: 'row',
            justifyContent: 'space-between',
            children: () => {
              text({ content: 'Out:', fg: t.textDim })
              text({
                content: derived(() => `${networkOut.value.toFixed(1)} MB/s`),
                fg: t.warning,
              })
            },
          })
        },
      })

      // Navigation hint
      box({
        padding: 1,
        grow: 1,
        children: () => {
          text({ content: 'Shortcuts', fg: t.info, attrs: Attr.BOLD })
          text({ content: '' })
          text({ content: '[t] Theme', fg: t.textDim })
          text({ content: '[r] Refresh', fg: t.textDim })
          text({ content: '[p] Pause', fg: t.textDim })
          text({ content: '[q] Quit', fg: t.textDim })
        },
      })
    },
  })
}

interface ResourceMeterProps {
  label: string
  value: { value: number }
  bar: { value: string }
  thresholds: { warn: number; crit: number }
}

function ResourceMeter({ label, value, bar, thresholds }: ResourceMeterProps) {
  box({
    gap: 0,
    children: () => {
      box({
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({ content: label, fg: t.textDim })
          text({
            content: derived(() => `${Math.round(value.value)}%`),
            fg: derived(() => {
              const v = value.value
              if (v >= thresholds.crit) return t.error.value
              if (v >= thresholds.warn) return t.warning.value
              return t.success.value
            }),
          })
        },
      })
      text({
        content: bar,
        fg: derived(() => {
          const v = value.value
          if (v >= thresholds.crit) return t.error.value
          if (v >= thresholds.warn) return t.warning.value
          return t.success.value
        }),
      })
    },
  })
}
