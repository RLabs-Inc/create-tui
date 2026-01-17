/**
 * Key Bindings Component
 *
 * Footer showing available keyboard shortcuts.
 */

import { box, text, t, BorderStyle } from '@rlabs-inc/tui'

export function KeyBindings() {
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
      // Navigation keys
      box({
        flexDirection: 'row',
        gap: 2,
        children: () => {
          KeyHint({ key: 'Tab', action: 'Focus' })
          KeyHint({ key: '+/-', action: 'Change' })
          KeyHint({ key: 'r', action: 'Reset' })
        },
      })

      // Action keys
      box({
        flexDirection: 'row',
        gap: 2,
        children: () => {
          KeyHint({ key: 'R', action: 'Reset All' })
          KeyHint({ key: 't', action: 'Theme' })
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
