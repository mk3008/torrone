import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HarnessApp } from './HarnessApp'
import './harness.css'

const root = document.getElementById('root')

if (root === null) {
  throw new Error('React harness root is missing.')
}

createRoot(root).render(
  <StrictMode>
    <HarnessApp />
  </StrictMode>,
)
