/**
 * Footer Component
 *
 * Bottom bar with key bindings summary.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle } from '@rlabs-inc/tui'
import { cpuUsage, memoryUsage, requestsPerSec } from '../state/metrics'

export function Footer() {
  box({
    height: 3,
    width: '100%',
    border: BorderStyle.SINGLE,
    borderColor: t.border,
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    children: () => {
      // Left: Quick metrics
      box({
        flexDirection: 'row',
        gap: 3,
        children: () => {
          text({ content: '{{PROJECT_NAME}}', fg: t.textDim })
          text({ content: '|', fg: t.textDim })

          box({
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: 'CPU:', fg: t.textDim })
              text({
                content: derived(() => `${Math.round(cpuUsage.value)}%`),
                fg: derived(() =>
                  cpuUsage.value > 80 ? t.error.value : t.success.value
                ),
              })
            },
          })

          box({
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: 'MEM:', fg: t.textDim })
              text({
                content: derived(() => `${Math.round(memoryUsage.value)}%`),
                fg: derived(() =>
                  memoryUsage.value > 80 ? t.error.value : t.info.value
                ),
              })
            },
          })

          box({
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: 'REQ:', fg: t.textDim })
              text({
                content: derived(() => `${requestsPerSec.value}/s`),
                fg: t.info,
              })
            },
          })
        },
      })

      // Right: Key hints
      box({
        flexDirection: 'row',
        gap: 2,
        children: () => {
          KeyHint({ key: 't', action: 'Theme' })
          KeyHint({ key: 'r', action: 'Refresh' })
          KeyHint({ key: 'p', action: 'Pause' })
          KeyHint({ key: 'q', action: 'Quit' })
        },
      })
    },
  })
}

interface KeyHintProps {
  key: string
  action: string
}

function KeyHint({ key, action }: KeyHintProps) {
  box({
    flexDirection: 'row',
    gap: 1,
    children: () => {
      text({ content: `[${key}]`, fg: t.info })
      text({ content: action, fg: t.textDim })
    },
  })
}
