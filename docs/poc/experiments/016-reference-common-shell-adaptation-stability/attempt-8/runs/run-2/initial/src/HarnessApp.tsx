import { useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type DestinationRole = 'top-level' | 'child'

interface Destination {
  id: string
  label: string
  role: DestinationRole
}

interface ParentDestination {
  id: string
  label: string
  children: Destination[]
}

const applicationName = 'Operations workspace'

const overview: Destination = {
  id: 'overview',
  label: 'Overview',
  role: 'top-level',
}

const workspace: ParentDestination = {
  id: 'workspace',
  label: 'Workspace',
  children: [
    { id: 'section-01', label: 'Section 01', role: 'child' },
    { id: 'section-02', label: 'Section 02', role: 'child' },
    { id: 'section-03', label: 'Section 03', role: 'child' },
  ],
}

const activity: Destination = {
  id: 'activity',
  label: 'Activity',
  role: 'top-level',
}

const allDestinations = [overview, ...workspace.children, activity]

function resolveTheme(search: string): Theme {
  return new URLSearchParams(search).get('theme') === 'dark' ? 'dark' : 'light'
}

function resolveDrawerOpen(search: string): boolean {
  return new URLSearchParams(search).get('drawer') !== 'hidden'
}

function resolveWorkspaceExpanded(search: string): boolean {
  return new URLSearchParams(search).get('workspace') !== 'collapsed'
}

function resolveCurrentDestination(search: string): string {
  const requested = new URLSearchParams(search).get('current')
  const match = allDestinations.find(
    (destination) => destination.id === requested || destination.label === requested,
  )

  return match?.id ?? overview.id
}

function ShellIcon({ name }: { name: string }) {
  return <span className={`shell-icon shell-icon--${name}`} aria-hidden="true" />
}

function matches(label: string, query: string): boolean {
  return label.toLocaleLowerCase().includes(query)
}

export function HarnessApp() {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(window.location.search))
  const [drawerOpen, setDrawerOpen] = useState(() => resolveDrawerOpen(window.location.search))
  const [workspaceExpanded, setWorkspaceExpanded] = useState(() =>
    resolveWorkspaceExpanded(window.location.search),
  )
  const [currentDestination, setCurrentDestination] = useState(() =>
    resolveCurrentDestination(window.location.search),
  )
  const [navigationQuery, setNavigationQuery] = useState('')

  useEffect(() => {
    document.documentElement.dataset.referenceVisualTheme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const normalizedQuery = navigationQuery.trim().toLocaleLowerCase()
  const isFiltering = normalizedQuery.length > 0

  const filteredNavigation = useMemo(() => {
    const matchingChildren = workspace.children.filter((child) =>
      matches(child.label, normalizedQuery),
    )
    const workspaceMatches = matches(workspace.label, normalizedQuery)

    return {
      showOverview: !isFiltering || matches(overview.label, normalizedQuery),
      showWorkspace: !isFiltering || workspaceMatches || matchingChildren.length > 0,
      workspaceChildren: !isFiltering
        ? workspace.children
        : workspaceMatches
          ? workspace.children
          : matchingChildren,
      showActivity: !isFiltering || matches(activity.label, normalizedQuery),
    }
  }, [isFiltering, normalizedQuery])

  const visibleWorkspaceExpanded = workspaceExpanded || isFiltering
  const hasNavigationResults =
    filteredNavigation.showOverview ||
    filteredNavigation.showWorkspace ||
    filteredNavigation.showActivity

  const drawerAction = drawerOpen ? 'Close navigation' : 'Open navigation'
  const themeAction = theme === 'light' ? 'Switch to Dark theme' : 'Switch to Light theme'

  const destinationRow = (destination: Destination) => {
    const current = destination.id === currentDestination

    return (
      <li key={destination.id}>
        <button
          className={`navigation-row${destination.role === 'child' ? ' navigation-row--child' : ''}${current ? ' navigation-row--current' : ''}`}
          type="button"
          aria-current={current ? 'page' : undefined}
          onClick={() => setCurrentDestination(destination.id)}
        >
          <span className="navigation-row__label">{destination.label}</span>
        </button>
      </li>
    )
  }

  return (
    <div className="app-shell" data-reference-visual-theme={theme}>
      <header className="shell-header">
        <button
          className="icon-button"
          type="button"
          aria-label={drawerAction}
          aria-expanded={drawerOpen}
          aria-controls="application-navigation"
          title={drawerAction}
          onClick={() => setDrawerOpen((visible) => !visible)}
        >
          <ShellIcon name={drawerOpen ? 'drawer-hide' : 'drawer-show'} />
        </button>

        <strong className="workspace-identity">{applicationName}</strong>

        <button
          className="icon-button theme-button"
          type="button"
          aria-label={themeAction}
          title={themeAction}
          onClick={() => setTheme((activeTheme) => (activeTheme === 'light' ? 'dark' : 'light'))}
        >
          <ShellIcon name={theme === 'light' ? 'theme-to-dark' : 'theme-to-light'} />
        </button>
      </header>

      <div className={`shell-body${drawerOpen ? '' : ' shell-body--drawer-hidden'}`}>
        {drawerOpen ? (
          <aside className="drawer" id="application-navigation" aria-label="Application navigation">
            <div className="drawer-search">
              <label htmlFor="navigation-search">Search navigation</label>
              <div className="search-field">
                <ShellIcon name="search" />
                <input
                  id="navigation-search"
                  type="search"
                  value={navigationQuery}
                  placeholder="Find an item"
                  autoComplete="off"
                  onChange={(event) => setNavigationQuery(event.target.value)}
                />
              </div>
            </div>

            <nav className="navigation" aria-label="Workspace navigation">
              {hasNavigationResults ? (
                <ul className="navigation-list">
                  {filteredNavigation.showOverview ? destinationRow(overview) : null}

                  {filteredNavigation.showWorkspace ? (
                    <li>
                      <button
                        className="navigation-row navigation-row--parent"
                        type="button"
                        aria-expanded={visibleWorkspaceExpanded}
                        onClick={() => setWorkspaceExpanded((expanded) => !expanded)}
                      >
                        <span className="navigation-row__label">{workspace.label}</span>
                        <ShellIcon
                          name={
                            visibleWorkspaceExpanded
                              ? 'disclosure-expanded'
                              : 'disclosure-collapsed'
                          }
                        />
                      </button>

                      {visibleWorkspaceExpanded ? (
                        <ul className="navigation-children">
                          {filteredNavigation.workspaceChildren.map(destinationRow)}
                        </ul>
                      ) : null}
                    </li>
                  ) : null}

                  {filteredNavigation.showActivity ? destinationRow(activity) : null}
                </ul>
              ) : (
                <p className="no-matches">No matching navigation items.</p>
              )}
            </nav>
          </aside>
        ) : null}

        <main className="workspace" data-workspace-task="neutral-overflow-fixture">
          <section className="workspace-content" aria-labelledby="workspace-heading">
            <div className="page-heading">
              <h1 id="workspace-heading">Neutral workspace content</h1>
              <p>This content is only an overflow fixture for observing the common shell.</p>
            </div>

            <ol className="fixture-list" aria-label="Neutral overflow fixture">
              {Array.from({ length: 24 }, (_, index) => (
                <li key={index}>{index + 1}</li>
              ))}
            </ol>
          </section>
        </main>
      </div>
    </div>
  )
}
