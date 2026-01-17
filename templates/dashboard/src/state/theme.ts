/**
 * Theme State Management
 */

import { signal, derived } from '@rlabs-inc/signals'
import { setTheme, themes } from '@rlabs-inc/tui'

const themeNames = Object.keys(themes)

export const currentThemeIndex = signal(0)
export const currentThemeName = derived(
  () => themeNames[currentThemeIndex.value]
)

export function cycleTheme(): string {
  currentThemeIndex.value = (currentThemeIndex.value + 1) % themeNames.length
  const themeName = themeNames[currentThemeIndex.value]
  setTheme(themeName as any)
  return themeName
}
