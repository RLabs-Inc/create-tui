/**
 * Header Component
 *
 * Shows app title and current theme.
 */

import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import { currentThemeName } from '../state/counters'

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
      // Left: Title
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
          text({ content: 'Reactive Counter Showcase', fg: t.textMuted })
        },
      })

      // Right: Theme indicator
      box({
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        children: () => {
          text({ content: 'Theme:', fg: t.textDim })
          text({
            content: currentThemeName,
            fg: t.accent,
            attrs: Attr.BOLD,
          })
          text({ content: '[t]', fg: t.textDim })
        },
      })
    },
  })
}
