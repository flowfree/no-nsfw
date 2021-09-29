import '@testing-library/jest-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const baseURL = process.env.REACT_APP_API_BASE_URL

const server = setupServer(

  // GET /photos
  rest.get(`${baseURL}/photos`, (req, res, ctx) => {
    return res(ctx.json([
      {id: 1, title: 'Photo 1', description: 'aaa', image: `${baseURL}/a.jpg`},
      {id: 2, title: 'Photo 2', description: 'bbb', image: `${baseURL}/b.jpg`},
      {id: 3, title: 'Photo 3', description: 'ccc', image: `${baseURL}/c.jpg`},
    ]))
  }),

  // POST /photos
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

    if (Object.keys(errors).length) {
      return res(ctx.status(400), ctx.json(errors))
    } else {
      return res(ctx.status(201))
    }
  })

)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
