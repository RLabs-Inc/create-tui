/**
 * Counter Panel Component
 *
 * Displays all counters using the `each` template primitive.
 * Demonstrates:
 * - Reactive list rendering with each()
 * - Focus tracking per item
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, each, t, BorderStyle, Attr, focusManager } from '@rlabs-inc/tui'
import { counters } from '../state/counters'
import { Counter } from './Counter'

export function CounterPanel() {
  box({
    border: BorderStyle.SINGLE,
    borderColor: t.border,
    flexDirection: 'column',
    grow: 1,
    children: () => {
      // Panel header
      box({
        padding: 1,
        borderBottom: BorderStyle.SINGLE,
        borderColor: t.border,
        children: () => {
          text({
            content: 'COUNTERS',
            fg: t.textBright,
            attrs: Attr.BOLD,
          })
          text({
            content: 'Tab to navigate, +/- to change value',
            fg: t.textDim,
          })
        },
      })

      // Counter grid using each() primitive
      box({
        padding: 1,
        gap: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        children: () => {
          each(
            () => counters.value,
            (getCounter, key) => {
              const counter = getCounter()
              // Find index for focus tracking
              const counterIndex = counters.value.findIndex(c => String(c.id) === key)
              const isFocused = derived(
                () => focusManager.focusedIndex === counterIndex
              )

              return box({
                width: '48%',
                minWidth: 20,
                children: () => {
                  Counter({
                    counter,
                    focused: isFocused.value,
                  })
                },
              })
            },
            { key: (c) => String(c.id) }
          )
        },
      })
    },
  })
}
