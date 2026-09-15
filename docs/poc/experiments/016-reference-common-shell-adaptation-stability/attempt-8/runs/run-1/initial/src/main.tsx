import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OperationsShell } from './OperationsShell'
import './operations-shell.css'

document.title = 'Operations workspace'

const favicon = document.createElement('link')
favicon.rel = 'icon'
favicon.href = 'data:,'
document.head.append(favicon)

const root = document.getElementById('root')

if (root === null) {
  throw new Error('React harness root is missing.')
}

createRoot(root).render(
  <StrictMode>
    <OperationsShell />
  </StrictMode>,
)
