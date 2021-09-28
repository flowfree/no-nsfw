import { useEffect, useState } from 'react'
import axios from 'axios'
import Masonry from 'masonry-layout'

const baseURL = process.env.REACT_APP_API_BASE_URL

function PhotoListItem({ photo }) {
  return (
    <div className="col-6 col-lg-3 mb-4 grid-item">
      <div className="card">
        <img src={photo.image} className="card-img-top" width="100%" alt="" />
        <div className="card-body">
          <h5 className="card-title">{photo.title}</h5>
          <p className="card-text">{photo.description}</p>
        </div>
      </div>
    </div>
  )
}

function PhotoList() {
  const [photos, setPhotos] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    setMessage('Retrieving photos...')
    axios 
      .get(`${baseURL}/photos`)
      .then(response => {
        if (response.data.length) {
          setPhotos(response.data)        
          setMessage('')
          new Masonry('.grid', {
            itemSelector: '.grid-item',
            percentPosition: true
          })
        } else {
          setMessage('No photos found.')
        }
      })
      .catch(error => {
        setError('Something went wrong.')
        setMessage('')
      })
  }, [])

  return (
    <div className="row my-5 grid">
      {photos.map(photo => <PhotoListItem key={photo.id} photo={photo} />)}
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default PhotoList
