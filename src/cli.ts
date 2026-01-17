/**
 * Command-line argument parser
 */

export interface ParsedArgs {
  projectName?: string
  template?: string
  skipInstall?: boolean
  help: boolean
  version: boolean
}

export function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = {
    help: false,
    version: false,
  }

  let i = 0
  while (i < args.length) {
    const arg = args[i]

    if (arg === '-h' || arg === '--help') {
      result.help = true
    } else if (arg === '-v' || arg === '--version') {
      result.version = true
    } else if (arg === '-t' || arg === '--template') {
      result.template = args[++i]
    } else if (arg === '--skip-install') {
      result.skipInstall = true
    } else if (!arg.startsWith('-') && !result.projectName) {
      result.projectName = arg
    }

    i++
  }

  return result
}
