/**
 * Traffic Panel Component
 *
 * Shows request and connection metrics.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import {
  requestsPerSec,
  activeConnections,
  errorRate,
  avgResponseTime,
} from '../state/metrics'

export function TrafficPanel() {
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
          text({ content: 'TRAFFIC', fg: t.textBright, attrs: Attr.BOLD })
        },
      })

      // Content
      box({
        padding: 1,
        gap: 1,
        children: () => {
          // Requests/sec
          StatRow({
            label: 'Requests/sec',
            value: derived(() => requestsPerSec.value.toLocaleString()),
            color: t.success,
          })

          // Active connections
          StatRow({
            label: 'Active Connections',
            value: derived(() => activeConnections.value.toString()),
            color: t.info,
          })

          // Error rate
          StatRow({
            label: 'Error Rate',
            value: derived(() => `${(errorRate.value * 100).toFixed(2)}%`),
            color: derived(() =>
              errorRate.value > 0.05 ? t.error.value : t.success.value
            ),
          })

          // Avg response time
          StatRow({
            label: 'Avg Response',
            value: derived(() => `${avgResponseTime.value}ms`),
            color: derived(() =>
              avgResponseTime.value > 200 ? t.warning.value : t.success.value
            ),
          })
        },
      })

      // Status indicators
      box({
        padding: 1,
        borderTop: BorderStyle.SINGLE,
        borderColor: t.border,
        gap: 1,
        children: () => {
          text({ content: 'Services', fg: t.info, attrs: Attr.BOLD })

          ServiceIndicator({ name: 'API Gateway', status: 'online' })
          ServiceIndicator({ name: 'Database', status: 'online' })
          ServiceIndicator({ name: 'Cache', status: 'degraded' })
          ServiceIndicator({ name: 'Queue', status: 'online' })
        },
      })
    },
  })
}

interface StatRowProps {
  label: string
  value: { value: string }
  color: { value: import('@rlabs-inc/tui').RGBA }
}

function StatRow({ label, value, color }: StatRowProps) {
  box({
    flexDirection: 'row',
    justifyContent: 'space-between',
    children: () => {
      text({ content: label, fg: t.textDim })
      text({
        content: value,
        fg: color,
        attrs: Attr.BOLD,
      })
    },
  })
}

interface ServiceIndicatorProps {
  name: string
  status: 'online' | 'degraded' | 'offline'
}

function ServiceIndicator({ name, status }: ServiceIndicatorProps) {
  const color =
    status === 'online' ? t.success : status === 'degraded' ? t.warning : t.error

  box({
    flexDirection: 'row',
    gap: 2,
    children: () => {
      text({ content: '\u25CF', fg: color })
      text({ content: name, fg: t.text })
    },
  })
}
