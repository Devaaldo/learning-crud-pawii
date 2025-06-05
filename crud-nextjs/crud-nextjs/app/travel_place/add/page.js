'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TravelPlaceAdd() {
  const router = useRouter()
  const [ data, setData ] = useState({
    name: '',
    location: '',
    photo_url: '',
    rating: 0,
  })

  const saveData = async event => {
    event.preventDefault()
    await fetch('/api/travel_place', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': data.name,
        'location': data.location,
        'photo_url': data.photo_url,
        'rating': data.rating,
      })
    })
    router.push('admin')
  }

  return (
    <form onSubmit={saveData} className="container-fluid">
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
        <label htmlFor="photo_url" className="form-label">URL Foto</label>
        <input
          type="text"
          className="form-control"
          id="photo_url"
          value={data.photo_url}
          onChange={event => setData({
            ...data,
            photo_url: event.target.value,
          })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rating</label>
        <input
          type="text"
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
        <Link href="admin" className="btn btn-light">Batal</Link>
      </div>
    </form>
  )
}
