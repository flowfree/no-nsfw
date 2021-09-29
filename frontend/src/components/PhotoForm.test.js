import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PhotoForm from './PhotoForm'

test('Submit with valid data', async () => {
  render(<PhotoForm />)

  const title = screen.getByLabelText(/title/i)
  userEvent.type(title, 'aaa')

  const description = screen.getByLabelText(/description/i)
  userEvent.type(description, 'bbb')

  const file = new File(['hello'], 'hello.png', {type: 'image/png'})
  const input = screen.getByLabelText(/image/i)
  userEvent.upload(input, file)

  expect(input.files[0]).toStrictEqual(file)
  expect(input.files.item(0)).toStrictEqual(file)
  expect(input.files).toHaveLength(1)

  const saveButton = screen.getByRole('button', { name: 'Save' })
  saveButton.click()

  expect(await screen.findByText('...Saving')).toBeInTheDocument()
  expect(await screen.findByText('Save')).toBeInTheDocument()
  expect(screen.getByText(/Photo successfully uploaded/i)).toBeInTheDocument()
})

test('Submit with empty form', async () => {
  render(<PhotoForm />)

  const saveButton = screen.getByRole('button', { name: 'Save' })
  saveButton.click()

  expect(await screen.findByText('...Saving')).toBeInTheDocument()
  expect(await screen.findByText('Save')).toBeInTheDocument()
  expect(screen.getByText(/title is required/i)).toBeInTheDocument()
  expect(screen.getByText(/description is required/i)).toBeInTheDocument()
  expect(screen.getByText(/no file was submitted/i)).toBeInTheDocument()
})
