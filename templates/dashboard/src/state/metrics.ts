/**
 * System Metrics State
 *
 * Simulated system metrics that update in real-time.
 * Demonstrates reactive derived state for computed values.
 */

import { signal, derived } from '@rlabs-inc/signals'

// =============================================================================
// PAUSE STATE
// =============================================================================

export const isPaused = signal(false)

export function togglePause() {
  isPaused.value = !isPaused.value
}

// =============================================================================
// RESOURCE METRICS
// =============================================================================

export const cpuUsage = signal(45)
export const memoryUsage = signal(62)
export const diskUsage = signal(78)

// Network
export const networkIn = signal(1.2)
export const networkOut = signal(0.8)

// =============================================================================
// TRAFFIC METRICS
// =============================================================================

export const requestsPerSec = signal(1250)
export const activeConnections = signal(342)
export const errorRate = signal(0.02)
export const avgResponseTime = signal(145)

// =============================================================================
// SYSTEM STATUS
// =============================================================================

export const uptime = signal(0)

export const serverStatus = signal<'online' | 'degraded' | 'offline'>('online')

// =============================================================================
// DERIVED VALUES
// =============================================================================

/** Formatted uptime display */
export const uptimeFormatted = derived(() => {
  const s = uptime.value
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

/** CPU progress bar */
export const cpuBar = derived(() => progressBar(cpuUsage.value, 20))

/** Memory progress bar */
export const memoryBar = derived(() => progressBar(memoryUsage.value, 20))

/** Disk progress bar */
export const diskBar = derived(() => progressBar(diskUsage.value, 20))

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function progressBar(value: number, width: number): string {
  const clamped = Math.max(0, Math.min(100, value))
  const filled = Math.round((clamped / 100) * width)
  const empty = width - filled
  return '\u2588'.repeat(filled) + '\u2591'.repeat(empty)
}

// =============================================================================
// REFRESH FUNCTION
// =============================================================================

export function refreshMetrics() {
  // Simulate metric changes
  cpuUsage.value = clamp(cpuUsage.value + randomDelta(10), 5, 95)
  memoryUsage.value = clamp(memoryUsage.value + randomDelta(5), 20, 90)
  diskUsage.value = clamp(diskUsage.value + randomDelta(2), 50, 95)

  networkIn.value = clamp(networkIn.value + randomDelta(0.5), 0.1, 5)
  networkOut.value = clamp(networkOut.value + randomDelta(0.3), 0.1, 3)

  requestsPerSec.value = clamp(
    requestsPerSec.value + Math.floor(randomDelta(200)),
    500,
    3000
  )
  activeConnections.value = clamp(
    activeConnections.value + Math.floor(randomDelta(50)),
    100,
    1000
  )
  errorRate.value = clamp(errorRate.value + randomDelta(0.01), 0, 0.1)
  avgResponseTime.value = clamp(
    avgResponseTime.value + Math.floor(randomDelta(20)),
    50,
    300
  )

  uptime.value++

  // Occasionally toggle status for demo
  if (Math.random() < 0.02) {
    serverStatus.value = 'degraded'
    setTimeout(() => {
      serverStatus.value = 'online'
    }, 3000)
  }
}

function randomDelta(range: number): number {
  return (Math.random() - 0.5) * range * 2
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
