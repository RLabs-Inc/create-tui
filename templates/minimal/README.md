# {{PROJECT_NAME}}

A TUI Framework application with fine-grained reactivity.

## Getting Started

```bash
# Install dependencies
bun install

# Run in development
bun run dev

# Type check
bun run typecheck

# Build for production
bun run build
```

## Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── main.ts              # Application entry point
│   ├── App.ts               # Root application component
│   └── components/
│       └── Header.ts        # Example component
├── package.json
├── tsconfig.json
└── README.md
```

## Key Concepts

### Signals & Reactivity

TUI uses fine-grained reactivity via signals:

```typescript
import { signal, derived } from '@rlabs-inc/signals'

const count = signal(0)
const doubled = derived(() => count.value * 2)

// Update triggers automatic re-render
count.value++
```

### Components

Components are functions that create UI elements:

```typescript
import { box, text, t } from '@rlabs-inc/tui'

function MyComponent() {
  box({
    border: BorderStyle.SINGLE,
    borderColor: t.primary,
    padding: 1,
    children: () => {
      text({ content: 'Hello!', fg: t.text })
    },
  })
}
```

### Theme System

Access theme colors reactively with the `t` object:

```typescript
import { t, setTheme } from '@rlabs-inc/tui'

// Use theme colors
text({ content: 'Primary', fg: t.primary })
text({ content: 'Muted', fg: t.textMuted })

// Switch themes
setTheme('dracula')
setTheme('catppuccin')
```

### Keyboard Handling

```typescript
import { keyboard } from '@rlabs-inc/tui'

keyboard.onKey('q', () => cleanup())
keyboard.onKey(['ArrowUp', 'k'], () => moveUp())
```

## Learn More

- [TUI Framework Documentation](https://github.com/rlabs-inc/tui)
- [Signals Library](https://github.com/rlabs-inc/signals)
