import { useReducer } from 'react'
import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE_URL

const initialState = {
  form: {
    _key: '',
    title: '',
    description: '',
    image: '',
    errors: {
      title: '',
      description: '',
      image: ''
    }
  },
  isSubmitting: false,
  successMessage: '',
  errorMessage: ''
}

function reducer(state, action) {
  let newState = JSON.parse(JSON.stringify(state))
  newState.form.image = state.form.image

  switch (action.type) {
    case 'form/title':
      newState.form.title = action.value
      break
    case 'form/description':
      newState.form.description = action.value
      break
    case 'form/image':
      newState.form.image = action.value
      break
    case 'form/errors/title':
      newState.form.errors.title = action.value
      break
    case 'form/errors/description':
      newState.form.errors.description = action.value
      break 
    case 'form/errors/image':
      newState.form.errors.image = action.value
      break
    case 'submitStart':
      newState.form.errors = JSON.parse(JSON.stringify(initialState.form.errors))
      newState.successMessage = ''
      newState.errorMessage = ''
      newState.isSubmitting = true
      break
    case 'submitEnd':
      newState.isSubmitting = false
      break
    case 'submitSuccess':
      newState = JSON.parse(JSON.stringify(initialState))
      newState.successMessage = 'Photo successfully uploaded.'
      break
    case 'submitFailed':
      newState.errorMessage = action.value
      newState.successMessage = ''
      break
    case 'reset':
    default:
      newState = JSON.parse(JSON.stringify(initialState))
      newState.form._key = Date.now()
  }
  return newState
}

function PhotoForm() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { form, successMessage, errorMessage } = state

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description, image } = form
    const formData = new FormData()

    title && formData.append('title', title)
    description && formData.append('description', description)
    image && formData.append('image', image, image.name)

    dispatch({ type: 'submitStart' })
    axios
      .post(`${baseURL}/photos`, formData)
      .then(() => {
        dispatch({ type: 'submitSuccess' })
      })
      .catch((error) => {
        if ('response' in error && 'data' in error.response) {
          const errors = error.response.data
          for (const field in errors) {
            setFormError(field, errors[field][0])
          }
        }
      })
      .then(() => {
        dispatch({ type: 'submitEnd' })
      })
  }

  function handleReset(e) {
    e.preventDefault()
    dispatch({ type: 'reset' })
  }

  function setFormValue(name, value) {
    dispatch({ type: 'form/'+name, value })
  }

  function setFormError(name, value) {
    dispatch({ type: 'form/errors/'+name, value })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h4 className="text-center my-3">Upload Photo</h4>
        {successMessage && <p className="alert alert-success">{successMessage}</p>}
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        <form encType="multipart/form-data" method="post" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="title" className="col-md-2 col-form-label">Title</label>
            <div className="col-md-10">
              <input 
                type="text" 
                name="title" 
                value={form.title}  
                className={'form-control ' + (form.errors.title ? 'is-invalid' : '')}
                onChange={e => setFormValue('title', e.target.value)}
              />
              <div className="invalid-feedback">{form.errors.title}</div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="description" className="col-md-2 col-form-label">Description</label>
            <div className="col-md-10">
              <textarea 
                name="description" 
                rows="2"
                value={form.description}
                className={'form-control ' + (form.errors.description ? 'is-invalid' : '')}
                onChange={e => setFormValue('description', e.target.value)}
              ></textarea>
              <div className="invalid-feedback">{form.errors.description}</div>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="image" className="col-md-2 col-form-label">Image</label>
            <div className="col-md-10">
              <input 
                type="file" 
                name="image" 
                key={form._key}
                className={'form-control ' + (form.errors.image ? 'is-invalid' : '')}
                onChange={e => setFormValue('image', e.target.files[0])}
              />
              <div className="invalid-feedback">{form.errors.image}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-outline-primary float-end">
                {state.isSubmitting ? '...Saving' : 'Save'}
              </button>
              <button 
                className="btn btn-outline-secondary float-end me-2"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

export default PhotoForm 
