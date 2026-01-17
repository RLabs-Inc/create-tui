/**
 * Project scaffolding logic
 */

import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { spawn } from 'bun'

interface ScaffoldOptions {
  projectName: string
  template: string
  skipInstall: boolean
}

export async function scaffold(options: ScaffoldOptions): Promise<void> {
  const { projectName, template, skipInstall } = options
  const targetDir = join(process.cwd(), projectName)

  console.log()
  console.log(`  Creating project: ${projectName}`)
  console.log(`  Template: ${template}`)
  console.log()

  // Check if directory exists
  if (existsSync(targetDir)) {
    const files = readdirSync(targetDir)
    if (files.length > 0) {
      throw new Error(`Directory "${projectName}" already exists and is not empty`)
    }
  } else {
    mkdirSync(targetDir, { recursive: true })
  }

  // Find templates directory
  const templatesDir = findTemplatesDir()
  const templateDir = join(templatesDir, template)

  if (!existsSync(templateDir)) {
    throw new Error(`Template "${template}" not found at ${templateDir}`)
  }

  // Copy template files
  console.log('  Copying template files...')
  copyDir(templateDir, targetDir, projectName)

  // Install dependencies
  if (!skipInstall) {
    console.log('  Installing dependencies...')
    await runCommand('bun', ['install'], targetDir)
  }

  // Done!
  console.log()
  console.log(`  Done! Your project is ready.`)
  console.log()
  console.log(`  Next steps:`)
  console.log(`    cd ${projectName}`)
  if (skipInstall) {
    console.log(`    bun install`)
  }
  console.log(`    bun run dev`)
  console.log()
}

function findTemplatesDir(): string {
  // Check relative to this file (for development)
  const devPath = join(dirname(import.meta.dir), 'templates')
  if (existsSync(devPath)) {
    return devPath
  }

  // Check relative to the package root (for published package)
  const pkgPath = join(dirname(dirname(import.meta.dir)), 'templates')
  if (existsSync(pkgPath)) {
    return pkgPath
  }

  throw new Error('Could not find templates directory')
}

function copyDir(src: string, dest: string, projectName: string): void {
  const entries = readdirSync(src)

  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)
    const stat = statSync(srcPath)

    if (stat.isDirectory()) {
      mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath, projectName)
    } else {
      let content = readFileSync(srcPath, 'utf-8')
      // Replace template placeholders
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName)
      writeFileSync(destPath, content)
    }
  }
}

async function runCommand(command: string, args: string[], cwd: string): Promise<void> {
  const proc = spawn({
    cmd: [command, ...args],
    cwd,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const exitCode = await proc.exited

  if (exitCode !== 0) {
    throw new Error(`Command "${command} ${args.join(' ')}" failed with exit code ${exitCode}`)
  }
}
