import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './target.css';

const SHIPMENTS = [
  { id: 'SX-2081', facility: 'Osaka DC', carrier: 'Northstar Freight', issue: 'Temperature excursion', severity: 'Critical', kind: 'high', deadline: 'Today, 18:00', reporter: 'ren ito' },
  { id: 'SX-2077', facility: 'Berlin Hub', carrier: 'Transit Union', issue: 'Seal discrepancy', severity: 'Routine', kind: 'standard', deadline: 'Tomorrow', reporter: 'lara vogel' },
  { id: 'SX-2072', facility: 'Osaka DC', carrier: 'Aster Logistics', issue: 'Missing handoff scan', severity: 'Routine', kind: 'standard', deadline: '22 Aug', reporter: 'kenji mori' },
  { id: 'SX-2068', facility: 'Toronto Depot', carrier: 'Polar Route', issue: 'Coolant pack damage', severity: 'Critical', kind: 'high', deadline: '22 Aug', reporter: 'maya singh' }
];

const STANDALONE_LINKS = [
  ['overview', 'Operations overview'],
  ['carrier-reports', 'Carrier reports'],
  ['facility-directory', 'Facility directory'],
  ['dock-appointments', 'Dock appointments'],
  ['shipment-routing', 'Shipment routing'],
  ['cold-chain-assets', 'Cold-chain assets'],
  ['temperature-policy', 'Temperature policy'],
  ['handoff-monitoring', 'Handoff monitoring'],
  ['incident-logs', 'Incident logs'],
  ['performance-reports', 'Performance reports'],
  ['archive', 'Exception archive'],
  ['scheduled-exports', 'Scheduled exports'],
  ['notification-rules', 'Notification rules'],
  ['partner-integrations', 'Partner integrations'],
  ['api-connections', 'API connections'],
  ['retention', 'Evidence retention'],
  ['workspace-settings', 'Workspace settings'],
  ['support', 'Operations support']
];

const initialState = {
  navigationOpen: true,
  navigationQuery: '',
  groupOpen: true,
  filteredGroupOpen: true,
  activeNavigation: 'exception-queue',
  filtersOpen: true,
  theme: 'light',
  accountOpen: false,
  resultMode: 'initial',
  visibleIds: SHIPMENTS.map((item) => item.id),
  facility: '',
  severity: '',
  reporter: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'toggle-navigation': return { ...state, navigationOpen: !state.navigationOpen };
    case 'set-navigation-query': return { ...state, navigationQuery: action.value, filteredGroupOpen: true };
    case 'toggle-group': return state.navigationQuery
      ? { ...state, filteredGroupOpen: !state.filteredGroupOpen }
      : { ...state, groupOpen: !state.groupOpen };
    case 'select-navigation': return { ...state, activeNavigation: action.id };
    case 'toggle-filters': return { ...state, filtersOpen: !state.filtersOpen };
    case 'toggle-theme': return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'open-account': return { ...state, accountOpen: true };
    case 'close-account': return { ...state, accountOpen: false };
    case 'set-field': return { ...state, [action.field]: action.value };
    case 'show-results': return { ...state, resultMode: action.ids.length ? 'results' : 'empty', visibleIds: action.ids };
    case 'reset-search': return { ...state, resultMode: 'initial', visibleIds: SHIPMENTS.map((item) => item.id), facility: '', severity: '', reporter: '' };
    default: return state;
  }
}

function PanelIcon({ open }) {
  return open
    ? <svg aria-hidden="true" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></svg>
    : <svg aria-hidden="true" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" /></svg>;
}

function MoonIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" /></svg>;
}

function PersonIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="4" /><path d="M18 20a6 6 0 0 0-12 0" /></svg>;
}

