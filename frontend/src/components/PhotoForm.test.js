import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import PhotoForm from './PhotoForm'

const baseURL = process.env.REACT_APP_API_BASE_URL

const server = setupServer(
  rest.post(`${baseURL}/photos`, (req, res, ctx) => {
    const title = req.body.get('title')
    const description = req.body.get('description')
    const image = req.body.get('image')
    let errors = {}

    if (title == undefined || title.trim().length === 0) {
      errors.title = ['Title is required.']
    }
    if (description == undefined || description.trim().length === 0) {
      errors.description = ['Description is required.']
    }
    if (image == undefined) {
      errors.image = ['No file was submitted.']
    }

    if (Object.keys(errors).length === 0) {
      return res(ctx.status(201))
    } else {
      return res(ctx.status(400), ctx.json(errors))
    }
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
