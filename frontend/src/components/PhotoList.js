import { useEffect, useState } from 'react'
import axios from 'axios'
import Masonry from 'masonry-layout'

const baseURL = process.env.REACT_APP_API_BASE_URL

function PhotoListItem({ photo }) {
  return (
    <div className="card">
      <img src={photo.image} className="card-img-top" width="100%" alt="" />
      <div className="card-body">
        <h5 className="card-title">{photo.title}</h5>
        <p className="card-text">{photo.description}</p>
      </div>
    </div>
  )
}

function PhotoList() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    axios 
      .get(`${baseURL}/photos`)
      .then(response => {
        setPhotos(response.data)        
        new Masonry('.grid', {
          itemSelector: '.grid-item',
          percentPosition: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="row mb-3 grid">
      {photos.length ? photos.map(photo => (
        <div key={photo.id} className="col-6 col-lg-3 mb-4 grid-item">
          <PhotoListItem photo={photo} />
        </div>
      )) : (
        <p>Retrieving photos...</p>
      )}
    </div>
  )
}

export default PhotoList
