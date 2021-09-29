import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import App from './App'

test('renders the nav links', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

  expect(await screen.findByText(/retrieving photos/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 1/i)).toBeInTheDocument()

  const tabs = screen.getAllByRole('listitem')
  const tabNames = tabs.map(t => t.textContent)
  expect(tabNames).toEqual(['Photo list', 'Add new photo'])
})

test('display the upload form', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

  expect(await screen.findByText(/photo 1/i)).toBeInTheDocument()

  const tab = screen.getByText(/add new photo/i)
  tab.click()

  expect(screen.queryByText(/photo 1/i)).not.toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'Upload Photo'})).toBeInTheDocument()
})
