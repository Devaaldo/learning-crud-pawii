'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TravelPlaceAdmin() {
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)

  const loadData = async () => {
    const response = await fetch('/api/travel_place')
    const data = await response.json()
    if (response.status == 200) {
      setData(data)
      setError(null)
    } else {
      setData(null)
      setError(data.error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Lokasi</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {data == null || data.length == 0 ? (
          <tr>
            <td colSpan={4} className="text-center">
              {data == null ? (
                error == null ? 'Sedang memuat...' : error
              ) : 'Data kosong'}
            </td>
          </tr>
        ) : (
          data.map((item, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td className="text-end">
                <div className="btn-group" role="group">
                  <Link
                    href={`${item.id}`}
                    className="btn btn-sm btn-info"
                  >
                    Lihat
                  </Link>
                  <Link
                    href={`edit/${item.id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`delete/${item.id}`}
                    className="btn btn-sm btn-danger"
                  >
                    Hapus
                  </Link>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4} className="text-end">
            <Link
              href="add"
              className="btn btn-md btn-primary"
            >
              Tambah
            </Link>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
