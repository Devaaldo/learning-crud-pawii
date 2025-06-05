import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'

function TravelPlaceDelete() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [ data, setData ] = useState(null)

  const deleteData = async event => {
    event.preventDefault()
    await fetch(`http://localhost:3000/api/travel_place/${id}`, {
      method: 'DELETE',
    })
    navigate('..')
  }

  const loadData = async () => {
    const response = await fetch(`http://localhost:3000/api/travel_place/${id}`)
    const json = await response.json()
    const item = json[0]
    setData({
      id: item['id'],
      name: item['name'],
      location: item['location'],
      photoUrl: item['photo_url'],
      rating: item['rating'],
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container">
      <h1>Hapus Tempat Wisata</h1>
      {data == null ? (
        <p>Sedang memuat...</p>
      ) : (
        <>
          <table className="table">
            <tbody>
              <tr>
                <td>Nama</td>
                <td>{data.name}</td>
              </tr>
              <tr>
                <td>Lokasi</td>
                <td>{data.location}</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>{data.rating}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-end">
                  <button
                    type="button"
                    onClick={deleteData}
                    className="btn btn-md btn-danger"
                  >Hapus</button>
                  &nbsp;
                  <Link
                    to=".."
                    className="btn btn-md btn-light"
                  >Kembali</Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  )
}

export default TravelPlaceDelete
