/**
 * Header Component
 *
 * Top bar showing app title, status, uptime, and theme.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr, Colors } from '@rlabs-inc/tui'
import { serverStatus, uptimeFormatted, isPaused } from '../state/metrics'
import { currentThemeName } from '../state/theme'

export function Header() {
  box({
    height: 3,
    width: '100%',
    border: BorderStyle.SINGLE,
    borderColor: t.primary,
    paddingLeft: 1,
    paddingRight: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    children: () => {
      // Left: Title + version
      box({
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        children: () => {
          text({
            content: '{{PROJECT_NAME}}',
            fg: t.primary,
            attrs: Attr.BOLD,
          })
          text({ content: '|', fg: t.textDim })
          text({ content: 'v0.1.0', fg: t.textDim })
        },
      })

      // Center: Status
      box({
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        children: () => {
          // Server status
          box({
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: 'Status:', fg: t.textDim })
              text({
                content: serverStatus,
                fg: derived(() => {
                  switch (serverStatus.value) {
                    case 'online':
                      return t.success.value
                    case 'degraded':
                      return t.warning.value
                    case 'offline':
                      return t.error.value
                  }
                }),
                attrs: Attr.BOLD,
              })
            },
          })

          // Pause indicator
          box({
            visible: isPaused,
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: '[PAUSED]', fg: t.warning, attrs: Attr.BOLD })
            },
          })
        },
      })

      // Right: Uptime + Theme
      box({
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
        children: () => {
          box({
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: 'Uptime:', fg: t.textDim })
              text({ content: uptimeFormatted, fg: t.info })
            },
          })

          box({
            flexDirection: 'row',
            gap: 1,
            children: () => {
              text({ content: 'Theme:', fg: t.textDim })
              text({ content: currentThemeName, fg: t.accent })
            },
          })
        },
      })
    },
  })
}
