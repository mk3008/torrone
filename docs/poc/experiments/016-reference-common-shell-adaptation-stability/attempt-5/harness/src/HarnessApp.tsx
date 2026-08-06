const supportedThemes = new Set(['light', 'dark'])

function resolveTheme(search: string): 'light' | 'dark' {
  const requestedTheme = new URLSearchParams(search).get('theme')
  return requestedTheme !== null && supportedThemes.has(requestedTheme)
    ? (requestedTheme as 'light' | 'dark')
    : 'light'
}

export function HarnessApp() {
  const theme = resolveTheme(window.location.search)
  document.documentElement.dataset.harnessTheme = theme

  return (
    <main className="harness-status" data-testid="react-harness" data-theme={theme}>
      <h1>React adaptation harness</h1>
      <p>Ready. A common shell is intentionally not implemented.</p>
      <output aria-live="polite">theme={theme}</output>
    </main>
  )
}
