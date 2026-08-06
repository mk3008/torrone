import { useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

const sections = Array.from({ length: 29 }, (_, index) => `Section ${String(index + 1).padStart(2, '0')}`)
const navigation = ['Overview', 'Activity', ...sections]

function queryState() {
  const parameters = new URLSearchParams(window.location.search)
  const requestedTheme = parameters.get('theme')
  const requestedDrawer = parameters.get('drawer')
  const requestedWorkspace = parameters.get('workspace')
  const requestedCurrent = parameters.get('current')

  return {
    theme: requestedTheme === 'dark' ? 'dark' as Theme : 'light' as Theme,
    drawerOpen: requestedDrawer !== 'hidden',
    workspaceExpanded: requestedWorkspace !== 'collapsed',
    current: requestedCurrent !== null && navigation.includes(requestedCurrent) ? requestedCurrent : 'Overview',
  }
}

export function HarnessApp() {
  const initial = queryState()
  const [theme, setTheme] = useState<Theme>(initial.theme)
  const [drawerOpen, setDrawerOpen] = useState(initial.drawerOpen)
  const [workspaceExpanded, setWorkspaceExpanded] = useState(initial.workspaceExpanded)
  const [current, setCurrent] = useState(initial.current)
  const [search, setSearch] = useState('')

  const visibleNavigation = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return normalizedSearch === '' ? navigation : navigation.filter((item) => item.toLocaleLowerCase().includes(normalizedSearch))
  }, [search])

  const isWorkspaceVisible = 'Workspace'.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
  const workspaceItems = visibleNavigation.filter((item) => item === 'Overview' || item === 'Activity')
  const sectionItems = visibleNavigation.filter((item) => item.startsWith('Section'))
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className="shell" data-reference-visual-theme={theme} data-testid="react-common-shell">
      <header className="shell-header">
        <div className="header-leading">
          <button
            className="icon-button"
            type="button"
            aria-label={drawerOpen ? 'Hide navigation' : 'Show navigation'}
            onClick={() => setDrawerOpen((open) => !open)}
          >
            <span className={`fixed-icon ${drawerOpen ? 'icon-drawer-hide' : 'icon-drawer-show'}`} aria-hidden="true" />
          </button>
          <span className="application-name">Operations workspace</span>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label={nextTheme === 'dark' ? 'Switch to dark theme' : 'Switch to light theme'}
          onClick={() => setTheme(nextTheme)}
        >
          <span className={`fixed-icon ${theme === 'light' ? 'icon-theme-dark' : 'icon-theme-light'}`} aria-hidden="true" />
        </button>
      </header>

      <div className={`shell-body ${drawerOpen ? 'drawer-open' : 'drawer-hidden'}`}>
        {drawerOpen && (
          <aside className="drawer" aria-label="Navigation">
            <label className="search-field">
              <span className="fixed-icon icon-search" aria-hidden="true" />
              <span className="visually-hidden">Search navigation</span>
              <input
                type="search"
                aria-label="Search navigation"
                placeholder="Find an item"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <nav className="navigation" aria-label="Workspace navigation">
              {isWorkspaceVisible && (
                <div className="navigation-group">
                  <button
                    className="parent-row"
                    type="button"
                    aria-expanded={workspaceExpanded}
                    onClick={() => setWorkspaceExpanded((expanded) => !expanded)}
                  >
                    <span>Workspace</span>
                    <span className={`fixed-icon ${workspaceExpanded ? 'icon-disclosure-expanded' : 'icon-disclosure-collapsed'}`} aria-hidden="true" />
                  </button>
                  {workspaceExpanded && workspaceItems.map((item) => (
                    <NavigationItem key={item} label={item} current={current} onSelect={setCurrent} nested />
                  ))}
                </div>
              )}
              {sectionItems.map((item) => (
                <NavigationItem key={item} label={item} current={current} onSelect={setCurrent} />
              ))}
              {visibleNavigation.length === 0 && <p className="empty-navigation">No matching navigation items.</p>}
            </nav>
          </aside>
        )}

        <main className="workspace" aria-labelledby="workspace-title">
          <div className="workspace-content">
            <p className="eyebrow">Current location · {current}</p>
            <h1 id="workspace-title">Neutral workspace content</h1>
            <p>This neutral operational surface is a fixture for the shared shell.</p>
            <ol className="fixture-list">
              {Array.from({ length: 80 }, (_, index) => <li key={index}>{index + 1}</li>)}
            </ol>
          </div>
        </main>
      </div>
    </div>
  )
}

function NavigationItem({ label, current, onSelect, nested = false }: {
  label: string
  current: string
  onSelect: (label: string) => void
  nested?: boolean
}) {
  const selected = label === current
  return (
    <button
      className={`navigation-row ${nested ? 'nested-row' : ''} ${selected ? 'selected-row' : ''}`}
      type="button"
      aria-current={selected ? 'page' : undefined}
      onClick={() => onSelect(label)}
    >
      {label}
    </button>
  )
}
