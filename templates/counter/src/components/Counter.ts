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
import { box, text, t, BorderStyle, Attr, getVariantStyle, reactiveProps } from '@rlabs-inc/tui'
import type { Counter as CounterState } from '../state/counters'
import type { PropInput } from '@rlabs-inc/tui'

interface CounterProps {
  counter: CounterState
  focused: PropInput<boolean>
}

export function Counter(rawProps: CounterProps) {
  // Complex objects with nested signals: use directly (don't wrap)
  const { counter } = rawProps

  // Simple PropInput props: wrap with reactiveProps for consistent .value access
  const { focused } = reactiveProps({ focused: rawProps.focused })

  // Get variant colors
  const variantStyle = getVariantStyle(counter.variant)

  box({
    // Use getters for reactive border/bg based on focus state
    border: () => focused.value ? BorderStyle.DOUBLE : BorderStyle.SINGLE,
    borderColor: () => focused.value ? t.primary.value : t.border.value,
    padding: 1,
    bg: () => focused.value ? t.surface.value : null,
    children: () => {
      // Counter name with variant indicator
      box({
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({
            content: counter.name,
            fg: () => focused.value ? t.primary.value : t.text.value,
            attrs: () => focused.value ? Attr.BOLD : 0,
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
            content: () => focused.value ? '[+/-] to change' : '',
            fg: t.textDim,
          })
        },
      })
    },
  })
}
