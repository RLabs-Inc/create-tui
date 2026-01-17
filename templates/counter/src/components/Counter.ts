/**
 * Counter Component
 *
 * Individual counter with focus support and variant styling.
 * Demonstrates:
 * - Focus management integration
 * - Variant-based theming
 * - Reactive value display
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, t, BorderStyle, Attr, getVariantStyle } from '@rlabs-inc/tui'
import type { Counter as CounterState } from '../state/counters'

interface CounterProps {
  counter: CounterState
  focused: boolean
}

export function Counter({ counter, focused }: CounterProps) {
  // Get variant colors
  const variantStyle = getVariantStyle(counter.variant)

  box({
    border: focused ? BorderStyle.DOUBLE : BorderStyle.SINGLE,
    borderColor: focused ? t.primary : t.border,
    padding: 1,
    bg: focused ? t.surface : undefined,
    children: () => {
      // Counter name with variant indicator
      box({
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({
            content: counter.name,
            fg: focused ? t.primary : t.text,
            attrs: focused ? Attr.BOLD : 0,
          })
          box({
            width: 2,
            height: 1,
            bg: variantStyle.bg,
          })
        },
      })

      // Value display - large and centered
      box({
        alignItems: 'center',
        padding: 1,
        children: () => {
          text({
            content: derived(() => {
              const val = counter.value.value
              return val >= 0 ? `+${val}` : `${val}`
            }),
            fg: derived(() =>
              counter.value.value >= 0 ? t.success.value : t.error.value
            ),
            attrs: Attr.BOLD,
          })
        },
      })

      // Focus indicator
      box({
        alignItems: 'center',
        children: () => {
          text({
            content: focused ? '[+/-] to change' : '',
            fg: t.textDim,
          })
        },
      })
    },
  })
}
