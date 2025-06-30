import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { financeAPI } from "../../data/financeData";
import { financeUtils } from "../../utils/financeUtils";

function FinanceDelete() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	const loadData = () => {
		const transaction = financeAPI.getById(id);
		setData(transaction);
		setIsLoading(false);
	};

	const deleteData = async (event) => {
		event.preventDefault();
		setIsDeleting(true);

		try {
			const deleted = financeAPI.delete(id);
			if (deleted) {
				// Redirect ke halaman list
				navigate("..");
			} else {
				alert("Gagal menghapus transaksi");
			}
		} catch (error) {
			console.error("Error deleting transaction:", error);
			alert("Terjadi kesalahan saat menghapus data");
		}

		setIsDeleting(false);
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
					<p>Transaksi yang ingin Anda hapus tidak ditemukan dalam sistem.</p>
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
					<div className="card border-primary">
						<div className="card-header bg-primary text-white">
							<h3 className="mb-0">Konfirmasi Hapus Transaksi</h3>
						</div>
						<div className="card-body">
							{/* Detail transaksi yang akan dihapus */}
							<div className="bg-light p-3 rounded">
								<h5 className="mb-3">Detail Transaksi yang akan dihapus:</h5>

								<div className="row">
									<div className="col-md-12">
										{/* Jumlah - Display prominently */}
										<div className="text-center mb-3">
											<h2
												className={`text-${financeUtils.getTransactionColor(
													data.type
												)}`}
											>
												{data.type === "income" ? "+" : "-"}
												{financeUtils.formatCurrency(data.amount)}
											</h2>
										</div>

										{/* Detail Information */}
										<div className="table-responsive">
											<table className="table table-sm table-borderless">
												<tbody>
													<tr>
														<td className="fw-bold">Tanggal:</td>
														<td>{financeUtils.formatDate(data.date)}</td>
													</tr>
													<tr>
														<td className="fw-bold">Tipe:</td>
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
														<td className="fw-bold">Deskripsi:</td>
														<td>{data.description}</td>
													</tr>
													<tr>
														<td className="fw-bold">ID:</td>
														<td>#{data.id}</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>

							{/* Confirmation Form */}
							<form onSubmit={deleteData} className="mt-4">
								<div className="d-flex justify-content-between">
									<Link to=".." className="btn btn-secondary">
										Batal
									</Link>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isDeleting}
									>
										{isDeleting ? (
											<>
												<span
													className="spinner-border spinner-border-sm me-1"
													role="status"
												></span>
												Menghapus...
											</>
										) : (
											<>Ya, Hapus Transaksi</>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FinanceDelete;
