import { useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type DrawerState = 'open' | 'hidden'
type WorkspaceState = 'expanded' | 'collapsed'

const navigationItems = [
  'Overview',
  'Activity',
  ...Array.from({ length: 29 }, (_, index) => `Section ${String(index + 1).padStart(2, '0')}`),
]

function queryValue<T extends string>(name: string, supported: readonly T[], fallback: T): T {
  const value = new URLSearchParams(window.location.search).get(name)
  return value !== null && supported.includes(value as T) ? (value as T) : fallback
}

function Icon({ name }: { name: string }) {
  return <span className={`icon icon-${name}`} aria-hidden="true" />
}

export function HarnessApp() {
  const [theme, setTheme] = useState<Theme>(() => queryValue('theme', ['light', 'dark'], 'light'))
  const [drawer, setDrawer] = useState<DrawerState>(() => queryValue('drawer', ['open', 'hidden'], 'open'))
  const [workspace, setWorkspace] = useState<WorkspaceState>(() => queryValue('workspace', ['expanded', 'collapsed'], 'expanded'))
  const [current, setCurrent] = useState(() => new URLSearchParams(window.location.search).get('current') || 'Overview')
  const [search, setSearch] = useState('')

  const visibleItems = useMemo(
    () => navigationItems.filter((item) => item.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())),
    [search],
  )
  const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
  const isDrawerOpen = drawer === 'open'
  const isExpanded = workspace === 'expanded'

  document.documentElement.dataset.harnessTheme = theme

  return (
    <div className="shell" data-reference-visual-theme={theme} data-testid="react-common-shell">
      <header className="app-header">
        <button
          className="icon-button"
          type="button"
          aria-label={isDrawerOpen ? 'Hide navigation' : 'Show navigation'}
          onClick={() => setDrawer(isDrawerOpen ? 'hidden' : 'open')}
        >
          <Icon name={isDrawerOpen ? 'drawer-hide' : 'drawer-show'} />
        </button>
        <p className="app-name">Operations workspace</p>
        <button
          className="icon-button theme-button"
          type="button"
          aria-label={nextTheme === 'dark' ? 'Switch to dark' : 'Switch to light'}
          onClick={() => setTheme(nextTheme)}
        >
          <Icon name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'} />
        </button>
      </header>

      <div className={`app-frame ${isDrawerOpen ? 'with-drawer' : 'without-drawer'}`}>
        {isDrawerOpen && (
          <aside className="drawer" aria-label="Workspace navigation">
            <label className="search-field">
              <span className="search-icon"><Icon name="search" /></span>
              <span className="sr-only">Search navigation</span>
              <input
                aria-label="Search navigation"
                placeholder="Find an item"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <nav className="drawer-nav" aria-label="Workspace">
              <div className="nav-parent">
                <span>Workspace</span>
                <button
                  className="disclosure-button"
                  type="button"
                  aria-label={isExpanded ? 'Collapse Workspace' : 'Expand Workspace'}
                  aria-expanded={isExpanded}
                  onClick={() => setWorkspace(isExpanded ? 'collapsed' : 'expanded')}
                >
                  <Icon name={isExpanded ? 'disclosure-expanded' : 'disclosure-collapsed'} />
                </button>
              </div>
              {isExpanded && (
                <div className="nav-items">
                  {visibleItems.map((item) => (
                    <button
                      className={`nav-item ${item === current ? 'is-current' : ''}`}
                      type="button"
                      key={item}
                      aria-current={item === current ? 'page' : undefined}
                      onClick={() => setCurrent(item)}
                    >
                      {item}
                    </button>
                  ))}
                  {visibleItems.length === 0 && <p className="empty-results">No matching navigation items.</p>}
                </div>
              )}
            </nav>
          </aside>
        )}

        <main className="workspace">
          <div className="workspace-content">
            <p className="eyebrow">CURRENT LOCATION · {current}</p>
            <h1>Neutral workspace content</h1>
            <p className="fixture-intro">This is a neutral fixture for inspecting the shared operations workspace shell.</p>
            <ol className="fixture-list">
              {Array.from({ length: 80 }, (_, index) => <li key={index}>Fixture item {index + 1}</li>)}
            </ol>
          </div>
        </main>
      </div>
    </div>
  )
}
