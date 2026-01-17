/**
 * Header Component
 *
 * Demonstrates a reusable component with theme integration.
 */

import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'

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
      // Left: App title
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

      // Right: Status
      box({
        flexDirection: 'row',
        gap: 1,
        children: () => {
          text({ content: 'Status:', fg: t.textDim })
          text({
            content: 'Ready',
            fg: t.success,
            attrs: Attr.BOLD,
          })
        },
      })
    },
  })
}