function HeaderBar({ state, dispatch }) {
  const accountButton = useRef(null);
  const accountAction = useRef(null);

  useEffect(() => {
    if (state.accountOpen) accountAction.current?.focus();
  }, [state.accountOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape' || !state.accountOpen) return;
      event.preventDefault();
      dispatch({ type: 'close-account' });
      requestAnimationFrame(() => accountButton.current?.focus());
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [state.accountOpen, dispatch]);

  return (
    <header className="topbar" data-ref="app-header">
      <button className="square-control" type="button" data-ref="navigation-toggle" aria-controls="gate-sidebar" aria-expanded={state.navigationOpen} aria-label={state.navigationOpen ? 'Hide navigation' : 'Show navigation'} onClick={() => dispatch({ type: 'toggle-navigation' })}>
        <PanelIcon open={state.navigationOpen} />
      </button>
      <strong className="brand-title">Fulfillment Desk</strong>
      <div className="topbar-actions">
        <button className="square-control" type="button" data-ref="theme-toggle" aria-pressed={state.theme === 'dark'} aria-label={state.theme === 'dark' ? 'Use light theme' : 'Use dark theme'} onClick={() => dispatch({ type: 'toggle-theme' })}>
          <MoonIcon />
        </button>
        <div className="account-anchor">
          <button ref={accountButton} className="square-control" type="button" data-ref="user-menu-toggle" aria-controls="gate-account-menu" aria-expanded={state.accountOpen} aria-haspopup="menu" aria-label={state.accountOpen ? 'Close user menu' : 'Open user menu'} onClick={() => dispatch({ type: state.accountOpen ? 'close-account' : 'open-account' })}>
            <PersonIcon />
          </button>
          <div className="account-card" id="gate-account-menu" data-ref="user-menu-popover" role="menu" hidden={!state.accountOpen}>
            <div className="account-person" role="presentation">
              <p className="account-name">Evelyn Chen</p>
              <p className="account-email">evelyn.chen@example.net</p>
            </div>
            <button ref={accountAction} className="account-command" type="button" role="menuitem" data-ref="sign-out-action">Sign out</button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavigationRail({ state, dispatch }) {
  const query = state.navigationQuery.trim().toLocaleLowerCase();
  const childEntries = [
    { id: 'exception-queue', label: 'Shipment exceptions', key: 'navigation-access-review' },
    { id: 'routing-holds', label: 'Routing holds' }
  ];
  const parentMatches = 'delivery operations'.includes(query);
  const childMatches = childEntries.map((entry) => !query || parentMatches || entry.label.toLocaleLowerCase().includes(query));
  const groupVisible = !query || parentMatches || childMatches.some(Boolean);
  const groupExpanded = query ? state.filteredGroupOpen : state.groupOpen;
  let anyVisible = groupVisible;

  const standalone = STANDALONE_LINKS.map(([id, label]) => {
    const visible = !query || label.toLocaleLowerCase().includes(query);
    anyVisible ||= visible;
    return { id, label, visible };
  });

  const select = (event, id) => {
    event.preventDefault();
    dispatch({ type: 'select-navigation', id });
  };

  return (
    <nav className="side-rail" id="gate-sidebar" data-ref="primary-navigation" aria-label="Primary navigation" hidden={!state.navigationOpen}>
      <label className="rail-search">Filter navigation
        <input type="search" data-ref="navigation-filter" autoComplete="off" placeholder="Find a menu item" value={state.navigationQuery} onInput={(event) => dispatch({ type: 'set-navigation-query', value: event.currentTarget.value })} />
      </label>
      <ul className="rail-items">
        <li hidden={!standalone[0].visible}><a className="rail-link" href="#operations-overview" onClick={(event) => select(event, standalone[0].id)}>Operations overview</a></li>
        <li className="rail-group" hidden={!groupVisible}>
          <button className="rail-parent" type="button" data-ref="navigation-parent" aria-expanded={groupExpanded} aria-controls="gate-delivery-links" onClick={() => dispatch({ type: 'toggle-group' })}>
            <span>Delivery operations</span>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <ul className="rail-children" id="gate-delivery-links" data-ref="navigation-children" hidden={!groupExpanded}>
            {childEntries.map((entry, index) => (
              <li key={entry.id} hidden={!childMatches[index]}>
                <a className="rail-link" href={`#${entry.id}`} data-ref={entry.key} aria-current={state.activeNavigation === entry.id ? 'page' : undefined} onClick={(event) => select(event, entry.id)}>{entry.label}</a>
              </li>
            ))}
          </ul>
        </li>
        {standalone.slice(1).map((entry, index) => (
          <li key={entry.id} hidden={!entry.visible}>
            <a className="rail-link" href={`#${entry.id}`} data-ref={index === 0 ? 'navigation-audit-exports' : undefined} aria-current={state.activeNavigation === entry.id ? 'page' : undefined} onClick={(event) => select(event, entry.id)}>{entry.label}</a>
          </li>
        ))}
      </ul>
      <p className="rail-empty" data-ref="navigation-empty" hidden={anyVisible}>No navigation items found.</p>
    </nav>
  );
}

function SearchCard({ state, dispatch }) {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const facility = String(data.get('facility') || '');
    const severity = String(data.get('severity') || '');
    const reporter = String(data.get('reporter') || '').trim().toLocaleLowerCase();
    const ids = SHIPMENTS
      .filter((item) => (!facility || item.facility === facility)
        && (!severity || item.kind === severity)
        && (!reporter || item.reporter.includes(reporter)))
      .map((item) => item.id);
    dispatch({ type: 'show-results', ids });
  };

  return (
    <section className="search-card" aria-labelledby="target-filter-heading">
      <div className="card-heading">
        <h2 id="target-filter-heading">Filters</h2>
        <button className="outline-action filter-disclosure" type="button" data-ref="filter-toggle" aria-controls="maintained-filter-form" aria-expanded={state.filtersOpen} onClick={() => dispatch({ type: 'toggle-filters' })}>{state.filtersOpen ? 'Hide filters' : 'Show filters'}</button>
      </div>
      <form className="search-form" id="maintained-filter-form" data-ref="filter-panel" aria-labelledby="target-filter-heading" hidden={!state.filtersOpen} onSubmit={submit} onReset={() => dispatch({ type: 'reset-search' })}>
        <div className="search-fields">
          <label>Facility
            <select name="facility" value={state.facility} onChange={(event) => dispatch({ type: 'set-field', field: 'facility', value: event.target.value })}>
              <option value="">All facilities</option><option>Osaka DC</option><option>Berlin Hub</option><option>Toronto Depot</option>
            </select>
          </label>
          <label>Severity
            <select name="severity" value={state.severity} onChange={(event) => dispatch({ type: 'set-field', field: 'severity', value: event.target.value })}>
              <option value="">All severities</option><option value="high">Critical</option><option value="standard">Routine</option>
            </select>
          </label>
          <label>Reported by
            <input name="reporter" data-ref="requester-filter" autoComplete="off" placeholder="Name or email" value={state.reporter} onInput={(event) => dispatch({ type: 'set-field', field: 'reporter', value: event.currentTarget.value })} />
          </label>
        </div>
        <div className="search-commands" data-ref="filter-actions">
          <button className="filled-action" type="submit" data-ref="search-action">Search</button>
          <button className="outline-action" type="reset" data-ref="clear-action">Clear</button>
        </div>
      </form>
    </section>
  );
}

function ResultsCard({ state }) {
  const resultCount = state.visibleIds.length;
  const showResults = state.resultMode === 'results';
  const summary = state.resultMode === 'initial'
    ? 'Search has not been run.'
    : state.resultMode === 'empty'
      ? 'No shipment exceptions found.'
      : `${resultCount} ${resultCount === 1 ? 'exception' : 'exceptions'} shown on this page.`;

  return (
    <section className="result-card" aria-labelledby="target-results-heading">
      <div className="result-card-heading">
        <h2 id="target-results-heading">Exceptions</h2>
        <button className="filled-action" type="button" data-ref="new-request-action">New exception</button>
      </div>
      <p className="screen-reader-status" data-ref="result-summary" aria-live="polite">{summary}</p>
      <div className="result-message" data-ref="result-initial" hidden={state.resultMode !== 'initial'}>
        <h3>Search for exceptions</h3>
        <p>Set filters as needed, then select Search.</p>
      </div>
      <div className="result-message" data-ref="result-empty" hidden={state.resultMode !== 'empty'}>
        <h3>No exceptions found</h3>
        <p>Adjust the filters and search again.</p>
      </div>
      <div className="grid-scroller" hidden={!showResults}>
        <table data-ref="result-table">
          <caption>Shipment exceptions awaiting triage</caption>
          <thead><tr><th scope="col">Exception ID</th><th scope="col">Facility</th><th scope="col">Carrier</th><th scope="col">Issue</th><th scope="col">Severity</th><th scope="col">Deadline</th></tr></thead>
          <tbody>
            {SHIPMENTS.map((item, index) => (
              <tr key={item.id} hidden={!state.visibleIds.includes(item.id)}>
                <td><a className="exception-link" href={`#shipment-${item.id}`}>{item.id}</a></td>
                <td>{item.facility}</td><td>{item.carrier}</td><td>{item.issue}</td>
                <td><span className={`severity-pill ${item.kind}`} data-ref={index === 0 ? 'status-badge' : undefined}>{item.severity}</span></td>
                <td>{item.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="pager" data-ref="result-pagination" aria-label="Shipment exception pages" hidden={!showResults}>
        <p>More exceptions available. Refine filters to narrow the list.</p>
        <div className="pager-controls">
          <button type="button" disabled>Previous</button>
          <span aria-label="Current page, 1">Page 1</span>
          <button type="button">Next</button>
        </div>
      </nav>
    </section>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  const shellClass = useMemo(() => `application-frame${state.navigationOpen ? '' : ' without-navigation'}`, [state.navigationOpen]);

  return (
    <>
      <HeaderBar state={state} dispatch={dispatch} />
      <div className={shellClass}>
        <NavigationRail state={state} dispatch={dispatch} />
        <main className="task-canvas" data-ref="workspace">
          <header className="workspace-heading">
            <h1>Shipment exception queue</h1>
            <p>Resolve cold-chain shipment exceptions before their response deadline.</p>
          </header>
          <div className="workspace-content">
            <SearchCard state={state} dispatch={dispatch} />
            <ResultsCard state={state} />
          </div>
          <div hidden data-maintenance-note="unrelated">No visible change.</div>
        </main>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
