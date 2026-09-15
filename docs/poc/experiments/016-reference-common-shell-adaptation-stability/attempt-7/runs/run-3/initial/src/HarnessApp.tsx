import { useEffect, useMemo, useState } from 'react'
import fixtureSource from './product-fixture.json?raw'

type Theme = 'light' | 'dark'
type DrawerState = 'open' | 'hidden'

type NavigationRole = 'top-level' | 'parent' | 'child'

type NavigationItem = {
  id: string
  label: string
  role: NavigationRole
  children?: NavigationItem[]
}

type ProductFixture = {
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

const fixture = JSON.parse(fixtureSource) as ProductFixture
const flatDestinations = fixture.navigation.flatMap((item) => [item, ...(item.children ?? [])])

function readInitialState() {
  const parameters = new URLSearchParams(window.location.search)
  const requestedTheme = parameters.get('theme')
  const requestedDrawer = parameters.get('drawer')
  const requestedWorkspace = parameters.get('workspace')
  const requestedCurrent = parameters.get('current')
  const matchedCurrent = flatDestinations.find(
    (item) => item.label.toLocaleLowerCase() === requestedCurrent?.toLocaleLowerCase(),
  )

  return {
    theme: requestedTheme === 'dark' ? 'dark' : fixture.initial.theme,
    drawer: requestedDrawer === 'hidden' ? 'hidden' : fixture.initial.drawer,
    workspaceExpanded:
      requestedWorkspace === 'collapsed'
        ? false
        : requestedWorkspace === 'expanded'
          ? true
          : fixture.initial.workspaceExpanded,
    currentDestination: matchedCurrent?.id ?? fixture.initial.currentDestination,
  } satisfies {
    theme: Theme
    drawer: DrawerState
    workspaceExpanded: boolean
    currentDestination: string
  }
}

function Icon({ name }: { name: string }) {
  return <span className={`fixed-icon fixed-icon--${name}`} aria-hidden="true" />
}

function NavigationDestination({
  item,
  child = false,
  currentDestination,
  onActivate,
}: {
  item: NavigationItem
  child?: boolean
  currentDestination: string
  onActivate: (id: string) => void
}) {
  const isCurrent = item.id === currentDestination

  return (
    <button
      className={`navigation-row${child ? ' navigation-row--child' : ''}`}
      type="button"
      aria-current={isCurrent ? 'page' : undefined}
      data-navigation-id={item.id}
      data-testid={`${item.id}-row`}
      onClick={() => onActivate(item.id)}
    >
      <span className="navigation-label">{item.label}</span>
    </button>
  )
}

export function HarnessApp() {
  const initialState = useMemo(readInitialState, [])
  const [theme, setTheme] = useState<Theme>(initialState.theme)
  const [drawer, setDrawer] = useState<DrawerState>(initialState.drawer)
  const [workspaceExpanded, setWorkspaceExpanded] = useState(initialState.workspaceExpanded)
  const [currentDestination, setCurrentDestination] = useState(initialState.currentDestination)
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const parent = fixture.navigation.find((item) => item.role === 'parent')
  const topLevelDestinations = fixture.navigation.filter((item) => item.role === 'top-level')
  const matchingTopLevel = topLevelDestinations.filter(
    (item) => normalizedQuery.length === 0 || item.label.toLocaleLowerCase().includes(normalizedQuery),
  )
  const parentMatches = parent?.label.toLocaleLowerCase().includes(normalizedQuery) ?? false
  const matchingChildren = (parent?.children ?? []).filter(
    (item) => normalizedQuery.length === 0 || item.label.toLocaleLowerCase().includes(normalizedQuery),
  )
  const showParent =
    parent !== undefined &&
    (normalizedQuery.length === 0 || parentMatches || matchingChildren.length > 0)
  const visibleChildren = parentMatches ? parent?.children ?? [] : matchingChildren
  const showChildren = showParent && (workspaceExpanded || normalizedQuery.length > 0)
  const hasVisibleRows = matchingTopLevel.length > 0 || showParent

  useEffect(() => {
    document.documentElement.dataset.harnessTheme = theme
    const parameters = new URLSearchParams(window.location.search)
    const current = flatDestinations.find((item) => item.id === currentDestination)
    parameters.set('theme', theme)
    parameters.set('drawer', drawer)
    parameters.set('workspace', workspaceExpanded ? 'expanded' : 'collapsed')
    if (current !== undefined) parameters.set('current', current.label)
    window.history.replaceState(null, '', `${window.location.pathname}?${parameters.toString()}`)
  }, [currentDestination, drawer, theme, workspaceExpanded])

  const drawerAction = drawer === 'open' ? 'Close navigation' : 'Open navigation'
  const themeAction = theme === 'light' ? 'Switch to dark palette' : 'Switch to light palette'

  return (
    <div
      className={`application-shell${drawer === 'hidden' ? ' application-shell--drawer-hidden' : ''}`}
      data-reference-visual-theme={theme}
      data-theme={theme}
      data-drawer-state={drawer}
    >
      <header className="application-header">
        <button
          className="icon-control"
          type="button"
          aria-label={drawerAction}
          title={drawerAction}
          onClick={() => setDrawer((current) => (current === 'open' ? 'hidden' : 'open'))}
        >
          <Icon name={drawer === 'open' ? 'drawer-open' : 'drawer-hidden'} />
        </button>
        <p className="application-identity">{fixture.applicationName}</p>
        <button
          className="icon-control theme-control"
          type="button"
          aria-label={themeAction}
          title={themeAction}
          onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
        >
          <Icon name={theme === 'light' ? 'theme-light' : 'theme-dark'} />
        </button>
      </header>

      <div className="shell-content">
        {drawer === 'open' && (
          <aside className="navigation-drawer" aria-label="Application navigation">
            <div className="navigation-search">
              <label htmlFor="navigation-search">{fixture.search.label}</label>
              <div className="navigation-search-control">
                <Icon name="search" />
                <input
                  id="navigation-search"
                  type="search"
                  autoComplete="off"
                  placeholder={fixture.search.placeholder}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>

            <nav className="navigation-list" aria-label="Workspace navigation">
              {matchingTopLevel
                .filter((item) => fixture.navigation.indexOf(item) < (parent === undefined ? 0 : fixture.navigation.indexOf(parent)))
                .map((item) => (
                  <NavigationDestination
                    key={item.id}
                    item={item}
                    currentDestination={currentDestination}
                    onActivate={setCurrentDestination}
                  />
                ))}

              {showParent && parent !== undefined && (
                <div className="navigation-group">
                  <button
                    className="navigation-row navigation-row--parent"
                    type="button"
                    aria-expanded={workspaceExpanded}
                    data-navigation-id={parent.id}
                    onClick={() => setWorkspaceExpanded((current) => !current)}
                  >
                    <span className="navigation-label">{parent.label}</span>
                    <Icon name={workspaceExpanded ? 'disclosure-expanded' : 'disclosure-collapsed'} />
                  </button>
                  {showChildren && (
                    <div className="navigation-children">
                      {visibleChildren.map((item) => (
                        <NavigationDestination
                          key={item.id}
                          item={item}
                          child
                          currentDestination={currentDestination}
                          onActivate={setCurrentDestination}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {matchingTopLevel
                .filter((item) => parent === undefined || fixture.navigation.indexOf(item) > fixture.navigation.indexOf(parent))
                .map((item) => (
                  <NavigationDestination
                    key={item.id}
                    item={item}
                    currentDestination={currentDestination}
                    onActivate={setCurrentDestination}
                  />
                ))}

              {!hasVisibleRows && <p className="navigation-empty">{fixture.search.emptyMessage}</p>}
            </nav>
          </aside>
        )}

        <main className="workspace" tabIndex={-1}>
          <section className="workspace-page" aria-labelledby="workspace-heading">
            <div className="workspace-introduction">
              <h1 id="workspace-heading">{fixture.main.heading}</h1>
              <p>{fixture.main.description}</p>
            </div>
            <ol className="fixture-list" aria-label="Neutral overflow fixture">
              {Array.from({ length: fixture.main.itemCount }, (_, index) => (
                <li key={index}>Fixture item {String(index + 1).padStart(2, '0')}</li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}
