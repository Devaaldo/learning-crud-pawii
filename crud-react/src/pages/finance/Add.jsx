import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { financeAPI } from "../../data/financeData";
import { financeUtils } from "../../utils/financeUtils";

function FinanceAdd() {
	const navigate = useNavigate();
	const [data, setData] = useState({
		date: new Date().toISOString().split("T")[0], // Default hari ini
		amount: "",
		type: "expense", // Default pengeluaran
		description: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (field, value) => {
		setData({
			...data,
			[field]: value,
		});
		// Clear error ketika user mulai mengetik
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

		// Convert amount to number
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
			// Simpan data
			financeAPI.add(transactionData);

			// Redirect ke halaman list
			navigate("..");
		} catch (error) {
			console.error("Error saving transaction:", error);
			setErrors({ general: "Terjadi kesalahan saat menyimpan data" });
		}

		setIsSubmitting(false);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 offset-md-2">
					<div className="card">
						<div className="card-header">
							<h3 className="mb-0">Tambah Transaksi Baru</h3>
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
										max={new Date().toISOString().split("T")[0]} // Tidak boleh lebih dari hari ini
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
											<>Simpan Transaksi</>
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

export default FinanceAdd;
