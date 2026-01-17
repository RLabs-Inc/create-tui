# {{PROJECT_NAME}}

A reactive counter showcase demonstrating TUI Framework's fine-grained reactivity.

## Features

- Multiple independent counters with different variants
- Theme switching between 12+ built-in themes
- Keyboard navigation and focus management
- Reactive derived state (totals, averages)
- Component composition patterns

## Getting Started

```bash
# Install dependencies
bun install

# Run the application
bun run dev
```

## Controls

| Key | Action |
|-----|--------|
| `Tab` | Focus next counter |
| `Shift+Tab` | Focus previous counter |
| `+` / `=` | Increment focused counter |
| `-` | Decrement focused counter |
| `r` | Reset focused counter |
| `R` | Reset all counters |
| `t` | Cycle through themes |
| `q` / `Escape` | Quit |

## Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── main.ts              # Entry point
│   ├── App.ts               # Root component with layout
│   ├── state/
│   │   └── counters.ts      # Counter state management
│   └── components/
│       ├── Counter.ts       # Individual counter component
│       ├── CounterPanel.ts  # Panel with multiple counters
│       ├── StatsPanel.ts    # Statistics display
│       ├── Header.ts        # App header
│       └── KeyBindings.ts   # Help panel
├── package.json
└── README.md
```

## Key Concepts Demonstrated

### Signals & Derived State

```typescript
const counter = signal(0)
const doubled = derived(() => counter.value * 2)
```

### Theme Variants

```typescript
box({
  variant: 'primary',  // Uses theme's primary color
  children: () => { ... }
})
```

### Focus Management

```typescript
import { focusManager } from '@rlabs-inc/tui'

// Register focusable component
input({ ... })  // Auto-registers

// Navigate focus
keyboard.onKey('Tab', () => focusManager.next())
```

## Learn More

- [TUI Framework](https://github.com/rlabs-inc/tui)
- [Signals Library](https://github.com/rlabs-inc/signals)
