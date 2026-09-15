import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type DrawerState = 'open' | 'hidden'

type NavigationItem = {
  id: string
  label: string
  role: 'top-level' | 'parent' | 'child'
  children?: NavigationItem[]
}

type Fixture = {
  applicationName: string
  initial: {
    currentDestination: string
    workspaceExpanded: boolean
    drawer: DrawerState
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

type IconName =
  | 'drawer-hide'
  | 'drawer-show'
  | 'theme-to-dark'
  | 'theme-to-light'
  | 'disclosure-expanded'
  | 'disclosure-collapsed'
  | 'search'

function FixedIcon({ name, size }: { name: IconName; size?: 'small' | 'regular' }) {
  return (
    <span
      aria-hidden="true"
      className={`fixed-icon fixed-icon--${size ?? 'regular'} icon-${name}`}
    />
  )
}

function requestedTheme(params: URLSearchParams, fallback: Theme): Theme {
  const theme = params.get('theme')
  return theme === 'dark' || theme === 'light' ? theme : fallback
}

function requestedDrawer(params: URLSearchParams, fallback: DrawerState): DrawerState {
  const drawer = params.get('drawer')
  return drawer === 'open' || drawer === 'hidden' ? drawer : fallback
}

function requestedExpansion(params: URLSearchParams, fallback: boolean): boolean {
  const workspace = params.get('workspace')
  if (workspace === 'expanded') return true
  if (workspace === 'collapsed') return false
  return fallback
}

function destinations(items: NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) =>
    item.role === 'parent' ? item.children ?? [] : [item],
  )
}

function requestedDestination(
  params: URLSearchParams,
  items: NavigationItem[],
  fallback: string,
): string {
  const requested = params.get('current')?.trim().toLocaleLowerCase()
  if (!requested) return fallback

  const match = destinations(items).find(
    (item) => item.id.toLocaleLowerCase() === requested || item.label.toLocaleLowerCase() === requested,
  )
  return match?.id ?? fallback
}

function NavigationButton({
  item,
  currentId,
  onSelect,
}: {
  item: NavigationItem
  currentId: string
  onSelect: (id: string) => void
}) {
  const selected = item.id === currentId
  return (
    <button
      type="button"
      className={`navigation-button navigation-button--${item.role}${selected ? ' is-selected' : ''}`}
      aria-current={selected ? 'page' : undefined}
      data-testid={`destination-${item.id}`}
      onClick={() => onSelect(item.id)}
    >
      <span>{item.label}</span>
    </button>
  )
}

