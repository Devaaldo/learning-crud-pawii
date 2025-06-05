import { useState, useEffect } from 'react'
import { Link } from 'react-router'

function TravelPlaceAdmin() {
  const [data, setData] = useState(null)

  const loadData = async () => {
    const response = await fetch('http://localhost:3000/api/travel_place')
    const json = await response.json()
    let items = []
    for (const item of json) {
      items.push({
        id: item['id'],
        name: item['name'],
        location: item['location'],
      })
    }
    setData(items)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container">
      <h1>Kelola Tempat Wisata</h1>
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
              <td colSpan="4" className="text-center">
                {data == null ? 'Sedang memuat...' : 'Data kosong'}
              </td>
            </tr>
          ) : data.map((item, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td className="text-end">
                <Link
                  to={`${item.id}`}
                  className="btn btn-sm btn-light"
                >
                  Lihat
                </Link>
                &nbsp;
                <Link
                  to={`edit/${item.id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
                &nbsp;
                <Link
                  to={`delete/${item.id}`}
                  className="btn btn-sm btn-danger"
                >
                  Hapus
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-end">
              <Link
                to="add"
                className="btn btn-md btn-primary"
              >
                Tambah
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default TravelPlaceAdmin
