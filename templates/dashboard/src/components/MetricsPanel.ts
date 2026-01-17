/**
 * Metrics Panel Component
 *
 * Displays detailed system metrics with progress bars.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import {
  cpuUsage,
  memoryUsage,
  diskUsage,
  progressBar,
} from '../state/metrics'

export function MetricsPanel() {
  box({
    grow: 1,
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
          text({ content: 'SYSTEM METRICS', fg: t.textBright, attrs: Attr.BOLD })
        },
      })

      // Content
      box({
        padding: 1,
        gap: 2,
        children: () => {
          // CPU Detail
          MetricDetail({
            label: 'CPU Usage',
            value: cpuUsage,
            unit: '%',
            thresholds: { warn: 60, crit: 80 },
            details: [
              { label: 'User', value: derived(() => Math.round(cpuUsage.value * 0.7)) },
              { label: 'System', value: derived(() => Math.round(cpuUsage.value * 0.3)) },
            ],
          })

          // Memory Detail
          MetricDetail({
            label: 'Memory',
            value: memoryUsage,
            unit: '%',
            thresholds: { warn: 60, crit: 80 },
            details: [
              { label: 'Used', value: derived(() => `${Math.round(memoryUsage.value * 0.16)}GB`) },
              { label: 'Total', value: derived(() => '16GB') },
            ],
          })

          // Disk Detail
          MetricDetail({
            label: 'Disk',
            value: diskUsage,
            unit: '%',
            thresholds: { warn: 75, crit: 90 },
            details: [
              { label: 'Used', value: derived(() => `${Math.round(diskUsage.value * 5)}GB`) },
              { label: 'Total', value: derived(() => '500GB') },
            ],
          })
        },
      })
    },
  })
}

interface MetricDetailProps {
  label: string
  value: { value: number }
  unit: string
  thresholds: { warn: number; crit: number }
  details: { label: string; value: { value: string | number } }[]
}

function MetricDetail({
  label,
  value,
  unit,
  thresholds,
  details,
}: MetricDetailProps) {
  const color = derived(() => {
    const v = value.value
    if (v >= thresholds.crit) return t.error.value
    if (v >= thresholds.warn) return t.warning.value
    return t.success.value
  })

  box({
    children: () => {
      // Label and value
      box({
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({ content: label, fg: t.text, attrs: Attr.BOLD })
          text({
            content: derived(() => `${Math.round(value.value)}${unit}`),
            fg: color,
            attrs: Attr.BOLD,
          })
        },
      })

      // Progress bar
      text({
        content: derived(() => progressBar(value.value, 30)),
        fg: color,
      })

      // Details row
      box({
        flexDirection: 'row',
        gap: 3,
        children: () => {
          details.forEach((detail) => {
            box({
              flexDirection: 'row',
              gap: 1,
              children: () => {
                text({ content: `${detail.label}:`, fg: t.textDim })
                text({
                  content: derived(() => String(detail.value.value)),
                  fg: t.textMuted,
                })
              },
            })
          })
        },
      })
    },
  })
}
