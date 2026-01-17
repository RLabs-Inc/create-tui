/**
 * Activity Logs State
 *
 * Maintains a scrollable log of system events.
 */

import { signal } from '@rlabs-inc/signals'

export interface LogEntry {
  id: number
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'success'
  message: string
}

let logId = 1

export const logs = signal<LogEntry[]>([
  createLog('info', 'Dashboard initialized'),
  createLog('success', 'All systems operational'),
])

export function addLog(
  message: string,
  level: LogEntry['level'] = 'info'
): void {
  const entry = createLog(level, message)
  logs.value = [...logs.value.slice(-99), entry]
}

function createLog(level: LogEntry['level'], message: string): LogEntry {
  return {
    id: logId++,
    timestamp: new Date().toLocaleTimeString(),
    level,
    message,
  }
}

// Simulate some initial activity
setTimeout(() => addLog('Metrics collection started'), 500)
setTimeout(() => addLog('Connection pool ready', 'success'), 1000)
