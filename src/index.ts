#!/usr/bin/env bun
/**
 * @rlabs-inc/create-tui
 * Create TUI Framework applications with professional project structure
 */

import { parseArgs } from './cli'
import { scaffold } from './scaffold'
import { runInteractive } from './interactive'

const TEMPLATES = ['minimal', 'counter', 'dashboard'] as const
type Template = (typeof TEMPLATES)[number]

interface Options {
  projectName: string
  template: Template
  skipInstall: boolean
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  // Show help
  if (args.help) {
    printHelp()
    process.exit(0)
  }

  // Show version
  if (args.version) {
    console.log('0.2.0')
    process.exit(0)
  }

  let options: Options

  // If project name provided but no template, or neither provided, go interactive
  if (!args.projectName || !args.template) {
    options = await runInteractive(args.projectName, args.template)
  } else {
    // Validate template
    if (!TEMPLATES.includes(args.template as Template)) {
      console.error(`\nError: Unknown template "${args.template}"`)
      console.error(`Available templates: ${TEMPLATES.join(', ')}\n`)
      process.exit(1)
    }

    options = {
      projectName: args.projectName,
      template: args.template as Template,
      skipInstall: args.skipInstall ?? false,
    }
  }

  // Scaffold the project
  await scaffold(options)
}

function printHelp() {
  console.log(`
  @rlabs-inc/create-tui

  Create TUI Framework applications with professional project structure.

  Usage:
    bunx @rlabs-inc/create-tui [project-name] [options]

  Options:
    -t, --template <name>  Template to use (minimal, counter, dashboard)
    --skip-install         Skip dependency installation
    -h, --help             Show this help message
    -v, --version          Show version number

  Examples:
    bunx @rlabs-inc/create-tui my-app
    bunx @rlabs-inc/create-tui my-app --template counter
    bunx @rlabs-inc/create-tui my-app -t dashboard --skip-install

  Templates:
    minimal     Bare bones project structure
    counter     Classic reactive counter example
    dashboard   Multi-component layout showcase
`)
}

main().catch((err) => {
  console.error('\nError:', err.message)
  process.exit(1)
})
