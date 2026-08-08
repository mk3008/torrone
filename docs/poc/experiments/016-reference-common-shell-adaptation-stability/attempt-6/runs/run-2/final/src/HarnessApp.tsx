import { useEffect, useMemo, useState } from 'react'
import fixtureSource from '../fixture.json?raw'

type Theme = 'light' | 'dark'
type DrawerState = 'open' | 'hidden'
type NavigationRole = 'top-level' | 'parent' | 'child'

interface NavigationChild {
  id: string
  label: string
  role: Extract<NavigationRole, 'child'>
}

interface NavigationItem {
  id: string
  label: string
  role: Exclude<NavigationRole, 'child'>
  children?: NavigationChild[]
}

interface ProductFixture {
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
const selectableDestinations = fixture.navigation.reduce<Array<{ id: string; label: string }>>(
  (destinations, item) => {
    if (item.role === 'parent') {
      destinations.push(
        ...(item.children ?? []).map(({ id, label }) => ({ id, label })),
      )
    } else {
      destinations.push({ id: item.id, label: item.label })
    }
    return destinations
  },
  [],
)

function queryValue<T extends string>(
  params: URLSearchParams,
  name: string,
  supported: readonly T[],
  fallback: T,
): T {
  const value = params.get(name)
  return value !== null && supported.includes(value as T) ? (value as T) : fallback
}

function initialDestination(params: URLSearchParams): string {
  const requested = params.get('current')?.trim().toLocaleLowerCase()
  if (requested === undefined || requested.length === 0) {
    return fixture.initial.currentDestination
  }

  return (
    selectableDestinations.find(
      (item) =>
        item.id.toLocaleLowerCase() === requested ||
        item.label.toLocaleLowerCase() === requested,
    )?.id ?? fixture.initial.currentDestination
  )
}

function Icon({ name }: { name: string }) {
  return <span className={`fixed-icon icon-${name}`} aria-hidden="true" />
}

export function HarnessApp() {
  const params = useMemo(() => new URLSearchParams(window.location.search), [])
  const [theme, setTheme] = useState<Theme>(() =>
    queryValue(params, 'theme', ['light', 'dark'], fixture.initial.theme),
  )
  const [drawer, setDrawer] = useState<DrawerState>(() =>
    queryValue(params, 'drawer', ['open', 'hidden'], fixture.initial.drawer),
  )
  const [workspaceExpanded, setWorkspaceExpanded] = useState(() =>
    queryValue(
      params,
      'workspace',
      ['expanded', 'collapsed'],
      fixture.initial.workspaceExpanded ? 'expanded' : 'collapsed',
    ) === 'expanded',
  )
  const [currentDestination, setCurrentDestination] = useState(() =>
    initialDestination(params),
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.documentElement.dataset.harnessTheme = theme
  }, [theme])

  const normalizedSearch = searchQuery.trim().toLocaleLowerCase()
  const matchesSearch = (label: string) =>
    normalizedSearch.length === 0 || label.toLocaleLowerCase().includes(normalizedSearch)
  const currentLabel =
    selectableDestinations.find((item) => item.id === currentDestination)?.label ??
    currentDestination
  const hasNavigationMatch = fixture.navigation.some((item) => {
    if (matchesSearch(item.label)) {
      return true
    }
    return item.children?.some((child) => matchesSearch(child.label)) ?? false
  })
  const drawerVisible = drawer === 'open'
  const drawerActionLabel = drawerVisible ? 'Hide navigation' : 'Show navigation'
  const themeActionLabel =
    theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'

