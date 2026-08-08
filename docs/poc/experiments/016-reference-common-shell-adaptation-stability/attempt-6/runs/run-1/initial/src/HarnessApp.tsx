import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type DrawerState = 'open' | 'hidden'
type WorkspaceState = 'expanded' | 'collapsed'

type Destination = {
  id: string
  label: string
  role: 'top-level' | 'child'
}

type ParentNavigationItem = {
  id: string
  label: string
  role: 'parent'
  children: Destination[]
}

type NavigationItem = Destination | ParentNavigationItem

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

const iconClassNames = {
  'drawer-hide': 'fixed-icon--drawer-hide',
  'drawer-show': 'fixed-icon--drawer-show',
  'theme-to-dark': 'fixed-icon--theme-to-dark',
  'theme-to-light': 'fixed-icon--theme-to-light',
  'disclosure-expanded': 'fixed-icon--disclosure-expanded',
  'disclosure-collapsed': 'fixed-icon--disclosure-collapsed',
  search: 'fixed-icon--search',
} as const

type IconName = keyof typeof iconClassNames

function FixedIcon({ name }: { name: IconName }) {
  return (
    <span
      aria-hidden="true"
      className={`fixed-icon ${iconClassNames[name]}`}
    />
  )
}

function resolveTheme(parameters: URLSearchParams, fixture: ProductFixture): Theme {
  const requested = parameters.get('theme')
  return requested === 'light' || requested === 'dark'
    ? requested
    : fixture.initial.theme
}

function resolveDrawer(
  parameters: URLSearchParams,
  fixture: ProductFixture,
): DrawerState {
  const requested = parameters.get('drawer')
  return requested === 'open' || requested === 'hidden'
    ? requested
    : fixture.initial.drawer
}

function resolveWorkspace(
  parameters: URLSearchParams,
  fixture: ProductFixture,
): WorkspaceState {
  const requested = parameters.get('workspace')
  if (requested === 'expanded' || requested === 'collapsed') {
    return requested
  }
  return fixture.initial.workspaceExpanded ? 'expanded' : 'collapsed'
}

function destinationsFrom(fixture: ProductFixture): Destination[] {
  return fixture.navigation.flatMap((item) =>
    item.role === 'parent' ? item.children : [item],
  )
}

function resolveCurrent(
  parameters: URLSearchParams,
  fixture: ProductFixture,
): string {
  const requested = parameters.get('current')
  if (requested === null) {
    return fixture.initial.currentDestination
  }

  const normalized = requested.trim().toLocaleLowerCase()
  const match = destinationsFrom(fixture).find(
    (item) =>
      item.id.toLocaleLowerCase() === normalized ||
      item.label.toLocaleLowerCase() === normalized,
  )
  return match?.id ?? fixture.initial.currentDestination
}

