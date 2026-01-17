/**
 * Root Application Component
 *
 * This is the main component that structures your application.
 * It demonstrates the basic layout patterns with TUI.
 */

import { signal, derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import { Header } from './components/Header'

// =============================================================================
// APPLICATION STATE
// =============================================================================

const currentTime = signal(new Date().toLocaleTimeString())

// Update time every second
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString()
}, 1000)

// =============================================================================
// ROOT COMPONENT
// =============================================================================

export function App() {
  box({
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    children: () => {
      // Header
      Header()

      // Main Content
      box({
        grow: 1,
        padding: 2,
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        children: () => {
          // Welcome message
          box({
            border: BorderStyle.DOUBLE,
            borderColor: t.primary,
            padding: 2,
            gap: 1,
            alignItems: 'center',
            children: () => {
              text({
                content: 'Welcome to TUI!',
                fg: t.primary,
                attrs: Attr.BOLD,
              })
              text({
                content: 'Fine-grained reactivity for the terminal',
                fg: t.textMuted,
              })
            },
          })

          // Current time (reactive)
          box({
            border: BorderStyle.ROUNDED,
            borderColor: t.border,
            padding: 1,
            gap: 1,
            children: () => {
              box({
                flexDirection: 'row',
                gap: 2,
                children: () => {
                  text({ content: 'Current Time:', fg: t.textDim })
                  text({
                    content: currentTime,
                    fg: t.info,
                    attrs: Attr.BOLD,
                  })
                },
              })
            },
          })

          // Help text
          text({
            content: 'Press [q] or [Escape] to quit',
            fg: t.textDim,
          })
        },
      })

      // Footer
      box({
        height: 1,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({ content: '{{PROJECT_NAME}}', fg: t.textDim })
          text({ content: 'Built with TUI Framework', fg: t.textDim })
        },
      })
    },
  })
}
