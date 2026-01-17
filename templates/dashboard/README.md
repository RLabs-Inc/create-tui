# {{PROJECT_NAME}}

A comprehensive system dashboard demonstrating all TUI Framework features.

## Features

- **Multi-panel layout** with header, sidebar, main content, and footer
- **Real-time reactive updates** with simulated system metrics
- **Theme system** with 12+ built-in themes and live switching
- **Auto-scrolling logs** that track activity
- **Progress bars** and status indicators
- **Variant-based styling** for semantic colors
- **Keyboard navigation** and shortcuts
- **Component composition** patterns

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
| `1-4` | Switch between panels |
| `t` | Cycle through themes |
| `r` | Refresh metrics |
| `p` | Pause/Resume updates |
| `q` / `Escape` | Quit |

## Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── main.ts              # Entry point and keyboard handling
│   ├── App.ts               # Root layout component
│   ├── state/
│   │   ├── metrics.ts       # System metrics state
│   │   ├── theme.ts         # Theme management
│   │   └── logs.ts          # Activity log state
│   └── components/
│       ├── Header.ts        # Top bar with status
│       ├── Sidebar.ts       # Navigation + quick stats
│       ├── MetricsPanel.ts  # CPU, Memory, Disk meters
│       ├── TrafficPanel.ts  # Network and request stats
│       ├── ServicesPanel.ts # Service status indicators
│       ├── LogsPanel.ts     # Scrollable activity logs
│       └── Footer.ts        # Bottom bar with shortcuts
├── package.json
└── README.md
```

## Architecture Highlights

### Reactive State
All metrics use signals that automatically propagate changes:

```typescript
const cpuUsage = signal(45)
const cpuBar = derived(() => progressBar(cpuUsage.value, 20))
```

### Component Composition
Panels are composed from smaller, reusable components:

```typescript
function Sidebar() {
  box({ children: () => {
    QuickStats()
    Navigation()
  }})
}
```

### Theme Integration
Components use semantic theme colors for consistent styling:

```typescript
box({
  variant: 'primary',
  borderColor: t.primary,
  fg: t.text,
})
```

## Learn More

- [TUI Framework](https://github.com/rlabs-inc/tui)
- [Signals Library](https://github.com/rlabs-inc/signals)