function CommonShell({ fixture }: { fixture: ProductFixture }) {
  const parameters = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  )
  const [theme, setTheme] = useState<Theme>(() =>
    resolveTheme(parameters, fixture),
  )
  const [drawer, setDrawer] = useState<DrawerState>(() =>
    resolveDrawer(parameters, fixture),
  )
  const [workspace, setWorkspace] = useState<WorkspaceState>(() =>
    resolveWorkspace(parameters, fixture),
  )
  const [currentDestination, setCurrentDestination] = useState(() =>
    resolveCurrent(parameters, fixture),
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.documentElement.dataset.harnessTheme = theme
    document.title = `${fixture.applicationName} — React common shell`
  }, [fixture.applicationName, theme])

  const normalizedSearch = search.trim().toLocaleLowerCase()
  const matchesSearch = (label: string) =>
    normalizedSearch.length === 0 ||
    label.toLocaleLowerCase().includes(normalizedSearch)

  const visibleNavigation = fixture.navigation.filter((item) => {
    if (matchesSearch(item.label)) {
      return true
    }
    return item.role === 'parent'
      ? item.children.some((child) => matchesSearch(child.label))
      : false
  })

  const renderDestination = (item: Destination, child = false) => {
    if (!matchesSearch(item.label)) {
      return null
    }
    const isCurrent = item.id === currentDestination
    return (
      <li key={item.id}>
        <button
          aria-current={isCurrent ? 'page' : undefined}
          className={`navigation-button${child ? ' navigation-button--child' : ''}${isCurrent ? ' is-current' : ''}`}
          onClick={() => setCurrentDestination(item.id)}
          type="button"
        >
          <span>{item.label}</span>
        </button>
      </li>
    )
  }

  return (
    <div
      className="app-shell"
      data-current={currentDestination}
      data-drawer={drawer}
      data-reference-visual-theme={theme}
      data-theme={theme}
      data-workspace={workspace}
    >
      <header className="app-header">
        <button
          aria-label={drawer === 'open' ? 'Hide navigation' : 'Show navigation'}
          className="icon-button"
          onClick={() => setDrawer(drawer === 'open' ? 'hidden' : 'open')}
          title={drawer === 'open' ? 'Hide navigation' : 'Show navigation'}
          type="button"
        >
          <FixedIcon name={drawer === 'open' ? 'drawer-hide' : 'drawer-show'} />
        </button>

        <div className="application-identity">
          <span className="application-context">Common shell</span>
          <strong>{fixture.applicationName}</strong>
        </div>

        <button
          aria-label={
            theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
          }
          className="icon-button"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title={
            theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
          }
          type="button"
        >
          <FixedIcon
            name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'}
          />
        </button>
      </header>

      <div
        className={`shell-body${drawer === 'hidden' ? ' shell-body--drawer-hidden' : ''}`}
      >
        {drawer === 'open' ? (
          <aside className="navigation-drawer" aria-label="Application navigation">
            <div className="navigation-search">
              <label className="visually-hidden" htmlFor="navigation-search">
                {fixture.search.label}
              </label>
              <FixedIcon name="search" />
              <input
                autoComplete="off"
                id="navigation-search"
                onChange={(event) => setSearch(event.target.value)}
                placeholder={fixture.search.placeholder}
                type="search"
                value={search}
              />
            </div>

            <nav aria-label="Workspace destinations">
              {visibleNavigation.length === 0 ? (
                <p className="navigation-empty" role="status">
                  {fixture.search.emptyMessage}
                </p>
              ) : (
                <ul className="navigation-list">
                  {visibleNavigation.map((item) => {
                    if (item.role !== 'parent') {
                      return renderDestination(item)
                    }

                    const matchingChildren = item.children.filter((child) =>
                      matchesSearch(child.label),
                    )
                    const parentMatches = matchesSearch(item.label)
                    const visibleChildren = parentMatches
                      ? item.children
                      : matchingChildren

                    return (
                      <li className="navigation-parent" key={item.id}>
                        <button
                          aria-controls="workspace-children"
                          aria-expanded={workspace === 'expanded'}
                          className="navigation-button navigation-button--parent"
                          onClick={() =>
                            setWorkspace(
                              workspace === 'expanded' ? 'collapsed' : 'expanded',
                            )
                          }
                          type="button"
                        >
                          <span>{item.label}</span>
                          <FixedIcon
                            name={
                              workspace === 'expanded'
                                ? 'disclosure-expanded'
                                : 'disclosure-collapsed'
                            }
                          />
                        </button>
                        {workspace === 'expanded' ? (
                          <ul className="navigation-children" id="workspace-children">
                            {visibleChildren.map((child) =>
                              renderDestination(child, true),
                            )}
                          </ul>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              )}
            </nav>
          </aside>
        ) : null}

        <main className="workspace" id="main-workspace">
          <div className="workspace-introduction">
            <span className="workspace-eyebrow">Selected destination</span>
            <strong>
              {destinationsFrom(fixture).find(
                (item) => item.id === currentDestination,
              )?.label ?? fixture.navigation[0]?.label}
            </strong>
          </div>
          <h1>{fixture.main.heading}</h1>
          <p className="workspace-description">{fixture.main.description}</p>
          <ol className="fixture-list">
            {Array.from({ length: fixture.main.itemCount }, (_, index) => (
              <li key={index + 1}>Neutral fixture item {index + 1}</li>
            ))}
          </ol>
        </main>
      </div>
    </div>
  )
}

export function HarnessApp() {
  const [fixture, setFixture] = useState<ProductFixture | null>(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadFixture() {
      try {
        const response = await fetch('/product-fixture.json')
        if (!response.ok) {
          throw new Error(`Fixture request failed with ${response.status}.`)
        }
        const loadedFixture = (await response.json()) as ProductFixture
        if (active) {
          setFixture(loadedFixture)
        }
      } catch {
        if (active) {
          setLoadError(true)
        }
      }
    }

    void loadFixture()
    return () => {
      active = false
    }
  }, [])

  if (loadError) {
    return <p role="alert">The product fixture could not be loaded.</p>
  }
  if (fixture === null) {
    return <p className="fixture-loading">Loading product fixture…</p>
  }

  return <CommonShell fixture={fixture} />
}
