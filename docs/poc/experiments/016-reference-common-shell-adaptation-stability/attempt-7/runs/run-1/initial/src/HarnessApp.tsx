import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type NavigationRole = 'top-level' | 'parent' | 'child'

interface NavigationItem {
  id: string
  label: string
  role: NavigationRole
  children?: NavigationItem[]
}

interface ProductFixture {
  applicationName: string
  initial: {
    currentDestination: string
    workspaceExpanded: boolean
    drawer: 'open' | 'hidden'
    theme: Theme
  }
  navigation: NavigationItem[]
  search: {
    label: string
    placeholder: string
    emptyMessage: string
  }
  main: {
    heading: string
    description: string
    itemCount: number
  }
}

const supportedThemes = new Set<Theme>(['light', 'dark'])

function requestedTheme(): Theme {
  const requested = new URLSearchParams(window.location.search).get('theme')
  return requested !== null && supportedThemes.has(requested as Theme)
    ? (requested as Theme)
    : 'light'
}

function queryValue(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key)
}

function updateQuery(key: string, value: string) {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState(null, '', url)
}

function findDestination(fixture: ProductFixture, requested: string | null): string {
  if (requested === null) return fixture.initial.currentDestination

  const normalized = requested.trim().toLowerCase()
  const destinations = fixture.navigation.flatMap((item) =>
    item.role === 'parent' ? item.children ?? [] : [item],
  )
  return destinations.find(
    (item) => item.id.toLowerCase() === normalized || item.label.toLowerCase() === normalized,
  )?.id ?? fixture.initial.currentDestination
}

interface AssetIconProps {
  name:
    | 'drawer-hide'
    | 'drawer-show'
    | 'theme-to-dark'
    | 'theme-to-light'
    | 'disclosure-expanded'
    | 'disclosure-collapsed'
    | 'search'
  small?: boolean
}

function AssetIcon({ name, small = false }: AssetIconProps) {
  return <span className={`asset-icon icon-${name}${small ? ' asset-icon-small' : ''}`} aria-hidden="true" />
}

interface DestinationRowProps {
  item: NavigationItem
  child?: boolean
  currentDestination: string
  onActivate: (item: NavigationItem) => void
}

function DestinationRow({ item, child = false, currentDestination, onActivate }: DestinationRowProps) {
  const current = item.id === currentDestination
  return (
    <button
      className={`navigation-row${child ? ' navigation-row-child' : ''}`}
      type="button"
      data-navigation-id={item.id}
      data-current={current ? 'true' : 'false'}
      data-testid={`navigation-${item.id}`}
      aria-current={current ? 'page' : undefined}
      onClick={() => onActivate(item)}
    >
      <span data-testid={`navigation-${item.id}-label`}>{item.label}</span>
    </button>
  )
}

