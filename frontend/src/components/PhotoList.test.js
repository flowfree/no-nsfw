import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PhotoList from './PhotoList'

test('display list of photos', async () => {
  render(<PhotoList />)

  expect(await screen.findByText(/retrieving photos/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 1/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 2/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 3/i)).toBeInTheDocument()
})
