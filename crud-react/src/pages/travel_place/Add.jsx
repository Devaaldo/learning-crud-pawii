import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function TravelPlaceAdd() {
  const navigate = useNavigate()
  const [ data, setData ] = useState({
    name: null,
    location: null,
    photoUrl: null,
    rating: null,
  })

  const saveData = async event => {
    event.preventDefault()
    await fetch('http://localhost:3000/api/travel_place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'name': data.name,
        'location': data.location,
        'photo_url': data.photoUrl,
        'rating': data.rating,
      })
    })
    navigate('..')
  }

  return (
    <div className="container">
      <h1>Tambah Tempat Wisata</h1>
      <form onSubmit={saveData}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={data.name}
            onChange={event => setData({
              ...data,
              name: event.target.value,
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Lokasi</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={data.location}
            onChange={event => setData({
              ...data,
              location: event.target.value,
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo-url" className="form-label">URL Foto</label>
          <input
            type="text"
            className="form-control"
            id="photo-url"
            value={data.photoUrl}
            onChange={event => setData({
              ...data,
              photoUrl: event.target.value,
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={data.rating}
            onChange={event => setData({
              ...data,
              rating: event.target.value,
            })}
          />
        </div>
        <div className="mb-3 text-end">
          <button type="submit" className="btn btn-primary">Simpan</button>
          &nbsp;
          <Link to=".." className="btn btn-light">Batal</Link>
        </div>
      </form>
    </div>
  )
}

export default TravelPlaceAdd
