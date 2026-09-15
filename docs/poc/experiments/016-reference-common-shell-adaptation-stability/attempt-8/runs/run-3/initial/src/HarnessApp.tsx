import { useMemo, useState } from 'react'

type Theme = 'light' | 'dark'
type DestinationId = 'overview' | 'section-01' | 'section-02' | 'section-03' | 'activity'

type Destination = {
  id: DestinationId
  label: string
}

const workspaceChildren: Destination[] = [
  { id: 'section-01', label: 'Section 01' },
  { id: 'section-02', label: 'Section 02' },
  { id: 'section-03', label: 'Section 03' },
]

const destinationByLabel = new Map<string, DestinationId>([
  ['Overview', 'overview'],
  ['Section 01', 'section-01'],
  ['Section 02', 'section-02'],
  ['Section 03', 'section-03'],
  ['Activity', 'activity'],
])

function readInitialState() {
  const params = new URLSearchParams(window.location.search)
  const currentLabel = params.get('current') ?? 'Overview'

  return {
    theme: params.get('theme') === 'dark' ? ('dark' as const) : ('light' as const),
    drawerVisible: params.get('drawer') !== 'hidden',
    workspaceExpanded: params.get('workspace') !== 'collapsed',
    currentDestination: destinationByLabel.get(currentLabel) ?? ('overview' as const),
  }
}

function Glyph({ className }: { className: string }) {
  return <span className={`fixed-glyph ${className}`} aria-hidden="true" />
}

function DestinationRow({
  destination,
  currentDestination,
  child = false,
  onSelect,
}: {
  destination: Destination
  currentDestination: DestinationId
  child?: boolean
  onSelect: (destination: DestinationId) => void
}) {
  const current = destination.id === currentDestination

  return (
    <button
      className={`navigation-row${child ? ' navigation-row--child' : ''}${current ? ' navigation-row--current' : ''}`}
      type="button"
      aria-current={current ? 'page' : undefined}
      onClick={() => onSelect(destination.id)}
    >
      <span>{destination.label}</span>
    </button>
  )
}

function Header({
  drawerVisible,
  theme,
  onToggleDrawer,
  onToggleTheme,
}: {
  drawerVisible: boolean
  theme: Theme
  onToggleDrawer: () => void
  onToggleTheme: () => void
}) {
  const drawerAction = drawerVisible ? 'Close navigation' : 'Open navigation'
  const themeAction = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'

  return (
    <header className="shell-header">
      <button
        className="shell-icon-button"
        type="button"
        aria-label={drawerAction}
        title={drawerAction}
        aria-expanded={drawerVisible}
        onClick={onToggleDrawer}
      >
        <Glyph className={drawerVisible ? 'glyph-drawer-hide' : 'glyph-drawer-show'} />
      </button>
      <strong className="workspace-identity">Operations workspace</strong>
      <button
        className="shell-icon-button shell-icon-button--theme"
        type="button"
        aria-label={themeAction}
        title={themeAction}
        onClick={onToggleTheme}
      >
        <Glyph className={theme === 'light' ? 'glyph-theme-dark' : 'glyph-theme-light'} />
      </button>
    </header>
  )
}

function NavigationDrawer({
  workspaceExpanded,
  currentDestination,
  onToggleWorkspace,
  onSelect,
}: {
  workspaceExpanded: boolean
  currentDestination: DestinationId
  onToggleWorkspace: () => void
  onSelect: (destination: DestinationId) => void
}) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase()

  const matches = (label: string) =>
    normalizedQuery.length === 0 || label.toLocaleLowerCase().includes(normalizedQuery)

  const visibleChildren = useMemo(
    () => workspaceChildren.filter((destination) => matches(destination.label)),
    [normalizedQuery],
  )
  const workspaceMatches = matches('Workspace') || visibleChildren.length > 0
  const showWorkspaceChildren = workspaceMatches && (workspaceExpanded || normalizedQuery.length > 0)
  const hasVisibleRows = matches('Overview') || workspaceMatches || matches('Activity')

  return (
    <aside className="navigation-drawer" aria-label="Application navigation">
      <div className="navigation-search">
        <label htmlFor="navigation-search">Search navigation</label>
        <div className="search-control">
          <Glyph className="glyph-search" />
          <input
            id="navigation-search"
            type="search"
            value={query}
            placeholder="Find an item"
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <nav className="navigation-scrollport" aria-label="Workspace navigation">
        {hasVisibleRows ? (
          <ul className="navigation-list">
            {matches('Overview') ? (
              <li>
                <DestinationRow
                  destination={{ id: 'overview', label: 'Overview' }}
                  currentDestination={currentDestination}
                  onSelect={onSelect}
                />
              </li>
            ) : null}

            {workspaceMatches ? (
              <li>
                <button
                  className="navigation-row navigation-row--parent"
                  type="button"
                  aria-expanded={workspaceExpanded}
                  onClick={onToggleWorkspace}
                >
                  <span>Workspace</span>
                  <Glyph
                    className={workspaceExpanded ? 'glyph-disclosure-expanded' : 'glyph-disclosure-collapsed'}
                  />
                </button>
                {showWorkspaceChildren ? (
                  <ul className="navigation-children">
                    {visibleChildren.map((destination) => (
                      <li key={destination.id}>
                        <DestinationRow
                          destination={destination}
                          currentDestination={currentDestination}
                          child
                          onSelect={onSelect}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : null}

            {matches('Activity') ? (
              <li>
                <DestinationRow
                  destination={{ id: 'activity', label: 'Activity' }}
                  currentDestination={currentDestination}
                  onSelect={onSelect}
                />
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="no-matches">No matching navigation items.</p>
        )}
      </nav>
    </aside>
  )
}

function Workspace() {
  return (
    <main className="workspace">
      <section className="workspace-content" aria-labelledby="workspace-heading">
        <header className="task-heading">
          <h1 id="workspace-heading">Neutral workspace content</h1>
          <p>This content is only an overflow fixture for observing the common shell.</p>
        </header>
        <ol className="fixture-list" aria-label="Neutral overflow fixture">
          {Array.from({ length: 24 }, (_, index) => (
            <li key={index}>{index + 1}</li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export function HarnessApp() {
  const initialState = useMemo(readInitialState, [])
  const [theme, setTheme] = useState<Theme>(initialState.theme)
  const [drawerVisible, setDrawerVisible] = useState(initialState.drawerVisible)
  const [workspaceExpanded, setWorkspaceExpanded] = useState(initialState.workspaceExpanded)
  const [currentDestination, setCurrentDestination] = useState<DestinationId>(initialState.currentDestination)

  return (
    <div className="operations-shell" data-reference-visual-theme={theme}>
      <Header
        drawerVisible={drawerVisible}
        theme={theme}
        onToggleDrawer={() => setDrawerVisible((visible) => !visible)}
        onToggleTheme={() => setTheme((activeTheme) => (activeTheme === 'light' ? 'dark' : 'light'))}
      />
      <div className={`shell-body${drawerVisible ? '' : ' shell-body--drawer-hidden'}`}>
        {drawerVisible ? (
          <NavigationDrawer
            workspaceExpanded={workspaceExpanded}
            currentDestination={currentDestination}
            onToggleWorkspace={() => setWorkspaceExpanded((expanded) => !expanded)}
            onSelect={setCurrentDestination}
          />
        ) : null}
        <Workspace />
      </div>
    </div>
  )
}
