# @rlabs-inc/create-tui

Scaffold professional TUI Framework applications with a single command.

## Quick Start

```bash
# Create a new project interactively
bunx @rlabs-inc/create-tui my-app

# Or use a specific template
bunx @rlabs-inc/create-tui my-app --template counter
```

## Templates

### minimal

A clean starting point with essential structure.

```
my-app/
├── src/
│   └── main.ts
├── package.json
└── tsconfig.json
```

**Features:**
- Basic fullscreen app with theme support
- Keyboard handling (quit with q/Escape)
- Ready for your components

### counter

Interactive counter showcase demonstrating reactive state management.

```
my-app/
├── src/
│   ├── main.ts
│   ├── App.ts
│   ├── components/
│   │   ├── Counter.ts
│   │   ├── CounterPanel.ts
│   │   ├── Header.ts
│   │   └── HistoryPanel.ts
│   └── state/
│       └── counters.ts
├── package.json
└── tsconfig.json
```

**Features:**
- Fine-grained reactivity with signals
- Template primitives (`each`, `show`)
- Focus management with Tab navigation
- Auto-scroll in history panel
- Theme switching (12+ themes)
- Variant styling

### dashboard

Full system monitor-style dashboard with multiple panels.

```
my-app/
├── src/
│   ├── main.ts
│   ├── App.ts
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Sidebar.ts
│   │   ├── MetricsPanel.ts
│   │   ├── TrafficPanel.ts
│   │   ├── LogsPanel.ts
│   │   └── Footer.ts
│   └── state/
│       ├── metrics.ts
│       ├── logs.ts
│       └── theme.ts
├── package.json
└── tsconfig.json
```

**Features:**
- Complex multi-panel layout
- Real-time metric simulation
- Activity logging with levels (info, warn, error, success)
- Auto-scrolling log panel
- Flexbox layout with grow/shrink
- Theme switching

## CLI Options

```
Usage: create-tui <project-name> [options]

Options:
  -t, --template <name>  Template to use (minimal, counter, dashboard)
  --skip-install         Skip running bun install
  -h, --help             Show help
  -v, --version          Show version
```

## After Scaffolding

```bash
cd my-app
bun run dev    # Start development
```

## Framework Features Showcased

| Feature | minimal | counter | dashboard |
|---------|---------|---------|-----------|
| Signals & Reactivity | ✓ | ✓ | ✓ |
| Theme System | ✓ | ✓ | ✓ |
| Keyboard Handling | ✓ | ✓ | ✓ |
| Focus Management | - | ✓ | ✓ |
| `each()` Primitive | - | ✓ | ✓ |
| `show()` Primitive | - | ✓ | - |
| Auto-scroll | - | ✓ | ✓ |
| Variant Styling | - | ✓ | ✓ |
| Multi-panel Layout | - | ✓ | ✓ |

## License

MIT
