import { useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type DestinationId = 'overview' | 'section-01' | 'section-02' | 'section-03' | 'activity'

type Destination = {
  id: DestinationId
  label: string
}

const overview: Destination = { id: 'overview', label: 'Overview' }
const activity: Destination = { id: 'activity', label: 'Activity' }
const workspaceChildren: Destination[] = [
  { id: 'section-01', label: 'Section 01' },
  { id: 'section-02', label: 'Section 02' },
  { id: 'section-03', label: 'Section 03' },
]

function queryState() {
  const parameters = new URLSearchParams(window.location.search)
  const theme: Theme = parameters.get('theme') === 'dark' ? 'dark' : 'light'
  const drawerOpen = parameters.get('drawer') !== 'hidden'
  const workspaceExpanded = parameters.get('workspace') !== 'collapsed'
  const currentLabel = parameters.get('current') ?? 'Overview'
  const destinations = [overview, ...workspaceChildren, activity]
  const currentDestination = destinations.find(
    (destination) => destination.label.toLowerCase() === currentLabel.toLowerCase(),
  )?.id ?? 'overview'

  return { theme, drawerOpen, workspaceExpanded, currentDestination }
}

function NavigationRow({
  destination,
  currentDestination,
  child = false,
  onSelect,
}: {
  destination: Destination
  currentDestination: DestinationId
  child?: boolean
  onSelect: (id: DestinationId) => void
}) {
  const isCurrent = destination.id === currentDestination

  return (
    <li>
      <button
        className={`navigation-row${child ? ' navigation-row--child' : ''}`}
        type="button"
        aria-current={isCurrent ? 'page' : undefined}
        onClick={() => onSelect(destination.id)}
      >
        <span>{destination.label}</span>
      </button>
    </li>
  )
}

export function OperationsShell() {
  const initial = useMemo(queryState, [])
  const [theme, setTheme] = useState<Theme>(initial.theme)
  const [drawerOpen, setDrawerOpen] = useState(initial.drawerOpen)
  const [workspaceExpanded, setWorkspaceExpanded] = useState(initial.workspaceExpanded)
  const [currentDestination, setCurrentDestination] = useState<DestinationId>(
    initial.currentDestination,
  )
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const overviewMatches = overview.label.toLowerCase().includes(normalizedQuery)
  const activityMatches = activity.label.toLowerCase().includes(normalizedQuery)
  const workspaceLabelMatches = 'workspace'.includes(normalizedQuery)
  const matchingWorkspaceChildren = workspaceChildren.filter((destination) =>
    destination.label.toLowerCase().includes(normalizedQuery),
  )
  const workspaceMatches = workspaceLabelMatches || matchingWorkspaceChildren.length > 0
  const visibleWorkspaceChildren = normalizedQuery
    ? workspaceLabelMatches
      ? workspaceChildren
      : matchingWorkspaceChildren
    : workspaceExpanded
      ? workspaceChildren
      : []
  const hasMatches = overviewMatches || workspaceMatches || activityMatches

  const drawerAction = drawerOpen ? 'Close navigation' : 'Open navigation'
  const themeAction = theme === 'light' ? 'Switch to Dark mode' : 'Switch to Light mode'

  return (
    <div
      className="application-shell"
      data-reference-visual-theme={theme}
      data-theme={theme}
    >
      <header className="application-header">
        <button
          className="icon-button"
          type="button"
          aria-label={drawerAction}
          aria-expanded={drawerOpen}
          title={drawerAction}
          onClick={() => setDrawerOpen((isOpen) => !isOpen)}
        >
          <span
            className={`fixed-icon ${drawerOpen ? 'fixed-icon--drawer-hide' : 'fixed-icon--drawer-show'}`}
            aria-hidden="true"
          />
        </button>

        <strong className="application-identity">Operations workspace</strong>

        <button
          className="icon-button application-header__theme"
          type="button"
          aria-label={themeAction}
          title={themeAction}
          onClick={() => setTheme((activeTheme) => (activeTheme === 'light' ? 'dark' : 'light'))}
        >
          <span
            className={`fixed-icon ${theme === 'light' ? 'fixed-icon--theme-to-dark' : 'fixed-icon--theme-to-light'}`}
            aria-hidden="true"
          />
        </button>
      </header>

      <div className={`application-body${drawerOpen ? '' : ' application-body--drawer-hidden'}`}>
        {drawerOpen ? (
          <aside className="application-drawer" aria-label="Application navigation">
            <div className="drawer-search">
              <label htmlFor="navigation-search">Search navigation</label>
              <div className="drawer-search__control">
                <span className="fixed-icon fixed-icon--search" aria-hidden="true" />
                <input
                  id="navigation-search"
                  type="search"
                  value={searchQuery}
                  placeholder="Find an item"
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />
              </div>
            </div>

            <nav className="drawer-navigation" aria-label="Operations navigation">
              {hasMatches ? (
                <ul className="navigation-list">
                  {overviewMatches ? (
                    <NavigationRow
                      destination={overview}
                      currentDestination={currentDestination}
                      onSelect={setCurrentDestination}
                    />
                  ) : null}

                  {workspaceMatches ? (
                    <li>
                      <button
                        className="navigation-row navigation-row--parent"
                        type="button"
                        aria-expanded={workspaceExpanded}
                        onClick={() => setWorkspaceExpanded((isExpanded) => !isExpanded)}
                      >
                        <span>Workspace</span>
                        <span
                          className={`fixed-icon ${workspaceExpanded ? 'fixed-icon--disclosure-expanded' : 'fixed-icon--disclosure-collapsed'}`}
                          aria-hidden="true"
                        />
                      </button>
                      {visibleWorkspaceChildren.length > 0 ? (
                        <ul className="navigation-children">
                          {visibleWorkspaceChildren.map((destination) => (
                            <NavigationRow
                              key={destination.id}
                              destination={destination}
                              currentDestination={currentDestination}
                              child
                              onSelect={setCurrentDestination}
                            />
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ) : null}

                  {activityMatches ? (
                    <NavigationRow
                      destination={activity}
                      currentDestination={currentDestination}
                      onSelect={setCurrentDestination}
                    />
                  ) : null}
                </ul>
              ) : (
                <p className="drawer-navigation__empty">No matching navigation items.</p>
              )}
            </nav>
          </aside>
        ) : null}

        <main className="workspace">
          <section className="workspace-page" aria-labelledby="workspace-heading">
            <div className="page-header">
              <h1 id="workspace-heading">Neutral workspace content</h1>
              <p>This content is only an overflow fixture for observing the common shell.</p>
            </div>
            <ol className="neutral-items" aria-label="Neutral numbered items">
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
