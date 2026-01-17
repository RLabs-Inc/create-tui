/**
 * {{PROJECT_NAME}} - TUI Application
 *
 * Entry point for your TUI application.
 * Run with: bun run dev
 */

import { mount, keyboard } from '@rlabs-inc/tui'
import { App } from './App'

async function main() {
  // Mount the application in fullscreen mode
  const cleanup = await mount(
    () => App(),
    { mode: 'fullscreen', mouse: true }
  )

  // Global keyboard shortcuts
  keyboard.onKey(['q', 'Q', 'Escape'], () => {
    cleanup()
  })
}

main().catch(console.error)
