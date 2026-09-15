import { useEffect, useMemo, useState } from 'react'

import './app.css'

type Theme = 'light' | 'dark'

type ShellState = {
  current: string
  drawerOpen: boolean
  theme: Theme
  workspaceExpanded: boolean
}

const sections = Array.from({ length: 29 }, (_, index) => `Section ${String(index + 1).padStart(2, '0')}`)
const workspaceChildren = ['Overview', 'Activity']

function resolveInitialState(): ShellState {
  const query = new URLSearchParams(window.location.search)
  const requestedCurrent = query.get('current') ?? 'Overview'
  const permittedCurrent = [...workspaceChildren, ...sections].includes(requestedCurrent)

  return {
    current: permittedCurrent ? requestedCurrent : 'Overview',
    drawerOpen: query.get('drawer') !== 'hidden',
    theme: query.get('theme') === 'dark' ? 'dark' : 'light',
    workspaceExpanded: query.get('workspace') !== 'collapsed',
  }
}

function Icon({ name }: { name: 'drawer' | 'theme' | 'disclosure' | 'search' }) {
  return <span aria-hidden="true" className={`icon icon-${name}`} />
}

export function App() {
  const [shell, setShell] = useState(resolveInitialState)
  const [search, setSearch] = useState('')
  const lowerSearch = search.trim().toLowerCase()
  const visibleChildren = useMemo(
    () => workspaceChildren.filter((item) => item.toLowerCase().includes(lowerSearch)),
    [lowerSearch],
  )
  const visibleSections = useMemo(
    () => sections.filter((item) => item.toLowerCase().includes(lowerSearch)),
    [lowerSearch],
  )

  useEffect(() => {
    document.documentElement.dataset.referenceVisualTheme = shell.theme
  }, [shell.theme])

  const selectDestination = (current: string) => setShell((state) => ({ ...state, current }))
  const noMatches = visibleChildren.length === 0 && visibleSections.length === 0

  return (
    <div className="app-shell">
      <header className="app-header">
        <button
          aria-label={shell.drawerOpen ? 'Hide navigation' : 'Show navigation'}
          className="icon-button"
          onClick={() => setShell((state) => ({ ...state, drawerOpen: !state.drawerOpen }))}
          type="button"
        >
          <Icon name="drawer" />
        </button>
        <p className="app-name">Operations workspace</p>
        <button
          aria-label={shell.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          className="icon-button theme-button"
          onClick={() => setShell((state) => ({ ...state, theme: state.theme === 'light' ? 'dark' : 'light' }))}
          type="button"
        >
          <Icon name="theme" />
        </button>
      </header>

      <div className={`shell-body ${shell.drawerOpen ? 'with-drawer' : 'without-drawer'}`}>
        {shell.drawerOpen && (
          <aside aria-label="Navigation" className="drawer">
            <label className="search-field">
              <Icon name="search" />
              <span className="sr-only">Search navigation</span>
              <input
                aria-label="Search navigation"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Find an item"
                value={search}
              />
            </label>

            <nav className="navigation" aria-label="Workspace navigation">
              <div className="navigation-group">
                <div className="parent-row">
                  <span>Workspace</span>
                  <button
                    aria-expanded={shell.workspaceExpanded}
                    aria-label={shell.workspaceExpanded ? 'Collapse Workspace' : 'Expand Workspace'}
                    className="disclosure-button"
                    onClick={() => setShell((state) => ({ ...state, workspaceExpanded: !state.workspaceExpanded }))}
                    type="button"
                  >
                    <Icon name="disclosure" />
                  </button>
                </div>
                {shell.workspaceExpanded && visibleChildren.map((item) => (
                  <button
                    className={`navigation-row child-row ${shell.current === item ? 'selected' : ''}`}
                    key={item}
                    onClick={() => selectDestination(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
              {visibleSections.map((item) => (
                <button
                  className={`navigation-row ${shell.current === item ? 'selected' : ''}`}
                  key={item}
                  onClick={() => selectDestination(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
              {noMatches && <p className="empty-result">No matching navigation items.</p>}
            </nav>
          </aside>
        )}

        <main className="workspace" tabIndex={-1}>
          <div className="workspace-content">
            <p className="eyebrow">Current location</p>
            <h1>{shell.current}</h1>
            <h2>Neutral workspace content</h2>
            <p>This neutral workspace is a fixture for observing common-shell behavior.</p>
            <ol>
              {Array.from({ length: 80 }, (_, index) => <li key={index + 1}>Fixture item {index + 1}</li>)}
            </ol>
          </div>
        </main>
      </div>
    </div>
  )
}
