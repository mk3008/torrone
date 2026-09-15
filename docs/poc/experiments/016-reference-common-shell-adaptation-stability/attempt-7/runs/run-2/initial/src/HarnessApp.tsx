import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

type Destination = {
  id: string
  label: string
  role: 'top-level' | 'child'
}

type NavigationParent = {
  id: string
  label: string
  role: 'parent'
  children: Destination[]
}

type NavigationItem = Destination | NavigationParent

type ProductFixture = {
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

const params = new URLSearchParams(window.location.search)

function requestedTheme(): Theme {
  return params.get('theme') === 'dark' ? 'dark' : 'light'
}

function requestedDrawerOpen(): boolean {
  return params.get('drawer') !== 'hidden'
}

function requestedWorkspaceExpanded(): boolean {
  return params.get('workspace') !== 'collapsed'
}

function FixedIcon({ name }: { name: string }) {
  return <span className={`fixed-icon icon-${name}`} aria-hidden="true" />
}

export function HarnessApp() {
  const [fixture, setFixture] = useState<ProductFixture | null>(null)
  const [loadError, setLoadError] = useState('')
  const [theme, setTheme] = useState<Theme>(requestedTheme)
  const [drawerOpen, setDrawerOpen] = useState(requestedDrawerOpen)
  const [workspaceExpanded, setWorkspaceExpanded] = useState(requestedWorkspaceExpanded)
  const [currentDestination, setCurrentDestination] = useState('overview')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadFixture() {
      try {
        const response = await fetch('./product-fixture.json', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Product fixture request failed (${response.status}).`)
        }

        const loadedFixture = (await response.json()) as ProductFixture
        const requestedCurrent = params.get('current')
        const destinations = loadedFixture.navigation.flatMap((item) =>
          item.role === 'parent' ? item.children : [item],
        )
        const matchedDestination = destinations.find(
          (item) => item.label.toLowerCase() === requestedCurrent?.toLowerCase(),
        )

        setFixture(loadedFixture)
        setCurrentDestination(matchedDestination?.id ?? loadedFixture.initial.currentDestination)
      } catch (error) {
        if (!controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : 'Product fixture could not be loaded.')
        }
      }
    }

    void loadFixture()
    return () => controller.abort()
  }, [])

  const visibleNavigation = useMemo(() => {
    if (fixture === null) return []

    const normalizedQuery = query.trim().toLowerCase()
    if (normalizedQuery.length === 0) return fixture.navigation

    return fixture.navigation.flatMap<NavigationItem>((item) => {
      if (item.role !== 'parent') {
        return item.label.toLowerCase().includes(normalizedQuery) ? [item] : []
      }

      const parentMatches = item.label.toLowerCase().includes(normalizedQuery)
      const matchingChildren = item.children.filter((child) =>
        child.label.toLowerCase().includes(normalizedQuery),
      )
      if (!parentMatches && matchingChildren.length === 0) return []

      return [{ ...item, children: parentMatches ? item.children : matchingChildren }]
    })
  }, [fixture, query])

  if (fixture === null) {
    return (
      <main className="loading-state">
        <p>{loadError || 'Loading operations workspace…'}</p>
      </main>
    )
  }

  const hasVisibleRows = visibleNavigation.length > 0
  const nextDrawerAction = drawerOpen ? 'Close navigation' : 'Open navigation'
  const nextThemeAction = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'

  function renderDestination(item: Destination, isChild = false) {
    const isCurrent = item.id === currentDestination
    return (
      <button
        className={`nav-row nav-destination${isChild ? ' nav-child' : ''}`}
        type="button"
        data-destination={item.id}
        data-testid={`${item.id}-row`}
        aria-current={isCurrent ? 'page' : undefined}
        onClick={() => setCurrentDestination(item.id)}
        key={item.id}
      >
        <span>{item.label}</span>
      </button>
    )
  }

  return (
    <div
      className="app-shell"
      data-reference-visual-theme={theme}
      data-theme={theme}
      data-drawer={drawerOpen ? 'open' : 'hidden'}
      data-workspace={workspaceExpanded ? 'expanded' : 'collapsed'}
      data-current-destination={currentDestination}
    >
      <header className="shell-header">
        <button
          className="icon-button"
          type="button"
          aria-label={nextDrawerAction}
          title={nextDrawerAction}
          onClick={() => setDrawerOpen((isOpen) => !isOpen)}
        >
          <FixedIcon name={drawerOpen ? 'drawer-hide' : 'drawer-show'} />
        </button>

        <p className="workspace-identity">{fixture.applicationName}</p>

        <button
          className="icon-button theme-button"
          type="button"
          aria-label={nextThemeAction}
          title={nextThemeAction}
          onClick={() => setTheme((activeTheme) => (activeTheme === 'light' ? 'dark' : 'light'))}
        >
          <FixedIcon name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'} />
        </button>
      </header>

      <div className={`shell-body${drawerOpen ? '' : ' drawer-is-hidden'}`}>
        {drawerOpen && (
          <aside className="drawer" aria-label="Application navigation">
            <div className="drawer-search">
              <label htmlFor="navigation-search">{fixture.search.label}</label>
              <div className="search-field-wrap">
                <FixedIcon name="search" />
                <input
                  id="navigation-search"
                  type="search"
                  value={query}
                  placeholder={fixture.search.placeholder}
                  autoComplete="off"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>

            <nav className="navigation-list" aria-label="Operations navigation">
              {hasVisibleRows ? (
                visibleNavigation.map((item) => {
                  if (item.role !== 'parent') return renderDestination(item)

                  const childrenVisible = workspaceExpanded || query.trim().length > 0
                  return (
                    <div className="navigation-group" key={item.id}>
                      <button
                        className="nav-row nav-disclosure"
                        type="button"
                        aria-expanded={workspaceExpanded}
                        aria-controls={`${item.id}-children`}
                        onClick={() => setWorkspaceExpanded((isExpanded) => !isExpanded)}
                      >
                        <span>{item.label}</span>
                        <FixedIcon
                          name={workspaceExpanded ? 'disclosure-expanded' : 'disclosure-collapsed'}
                        />
                      </button>
                      {childrenVisible && (
                        <div id={`${item.id}-children`}>
                          {item.children.map((child) => renderDestination(child, true))}
                        </div>
                      )}
                    </div>
                  )
                })
              ) : (
                <p className="no-matches" role="status">
                  {fixture.search.emptyMessage}
                </p>
              )}
            </nav>
          </aside>
        )}

        <main className="workspace" tabIndex={-1}>
          <section className="workspace-content" aria-labelledby="workspace-heading">
            <header className="page-heading">
              <h1 id="workspace-heading">{fixture.main.heading}</h1>
              <p>{fixture.main.description}</p>
            </header>

            <ol className="fixture-list" aria-label="Neutral overflow fixture">
              {Array.from({ length: fixture.main.itemCount }, (_, index) => (
                <li key={index}>
                  {index + 1}
                </li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}
