import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { financeAPI } from "../../data/financeData";
import { financeUtils } from "../../utils/financeUtils";

function FinanceView() {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const loadData = () => {
		const transaction = financeAPI.getById(id);
		setData(transaction);
		setIsLoading(false);
	};

	useEffect(() => {
		loadData();
	}, [id]);

	if (isLoading) {
		return (
			<div className="container">
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<p className="mt-2">Memuat data...</p>
				</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="container">
				<div className="alert alert-danger" role="alert">
					<h4 className="alert-heading">Transaksi Tidak Ditemukan</h4>
					<p>Transaksi yang Anda cari tidak ditemukan dalam sistem.</p>
					<hr />
					<p className="mb-0">
						<Link to=".." className="btn btn-primary">
							← Kembali ke Daftar Transaksi
						</Link>
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					<div className="card">
						<div className="card-header d-flex justify-content-between align-items-center">
							<h3 className="mb-0">Detail Transaksi</h3>
							<span
								className={`badge bg-${financeUtils.getTransactionColor(
									data.type
								)} fs-6`}
							>
								{financeUtils.getTransactionIcon(data.type)}
								{data.type === "income" ? "Pemasukan" : "Pengeluaran"}
							</span>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-12">
									{/* Jumlah - Display prominently */}
									<div className="text-center mb-4">
										<h1
											className={`display-4 text-${financeUtils.getTransactionColor(
												data.type
											)}`}
										>
											{data.type === "income" ? "+" : "-"}
											{financeUtils.formatCurrency(data.amount)}
										</h1>
									</div>

									{/* Detail Information */}
									<div className="table-responsive">
										<table className="table table-borderless">
											<tbody>
												<tr>
													<td className="fw-bold">Tanggal Transaksi:</td>
													<td>{financeUtils.formatDate(data.date)}</td>
												</tr>
												<tr>
													<td className="fw-bold">Tipe Transaksi:</td>
													<td>
														<span
															className={`badge bg-${financeUtils.getTransactionColor(
																data.type
															)}`}
														>
															{financeUtils.getTransactionIcon(data.type)}
															{data.type === "income"
																? "Pemasukan"
																: "Pengeluaran"}
														</span>
													</td>
												</tr>
												<tr>
													<td className="fw-bold">Jumlah:</td>
													<td
														className={`text-${financeUtils.getTransactionColor(
															data.type
														)} fw-bold`}
													>
														{data.type === "income" ? "+" : "-"}
														{financeUtils.formatCurrency(data.amount)}
													</td>
												</tr>
												<tr>
													<td className="fw-bold">Deskripsi:</td>
													<td>{data.description}</td>
												</tr>
												<tr>
													<td className="fw-bold">Waktu Input:</td>
													<td>
														{data.createdAt
															? new Date(data.createdAt).toLocaleString("id-ID")
															: "Tidak tersedia"}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="d-flex justify-content-between">
								<Link to=".." className="btn btn-secondary">
									← Kembali ke Daftar
								</Link>
								<div>
									<Link
										to={`../edit/${data.id}`}
										className="btn btn-primary me-2"
									>
										Edit
									</Link>
									<Link to={`../delete/${data.id}`} className="btn btn-primary">
										Hapus
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FinanceView;