export function HarnessApp() {
  const [fixture, setFixture] = useState<ProductFixture | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [theme, setTheme] = useState<Theme>(requestedTheme)
  const [drawerOpen, setDrawerOpen] = useState(queryValue('drawer') !== 'hidden')
  const [workspaceExpanded, setWorkspaceExpanded] = useState(queryValue('workspace') !== 'collapsed')
  const [currentDestination, setCurrentDestination] = useState('overview')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.documentElement.dataset.harnessTheme = theme
  }, [theme])

  useEffect(() => {
    let active = true
    fetch('/fixture.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Fixture request failed: ${response.status}`)
        return response.json() as Promise<ProductFixture>
      })
      .then((loadedFixture) => {
        if (!active) return
        setFixture(loadedFixture)
        setCurrentDestination(findDestination(loadedFixture, queryValue('current')))
        if (queryValue('drawer') === null) setDrawerOpen(loadedFixture.initial.drawer === 'open')
        if (queryValue('workspace') === null) setWorkspaceExpanded(loadedFixture.initial.workspaceExpanded)
      })
      .catch((error: unknown) => {
        if (!active) return
        setLoadError(error instanceof Error ? error.message : 'Fixture request failed.')
      })

    return () => {
      active = false
    }
  }, [])

  const visibleNavigation = useMemo(() => {
    if (fixture === null) return []
    const normalizedSearch = search.trim().toLowerCase()

    return fixture.navigation.flatMap((item) => {
      if (item.role === 'top-level') {
        return normalizedSearch === '' || item.label.toLowerCase().includes(normalizedSearch)
          ? [{ item, children: [] as NavigationItem[] }]
          : []
      }

      const matchingChildren = (item.children ?? []).filter(
        (child) => normalizedSearch === '' || child.label.toLowerCase().includes(normalizedSearch),
      )
      const groupMatches =
        normalizedSearch === '' ||
        item.label.toLowerCase().includes(normalizedSearch) ||
        matchingChildren.length > 0

      return groupMatches ? [{ item, children: matchingChildren }] : []
    })
  }, [fixture, search])

  if (fixture === null) {
    return (
      <main
        className="loading-state"
        data-reference-visual-theme={theme}
        data-theme={theme}
        aria-live="polite"
      >
        {loadError ?? 'Loading workspace…'}
      </main>
    )
  }

  const toggleDrawer = () => {
    const nextOpen = !drawerOpen
    setDrawerOpen(nextOpen)
    updateQuery('drawer', nextOpen ? 'open' : 'hidden')
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    updateQuery('theme', nextTheme)
  }

  const toggleWorkspace = () => {
    const nextExpanded = !workspaceExpanded
    setWorkspaceExpanded(nextExpanded)
    updateQuery('workspace', nextExpanded ? 'expanded' : 'collapsed')
  }

  const activateDestination = (item: NavigationItem) => {
    setCurrentDestination(item.id)
    updateQuery('current', item.label)
  }

  const drawerAction = drawerOpen ? 'Close navigation' : 'Open navigation'
  const themeAction = theme === 'light' ? 'Switch to dark' : 'Switch to light'

  return (
    <div
      className={`shell${drawerOpen ? '' : ' shell-drawer-hidden'}`}
      data-reference-visual-theme={theme}
      data-theme={theme}
      data-testid="react-common-shell"
    >
      <header className="app-header">
        <button className="icon-button" type="button" aria-label={drawerAction} title={drawerAction} onClick={toggleDrawer}>
          <AssetIcon name={drawerOpen ? 'drawer-hide' : 'drawer-show'} />
        </button>
        <p className="workspace-name">{fixture.applicationName}</p>
        <button
          className="icon-button theme-control"
          type="button"
          aria-label={themeAction}
          title={themeAction}
          onClick={toggleTheme}
        >
          <AssetIcon name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'} />
        </button>
      </header>

      <div className="shell-body">
        {drawerOpen && (
          <aside className="drawer" aria-label="Application navigation">
            <div className="drawer-search">
              <label htmlFor="navigation-search">{fixture.search.label}</label>
              <div className="input-wrap">
                <AssetIcon name="search" small />
                <input
                  id="navigation-search"
                  type="search"
                  value={search}
                  placeholder={fixture.search.placeholder}
                  autoComplete="off"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </div>

            <nav className="navigation-list" aria-label="Workspace navigation">
              {visibleNavigation.length === 0 && <p className="no-matches">{fixture.search.emptyMessage}</p>}
              {visibleNavigation.map(({ item, children }) => {
                if (item.role === 'top-level') {
                  return (
                    <DestinationRow
                      key={item.id}
                      item={item}
                      currentDestination={currentDestination}
                      onActivate={activateDestination}
                    />
                  )
                }

                return (
                  <div className="navigation-group" key={item.id}>
                    <button
                      className="navigation-row navigation-group-row"
                      type="button"
                      data-navigation-id={item.id}
                      data-testid={`navigation-${item.id}`}
                      aria-expanded={workspaceExpanded}
                      onClick={toggleWorkspace}
                    >
                      <span>{item.label}</span>
                      <AssetIcon
                        name={workspaceExpanded ? 'disclosure-expanded' : 'disclosure-collapsed'}
                        small
                      />
                    </button>
                    {(workspaceExpanded || search.trim() !== '') &&
                      children.map((child) => (
                        <DestinationRow
                          key={child.id}
                          item={child}
                          child
                          currentDestination={currentDestination}
                          onActivate={activateDestination}
                        />
                      ))}
                  </div>
                )
              })}
            </nav>
          </aside>
        )}

        <main className="workspace" tabIndex={-1}>
          <section className="workspace-content" aria-labelledby="workspace-heading">
            <h1 id="workspace-heading">{fixture.main.heading}</h1>
            <p>{fixture.main.description}</p>
            <ol className="fixture-list" aria-label="Neutral overflow fixture">
              {Array.from({ length: fixture.main.itemCount }, (_, index) => (
                <li key={index}>{index + 1}</li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}
