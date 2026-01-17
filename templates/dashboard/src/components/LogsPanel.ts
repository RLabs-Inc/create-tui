/**
 * Logs Panel Component
 *
 * Scrollable activity log demonstrating auto-scroll.
 */

import { derived } from '@rlabs-inc/signals'
import { box, text, each, t, BorderStyle, Attr } from '@rlabs-inc/tui'
import { logs, LogEntry } from '../state/logs'

export function LogsPanel() {
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        children: () => {
          text({ content: 'ACTIVITY LOG', fg: t.textBright, attrs: Attr.BOLD })
          text({
            content: derived(() => `${logs.value.length} entries`),
            fg: t.textDim,
          })
        },
      })

      // Scrollable log content
      box({
        grow: 1,
        padding: 1,
        overflow: 'scroll', // Enable auto-scroll
        children: () => {
          each(
            () => logs.value,
            (getLog) => {
              const log = getLog()
              return LogLine({ entry: log })
            },
            { key: (e) => String(e.id) }
          )
        },
      })
    },
  })
}

interface LogLineProps {
  entry: LogEntry
}

function LogLine({ entry }: LogLineProps) {
  const levelColor = {
    info: t.info,
    warn: t.warning,
    error: t.error,
    success: t.success,
  }[entry.level]

  const levelIcon = {
    info: '\u2139',    // ℹ
    warn: '\u26A0',    // ⚠
    error: '\u2717',   // ✗
    success: '\u2713', // ✓
  }[entry.level]

  return box({
    flexDirection: 'row',
    gap: 1,
    children: () => {
      // Timestamp
      text({
        content: entry.timestamp,
        fg: t.textDim,
        width: 10,
      })

      // Level icon
      text({
        content: levelIcon,
        fg: levelColor,
        width: 2,
      })

      // Message
      text({
        content: entry.message,
        fg: t.text,
      })
    },
  })
}
