import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { financeAPI } from "../../data/financeData";
import { financeUtils } from "../../utils/financeUtils";

function FinanceEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [data, setData] = useState({
		date: "",
		amount: "",
		type: "",
		description: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const loadData = () => {
		const transaction = financeAPI.getById(id);
		if (transaction) {
			setData({
				date: transaction.date,
				amount: transaction.amount.toString(),
				type: transaction.type,
				description: transaction.description,
			});
		} else {
			setErrors({ general: "Transaksi tidak ditemukan" });
		}
		setIsLoading(false);
	};

	const handleChange = (field, value) => {
		setData({
			...data,
			[field]: value,
		});
		// menghapus pesan error pada field tertentu begitu user mulai mengetik atau mengubah nilai input
		if (errors[field]) {
			setErrors({
				...errors,
				[field]: "",
			});
		}
	};

	const saveData = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		// Ubah ke number
		const transactionData = {
			...data,
			amount: parseFloat(data.amount),
		};

		// Validasi
		const validation = financeUtils.validateTransaction(transactionData);

		if (!validation.isValid) {
			setErrors(validation.errors);
			setIsSubmitting(false);
			return;
		}

		try {
			// Update data
			const updated = financeAPI.update(id, transactionData);

			if (updated) {
				// Redirect ke halaman list
				navigate("..");
			} else {
				setErrors({ general: "Gagal mengupdate transaksi" });
			}
		} catch (error) {
			console.error("Error updating transaction:", error);
			setErrors({ general: "Terjadi kesalahan saat mengupdate data" });
		}

		setIsSubmitting(false);
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

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					<div className="card">
						<div className="card-header">
							<h3 className="mb-0">Edit Transaksi</h3>
						</div>
						<div className="card-body">
							{errors.general && (
								<div className="alert alert-danger" role="alert">
									{errors.general}
								</div>
							)}

							<form onSubmit={saveData}>
								{/* Tanggal */}
								<div className="mb-3">
									<label htmlFor="date" className="form-label">
										Tanggal Transaksi <span className="text-danger">*</span>
									</label>
									<input
										type="date"
										className={`form-control ${
											errors.date ? "is-invalid" : ""
										}`}
										id="date"
										value={data.date}
										onChange={(e) => handleChange("date", e.target.value)}
										max={new Date().toISOString().split("T")[0]}
									/>
									{errors.date && (
										<div className="invalid-feedback">{errors.date}</div>
									)}
								</div>

								{/* Tipe Transaksi */}
								<div className="mb-3">
									<label className="form-label">
										Tipe Transaksi <span className="text-danger">*</span>
									</label>
									<div className="row">
										<div className="col-md-6">
											<div className="form-check">
												<input
													className="form-check-input"
													type="radio"
													name="type"
													id="type-income"
													value="income"
													checked={data.type === "income"}
													onChange={(e) => handleChange("type", e.target.value)}
												/>
												<label
													className="form-check-label text-success"
													htmlFor="type-income"
												>
													Pemasukan
												</label>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-check">
												<input
													className="form-check-input"
													type="radio"
													name="type"
													id="type-expense"
													value="expense"
													checked={data.type === "expense"}
													onChange={(e) => handleChange("type", e.target.value)}
												/>
												<label
													className="form-check-label text-danger"
													htmlFor="type-expense"
												>
													Pengeluaran
												</label>
											</div>
										</div>
									</div>
									{errors.type && (
										<div className="text-danger small mt-1">{errors.type}</div>
									)}
								</div>

								{/* Jumlah */}
								<div className="mb-3">
									<label htmlFor="amount" className="form-label">
										Jumlah (Rupiah) <span className="text-danger">*</span>
									</label>
									<div className="input-group">
										<span className="input-group-text">Rp</span>
										<input
											type="number"
											className={`form-control ${
												errors.amount ? "is-invalid" : ""
											}`}
											id="amount"
											value={data.amount}
											onChange={(e) => handleChange("amount", e.target.value)}
											placeholder="0"
											min="1"
											step="1"
										/>
										{errors.amount && (
											<div className="invalid-feedback">{errors.amount}</div>
										)}
									</div>
									{data.amount && !isNaN(data.amount) && (
										<small className="text-muted">
											Preview:{" "}
											{financeUtils.formatCurrency(
												parseFloat(data.amount) || 0
											)}
										</small>
									)}
								</div>

								{/* Deskripsi */}
								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Deskripsi <span className="text-danger">*</span>
									</label>
									<textarea
										className={`form-control ${
											errors.description ? "is-invalid" : ""
										}`}
										id="description"
										rows="3"
										value={data.description}
										onChange={(e) =>
											handleChange("description", e.target.value)
										}
										placeholder="Contoh: Gaji bulanan, Makan siang, Bensin, dll."
									/>
									{errors.description && (
										<div className="invalid-feedback">{errors.description}</div>
									)}
								</div>

								{/* Buttons */}
								<div className="text-end">
									<Link to=".." className="btn btn-secondary me-2">
										Batal
									</Link>
									<button
										type="submit"
										className={`btn btn-${
											data.type === "income" ? "success" : "danger"
										}`}
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<span
													className="spinner-border spinner-border-sm me-1"
													role="status"
												></span>
												Menyimpan...
											</>
										) : (
											<>Update Transaksi</>
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

export default FinanceEdit;
