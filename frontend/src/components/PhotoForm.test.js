import { render, screen } from '@testing-library/react'
import PhotoForm from './PhotoForm'

test('renders the title', () => {
  render(<PhotoForm />)
  const element = screen.getByText(/upload photo/i)
  expect(element).toBeInTheDocument()
})
