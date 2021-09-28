import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import PhotoList from './PhotoList'

const baseURL = process.env.REACT_APP_API_BASE_URL

const server = setupServer(
  rest.get(`${baseURL}/photos`, (req, res, ctx) => {
    return res(ctx.json([
      {id: 1, title: 'Photo 1', description: 'aaa', image: `${baseURL}/a.jpg`},
      {id: 2, title: 'Photo 2', description: 'bbb', image: `${baseURL}/b.jpg`},
      {id: 3, title: 'Photo 3', description: 'ccc', image: `${baseURL}/c.jpg`},
    ]))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('display list of photos', async () => {
  render(<PhotoList />)

  expect(await screen.findByText(/retrieving photos/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 1/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 2/i)).toBeInTheDocument()
  expect(await screen.findByText(/photo 3/i)).toBeInTheDocument()
})