  return (
    <div
      className="application-shell"
      data-reference-visual-theme={theme}
      data-theme={theme}
    >
      <header className="application-header">
        <button
          className="header-control"
          type="button"
          aria-controls="primary-navigation-drawer"
          aria-expanded={drawerVisible}
          aria-label={drawerActionLabel}
          title={drawerActionLabel}
          onClick={() => setDrawer(drawerVisible ? 'hidden' : 'open')}
        >
          <Icon name={drawerVisible ? 'drawer-hide' : 'drawer-show'} />
        </button>
        <strong className="application-name">{fixture.applicationName}</strong>
        <button
          className="header-control theme-control"
          type="button"
          aria-label={themeActionLabel}
          title={themeActionLabel}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Icon name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'} />
        </button>
      </header>

      <div className={`shell-body ${drawerVisible ? 'drawer-open' : 'drawer-hidden'}`}>
        <aside
          id="primary-navigation-drawer"
          className="navigation-drawer"
          aria-label="Application navigation"
          hidden={!drawerVisible}
        >
          <label className="navigation-search">
            <span className="search-icon"><Icon name="search" /></span>
            <span className="visually-hidden">{fixture.search.label}</span>
            <input
              type="search"
              aria-label={fixture.search.label}
              placeholder={fixture.search.placeholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          <nav aria-label="Primary navigation">
            <ul className="navigation-list">
              {fixture.navigation.map((item) => {
                const childMatches = item.children?.filter((child) => matchesSearch(child.label)) ?? []
                const itemMatches = matchesSearch(item.label)
                const showItem = itemMatches || childMatches.length > 0
                const exposeCollapsedSearchMatches =
                  !workspaceExpanded &&
                  normalizedSearch.length > 0 &&
                  childMatches.length > 0

                if (!showItem) {
                  return null
                }

                if (item.role === 'top-level') {
                  const selected = currentDestination === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`navigation-row top-level-row ${selected ? 'selected' : ''}`}
                        aria-current={selected ? 'page' : undefined}
                        onClick={() => setCurrentDestination(item.id)}
                      >
                        <span>{item.label}</span>
                      </button>
                    </li>
                  )
                }

                const visibleChildren = itemMatches ? item.children ?? [] : childMatches
                return (
                  <li className="navigation-parent" key={item.id}>
                    <button
                      type="button"
                      className="navigation-row parent-row"
                      aria-controls="workspace-children"
                      aria-expanded={workspaceExpanded}
                      aria-label={`${item.label}, ${workspaceExpanded ? 'collapse' : 'expand'} navigation group`}
                      onClick={() => setWorkspaceExpanded((expanded) => !expanded)}
                    >
                      <span>{item.label}</span>
                      <Icon name={workspaceExpanded ? 'disclosure-expanded' : 'disclosure-collapsed'} />
                    </button>
                    <ul
                      id="workspace-children"
                      className="navigation-children"
                      hidden={!workspaceExpanded}
                    >
                      {visibleChildren.map((child) => {
                        const selected = currentDestination === child.id
                        return (
                          <li key={child.id}>
                            <button
                              type="button"
                              className={`navigation-row child-row ${selected ? 'selected' : ''}`}
                              aria-current={selected ? 'page' : undefined}
                              onClick={() => setCurrentDestination(child.id)}
                            >
                              <span>{child.label}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                    {exposeCollapsedSearchMatches && (
                      <ul
                        className="navigation-children search-match-children"
                        aria-label={`Matches in ${item.label}`}
                      >
                        {childMatches.map((child) => {
                          const selected = currentDestination === child.id
                          return (
                            <li key={child.id}>
                              <button
                                type="button"
                                className={`navigation-row child-row ${selected ? 'selected' : ''}`}
                                aria-current={selected ? 'page' : undefined}
                                onClick={() => setCurrentDestination(child.id)}
                              >
                                <span>{child.label}</span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
            {!hasNavigationMatch && (
              <p className="navigation-empty" role="status">
                {fixture.search.emptyMessage}
              </p>
            )}
          </nav>
        </aside>

        <main className="workspace">
          <div className="workspace-introduction">
            <p className="workspace-eyebrow">Current destination</p>
            <p className="current-destination" aria-live="polite">{currentLabel}</p>
            <h1>{fixture.main.heading}</h1>
            <p>{fixture.main.description}</p>
          </div>
          <ol className="workspace-items" aria-label="Overflow fixture items">
            {Array.from({ length: fixture.main.itemCount }, (_, index) => (
              <li key={index}>Fixture item {String(index + 1).padStart(2, '0')}</li>
            ))}
          </ol>
        </main>
      </div>
    </div>
  )
}
