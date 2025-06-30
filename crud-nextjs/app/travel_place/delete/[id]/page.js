"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";

export default function TravelPlaceDelete({ params }) {
	const { id } = use(params);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const loadData = async (id) => {
		const response = await fetch(`/api/travel_place/${id}`);
		const data = await response.json();
		if (response.status == 200) {
			setData(data[0]);
			setError(null);
		} else {
			setData(null);
			setError(data.error);
		}
	};

	useEffect(() => {
		loadData(id);
	}, [id]);

	return data == null ? (
		<p>{error == null ? "Sedang memuat..." : error}</p>
	) : (
		<div className="container-fluid">
			<img className="img-fluid" src={data.photo_url} />
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
						<td className="text-end" colSpan="2">
							<button
								className="btn btn-md btn-danger"
								type="button"
								onClick={deleteData}
							>
								Hapus
							</button>
							&nbsp;
							<Link href="/travel_place/admin" className="btn btn-md btn=light">
								Batal
							</Link>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
