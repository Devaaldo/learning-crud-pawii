import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'

function TravelPlaceView() {
  const { id } = useParams()
  const [ data, setData ] = useState(null)

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
      <h1>Detail Tempat Wisata</h1>
      {data == null ? (
        <p>Sedang memuat...</p>
      ) : (
        <>
          <img className="img-fluid" src={data.photoUrl} />
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
                  <Link
                    to=".."
                    className="btn btn-md btn-primary"
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

export default TravelPlaceView
