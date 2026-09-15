import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../../vanilla/styles.css';

const CASES = [
  { id: 'SC-772', supplier: 'Alpine Components', region: 'EMEA', scope: 'Payment setup', risk: 'High', riskKind: 'high', due: 'Today, 17:00' },
  { id: 'SC-768', supplier: 'Mariner Tools', region: 'North America', scope: 'Tax documentation', risk: 'Standard', riskKind: 'standard', due: 'Tomorrow' },
  { id: 'SC-761', supplier: 'Kite Logistics', region: 'APAC', scope: 'Bank verification', risk: 'Standard', riskKind: 'standard', due: '20 Aug' },
  { id: 'SC-755', supplier: 'Cedar Medical', region: 'EMEA', scope: 'Sanctions review', risk: 'High', riskKind: 'high', due: '20 Aug' }
];

function MenuIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16M4 12h16M4 19h16" /></svg>;
}

function ThemeIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" /></svg>;
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function App() {
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [visibleCases, setVisibleCases] = useState(CASES);
  const dialogRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialogOpen && !dialog.open) dialog.showModal();
    if (!dialogOpen && dialog.open) dialog.close();
  }, [dialogOpen]);

  function search(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const region = String(data.get('region') || '');
    const risk = String(data.get('risk') || '');
    setVisibleCases(CASES.filter((item) => (!region || item.region === region) && (!risk || item.riskKind === risk)));
  }

  function clear() {
    requestAnimationFrame(() => setVisibleCases(CASES));
  }

  return (
    <>
      <header className="app-header" data-ref="app-header">
        <button className="icon-button" type="button" data-ref="navigation-toggle" aria-controls="primary-navigation" aria-expanded={navigationOpen} aria-label={navigationOpen ? 'Hide navigation' : 'Show navigation'} onClick={() => setNavigationOpen((value) => !value)}>
          <MenuIcon />
        </button>
        <div className="product-name">Supplier Hub</div>
        <div className="environment">Onboarding environment</div>
        <button className="icon-button" type="button" data-ref="theme-toggle" aria-pressed={dark} aria-label={dark ? 'Use light theme' : 'Use dark theme'} onClick={() => setDark((value) => !value)}>
          <ThemeIcon />
        </button>
      </header>

      <div className={`shell${navigationOpen ? '' : ' navigation-hidden'}`} id="application-shell">
        <nav className="primary-navigation" id="primary-navigation" data-ref="primary-navigation" aria-label="Primary navigation" hidden={!navigationOpen}>
          <p className="navigation-label">Suppliers</p>
          <ul className="nav-list">
            <li><a className="nav-link" href="#">Directory</a></li>
            <li><a className="nav-link" href="#" aria-current="page">Onboarding cases</a></li>
            <li><a className="nav-link" href="#">Compliance checks</a></li>
            <li><a className="nav-link" href="#">Payment profiles</a></li>
          </ul>
        </nav>

        <main className="workspace" data-ref="workspace">
          <div className="page-heading">
            <div>
              <p className="eyebrow">Supplier operations</p>
              <h1>Supplier onboarding cases</h1>
              <p className="page-description">Complete supplier checks that need an operations decision before purchasing can begin.</p>
            </div>
          </div>

          <section className="filters" aria-labelledby="filter-heading">
            <div className="section-heading">
              <h2 id="filter-heading">Filters</h2>
              <button className="disclosure-button" type="button" data-ref="filter-toggle" aria-controls="filter-panel" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((value) => !value)}>
                {filtersOpen ? 'Hide filters' : 'Show filters'}
              </button>
            </div>
            <form className="filter-panel" id="filter-panel" data-ref="filter-panel" aria-labelledby="filter-heading" hidden={!filtersOpen} onSubmit={search} onReset={clear}>
              <label className="field">Region
                <select name="region"><option value="">All regions</option><option>EMEA</option><option>APAC</option><option>North America</option></select>
              </label>
              <label className="field">Risk
                <select name="risk"><option value="">All risks</option><option value="high">High</option><option value="standard">Standard</option></select>
              </label>
              <label className="field">Case owner
                <input name="owner" autoComplete="off" placeholder="Owner name" />
              </label>
              <div className="filter-actions">
                <button className="primary-button" type="submit">Find cases</button>
                <button className="secondary-button" type="reset">Clear</button>
              </div>
            </form>
          </section>

          <section className="results" aria-labelledby="result-heading">
            <div className="result-heading">
              <h2 id="result-heading">Cases</h2>
              <p className="result-summary" data-ref="result-summary" aria-live="polite">{visibleCases.length} {visibleCases.length === 1 ? 'case' : 'cases'}</p>
            </div>
            <div className="table-wrap">
              <table data-ref="result-table">
                <caption>Supplier onboarding cases awaiting review</caption>
                <thead><tr><th scope="col">Case</th><th scope="col">Supplier</th><th scope="col">Scope</th><th scope="col">Risk</th><th scope="col">Due</th><th scope="col">Action</th></tr></thead>
                <tbody>
                  {visibleCases.map((item, index) => (
                    <tr key={item.id}>
                      <td><span className="identity">{item.id}</span><span className="subtle">{item.region}</span></td>
                      <td>{item.supplier}</td><td>{item.scope}</td>
                      <td><span className={`status-badge${item.riskKind === 'high' ? ' high' : ''}`} data-ref={index === 0 ? 'status-badge' : undefined}>{item.risk}</span></td>
                      <td>{item.due}</td>
                      <td><button className="row-action" type="button" data-ref={index === 0 ? 'detail-action' : undefined} onClick={index === 0 ? () => setDialogOpen(true) : undefined}>Review case</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <dialog ref={dialogRef} data-ref="detail-dialog" aria-labelledby="detail-title" onClose={() => setDialogOpen(false)}>
        <div className="dialog-header">
          <h2 id="detail-title">Review SC-772</h2>
          <button className="icon-button" type="button" data-ref="dialog-close" autoFocus aria-label="Close case details" onClick={() => setDialogOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className="dialog-body">
          <p>Confirm the required checks and purchasing deadline before assigning the next action.</p>
          <dl><dt>Supplier</dt><dd>Alpine Components</dd><dt>Scope</dt><dd>Payment setup</dd><dt>Open check</dt><dd>Bank ownership</dd></dl>
        </div>
        <div className="dialog-actions">
          <button className="secondary-button" type="button">Return to analyst</button>
          <button className="primary-button" type="button">Assign next check</button>
        </div>
      </dialog>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
