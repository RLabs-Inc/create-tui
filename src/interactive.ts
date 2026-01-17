/**
 * Interactive prompts for CLI
 *
 * v1: Simple readline-based prompts
 * Future: Full TUI interactive experience with box/text/keyboard
 */

import * as readline from 'readline'

const TEMPLATES = ['minimal', 'counter', 'dashboard'] as const
type Template = (typeof TEMPLATES)[number]

interface Options {
  projectName: string
  template: Template
  skipInstall: boolean
}

export async function runInteractive(
  existingName?: string,
  existingTemplate?: string
): Promise<Options> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const question = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer.trim())
      })
    })
  }

  console.log()
  console.log('  @rlabs-inc/create-tui')
  console.log('  Create TUI Framework applications')
  console.log()

  // Get project name
  let projectName = existingName
  if (!projectName) {
    projectName = await question('  Project name: ')
    if (!projectName) {
      projectName = 'my-tui-app'
    }
  }

  // Get template
  let template = existingTemplate as Template | undefined
  if (!template) {
    console.log()
    console.log('  Available templates:')
    console.log('    1. minimal   - Bare bones project structure')
    console.log('    2. counter   - Classic reactive counter example')
    console.log('    3. dashboard - Multi-component layout showcase')
    console.log()

    const choice = await question('  Select template (1-3) [1]: ')
    const index = parseInt(choice, 10) - 1

    if (index >= 0 && index < TEMPLATES.length) {
      template = TEMPLATES[index]
    } else {
      template = 'minimal'
    }
  }

  rl.close()

  return {
    projectName,
    template,
    skipInstall: false,
  }
}