function WorkspaceShell({ fixture }: { fixture: Fixture }) {
  const params = useMemo(() => new URLSearchParams(window.location.search), [])
  const [theme, setTheme] = useState<Theme>(() => requestedTheme(params, fixture.initial.theme))
  const [drawer, setDrawer] = useState<DrawerState>(() => requestedDrawer(params, fixture.initial.drawer))
  const [workspaceExpanded, setWorkspaceExpanded] = useState(() =>
    requestedExpansion(params, fixture.initial.workspaceExpanded),
  )
  const [currentId, setCurrentId] = useState(() =>
    requestedDestination(params, fixture.navigation, fixture.initial.currentDestination),
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.documentElement.dataset.harnessTheme = theme
  }, [theme])

  const normalizedSearch = search.trim().toLocaleLowerCase()
  const matches = (label: string) =>
    normalizedSearch.length === 0 || label.toLocaleLowerCase().includes(normalizedSearch)

  const workspace = fixture.navigation.find((item) => item.role === 'parent')
  const workspaceChildren = workspace?.children ?? []
  const workspaceLabelMatches = workspace ? matches(workspace.label) : false
  const matchingWorkspaceChildren = workspaceChildren.filter((item) => matches(item.label))
  const visibleWorkspaceChildren = workspaceLabelMatches
    ? workspaceChildren
    : matchingWorkspaceChildren
  const searchRevealsWorkspaceChildren =
    normalizedSearch.length > 0 && matchingWorkspaceChildren.length > 0
  const workspaceDisplayedExpanded = workspaceExpanded || searchRevealsWorkspaceChildren
  const workspaceVisible = Boolean(
    workspace && (workspaceLabelMatches || visibleWorkspaceChildren.length > 0),
  )
  const visibleTopLevelCount = fixture.navigation.filter(
    (item) => item.role === 'top-level' && matches(item.label),
  ).length
  const hasMatches = visibleTopLevelCount > 0 || workspaceVisible
  const current = destinations(fixture.navigation).find((item) => item.id === currentId)
  const drawerOpen = drawer === 'open'

  return (
    <div
      className="application-shell"
      data-reference-visual-theme={theme}
      data-testid="application-shell"
    >
      <header className="application-header">
        <button
          type="button"
          className="icon-control drawer-control"
          aria-label={drawerOpen ? 'Hide navigation' : 'Show navigation'}
          title={drawerOpen ? 'Hide navigation' : 'Show navigation'}
          data-testid="drawer-toggle"
          onClick={() => setDrawer(drawerOpen ? 'hidden' : 'open')}
        >
          <FixedIcon name={drawerOpen ? 'drawer-hide' : 'drawer-show'} />
        </button>

        <div className="brand-lockup">
          <span className="brand-name">{fixture.applicationName}</span>
        </div>

        <button
          type="button"
          className="icon-control theme-control"
          aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          data-testid="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <FixedIcon name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'} />
        </button>
      </header>

      <div className={`shell-body${drawerOpen ? '' : ' shell-body--drawer-hidden'}`}>
        {drawerOpen ? (
          <aside className="navigation-drawer" aria-label="Application navigation">
            <div className="drawer-intro">
              <p className="drawer-kicker">Navigation</p>
            </div>

            <label className="search-label" htmlFor="navigation-search">
              {fixture.search.label}
            </label>
            <div className="search-field">
              <FixedIcon name="search" size="small" />
              <input
                id="navigation-search"
                type="search"
                value={search}
                placeholder={fixture.search.placeholder}
                autoComplete="off"
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <nav className="primary-navigation" aria-label="Primary navigation">
              {fixture.navigation.map((item) => {
                if (item.role === 'top-level') {
                  return matches(item.label) ? (
                    <NavigationButton
                      key={item.id}
                      item={item}
                      currentId={currentId}
                      onSelect={setCurrentId}
                    />
                  ) : null
                }

                if (item.role !== 'parent' || !workspaceVisible) return null

                return (
                  <div className="navigation-group" key={item.id}>
                    <button
                      type="button"
                      className="navigation-button navigation-button--parent"
                      aria-expanded={workspaceDisplayedExpanded}
                      aria-label={
                        searchRevealsWorkspaceChildren
                          ? `${item.label}, expanded to show matching search results`
                          : undefined
                      }
                      aria-controls="workspace-destinations"
                      disabled={searchRevealsWorkspaceChildren}
                      data-testid="workspace-toggle"
                      onClick={() => setWorkspaceExpanded((expanded) => !expanded)}
                    >
                      <span>{item.label}</span>
                      <FixedIcon
                        name={
                          workspaceDisplayedExpanded
                            ? 'disclosure-expanded'
                            : 'disclosure-collapsed'
                        }
                        size="small"
                      />
                    </button>
                    {workspaceDisplayedExpanded ? (
                      <div id="workspace-destinations" className="navigation-children">
                        {visibleWorkspaceChildren.map((child) => (
                          <NavigationButton
                            key={child.id}
                            item={child}
                            currentId={currentId}
                            onSelect={setCurrentId}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              })}
              {!hasMatches ? (
                <p className="empty-navigation" role="status">
                  {fixture.search.emptyMessage}
                </p>
              ) : null}
            </nav>
          </aside>
        ) : null}

        <main className="workspace" tabIndex={-1}>
          <section className="workspace-hero" aria-labelledby="workspace-heading">
            <div>
              <p className="workspace-kicker">Current destination</p>
              <p className="current-destination" aria-live="polite">
                {current?.label ?? 'Overview'}
              </p>
            </div>
            <div className="workspace-heading-block">
              <h2 id="workspace-heading">{fixture.main.heading}</h2>
              <p>{fixture.main.description}</p>
            </div>
          </section>

          <div className="fixture-section">
            <ol className="fixture-grid">
              {Array.from({ length: fixture.main.itemCount }, (_, index) => (
                <li key={index}>
                  <span className="fixture-number">{String(index + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ol>
          </div>
        </main>
      </div>

      <p className="visually-hidden" aria-live="polite">
        Navigation is {drawer}. Theme is {theme}. Workspace is{' '}
        {workspaceDisplayedExpanded ? 'expanded' : 'collapsed'}.
      </p>
    </div>
  )
}

export function App() {
  const [fixture, setFixture] = useState<Fixture | null>(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    async function loadFixture() {
      try {
        const response = await fetch('/product-fixture.json', { signal: controller.signal })
        if (!response.ok) throw new Error(`Fixture request failed (${response.status}).`)
        setFixture((await response.json()) as Fixture)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadError(error instanceof Error ? error.message : 'Fixture request failed.')
      }
    }
    void loadFixture()
    return () => controller.abort()
  }, [])

  if (loadError) {
    return (
      <main className="load-state" data-reference-visual-theme="light">
        <h1>Operations workspace</h1>
        <p role="alert">{loadError}</p>
      </main>
    )
  }

  if (!fixture) {
    return (
      <main className="load-state" data-reference-visual-theme="light">
        <p>Loading workspace…</p>
      </main>
    )
  }

  return <WorkspaceShell fixture={fixture} />
}
