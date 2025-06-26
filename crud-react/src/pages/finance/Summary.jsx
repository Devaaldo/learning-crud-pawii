import { useState, useEffect } from "react";
import { Link } from "react-router";
import { financeAPI } from "../../data/financeData";
import { financeUtils } from "../../utils/financeUtils";

function FinanceSummary() {
	const [monthlyData, setMonthlyData] = useState([]);
	const [allTransactions, setAllTransactions] = useState([]);
	const [totalBalance, setTotalBalance] = useState(0);
	const [totalIncome, setTotalIncome] = useState(0);
	const [totalExpense, setTotalExpense] = useState(0);

	const loadData = () => {
		const transactions = financeAPI.getAll();
		const monthly = financeAPI.getMonthlySummary();

		setAllTransactions(transactions);
		setMonthlyData(monthly);
		setTotalBalance(financeUtils.calculateBalance(transactions));
		setTotalIncome(financeUtils.calculateTotalIncome(transactions));
		setTotalExpense(financeUtils.calculateTotalExpense(transactions));
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-md-6">
					<h1>📊 Ringkasan Keuangan Bulanan</h1>
					<p className="text-muted">
						Analisis keuangan berdasarkan data bulanan
					</p>
				</div>
				<div className="col-md-6 text-end">
					<Link to=".." className="btn btn-secondary me-2">
						← Kembali
					</Link>
					<Link to="../add" className="btn btn-success">
						➕ Tambah Transaksi
					</Link>
				</div>
			</div>

			{/* Total Summary Cards */}
			<div className="row mb-4">
				<div className="col-md-4">
					<div
						className={`card text-white ${
							totalBalance >= 0 ? "bg-success" : "bg-danger"
						}`}
					>
						<div className="card-body text-center">
							<h6 className="card-title">💰 Total Saldo</h6>
							<h3 className="card-text">
								{financeUtils.formatCurrency(totalBalance)}
							</h3>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white bg-primary">
						<div className="card-body text-center">
							<h6 className="card-title">📈 Total Pemasukan</h6>
							<h3 className="card-text">
								{financeUtils.formatCurrency(totalIncome)}
							</h3>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white bg-warning">
						<div className="card-body text-center">
							<h6 className="card-title">📉 Total Pengeluaran</h6>
							<h3 className="card-text">
								{financeUtils.formatCurrency(totalExpense)}
							</h3>
						</div>
					</div>
				</div>
			</div>

			{/* Monthly Summary Table */}
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-header">
							<h5 className="mb-0">📅 Ringkasan Per Bulan</h5>
						</div>
						<div className="card-body">
							{monthlyData.length === 0 ? (
								<div className="text-center text-muted">
									<p>Belum ada data transaksi</p>
									<Link to="../add" className="btn btn-primary">
										Tambah Transaksi Pertama
									</Link>
								</div>
							) : (
								<div className="table-responsive">
									<table className="table table-hover">
										<thead className="table-dark">
											<tr>
												<th>Bulan</th>
												<th className="text-end">Pemasukan</th>
												<th className="text-end">Pengeluaran</th>
												<th className="text-end">Saldo Bulan</th>
												<th className="text-center">Status</th>
											</tr>
										</thead>
										<tbody>
											{monthlyData.map((month) => (
												<tr key={month.month}>
													<td className="fw-bold">
														{financeUtils.getMonthName(month.month)}
													</td>
													<td className="text-end text-success">
														+{financeUtils.formatCurrency(month.income)}
													</td>
													<td className="text-end text-danger">
														-{financeUtils.formatCurrency(month.expense)}
													</td>
													<td
														className={`text-end fw-bold ${
															month.balance >= 0
																? "text-success"
																: "text-danger"
														}`}
													>
														{month.balance >= 0 ? "+" : ""}
														{financeUtils.formatCurrency(month.balance)}
													</td>
													<td className="text-center">
														{month.balance >= 0 ? (
															<span className="badge bg-success">
																📈 Surplus
															</span>
														) : (
															<span className="badge bg-danger">
																📉 Defisit
															</span>
														)}
													</td>
												</tr>
											))}
										</tbody>
										<tfoot className="table-secondary">
											<tr>
												<th>Total Keseluruhan</th>
												<th className="text-end text-success">
													+{financeUtils.formatCurrency(totalIncome)}
												</th>
												<th className="text-end text-danger">
													-{financeUtils.formatCurrency(totalExpense)}
												</th>
												<th
													className={`text-end fw-bold ${
														totalBalance >= 0 ? "text-success" : "text-danger"
													}`}
												>
													{totalBalance >= 0 ? "+" : ""}
													{financeUtils.formatCurrency(totalBalance)}
												</th>
												<th className="text-center">
													{totalBalance >= 0 ? (
														<span className="badge bg-success">💰 Positif</span>
													) : (
														<span className="badge bg-danger">⚠️ Negatif</span>
													)}
												</th>
											</tr>
										</tfoot>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Financial Health Analysis */}
			{monthlyData.length > 0 && (
				<div className="row mt-4">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								<h5 className="mb-0">🔍 Analisis Kesehatan Keuangan</h5>
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-6">
										<h6>📊 Statistik:</h6>
										<ul>
											<li>
												<strong>Rata-rata Pemasukan per Bulan:</strong>
												{financeUtils.formatCurrency(
													totalIncome / monthlyData.length
												)}
											</li>
											<li>
												<strong>Rata-rata Pengeluaran per Bulan:</strong>
												{financeUtils.formatCurrency(
													totalExpense / monthlyData.length
												)}
											</li>
											<li>
												<strong>Total Bulan Tercatat:</strong>{" "}
												{monthlyData.length} bulan
											</li>
										</ul>
									</div>
									<div className="col-md-6">
										<h6>🎯 Rekomendasi:</h6>
										<ul>
											{totalBalance >= 0 ? (
												<>
													<li className="text-success">
														✅ Kondisi keuangan Anda sehat
													</li>
													<li>
														💡 Pertimbangkan untuk menabung atau investasi
													</li>
												</>
											) : (
												<>
													<li className="text-danger">
														⚠️ Perlu review pengeluaran
													</li>
													<li>💡 Cari sumber pemasukan tambahan</li>
												</>
											)}
											<li>📋 Lakukan evaluasi rutin setiap bulan</li>
											<li>🎯 Buat target saldo bulanan</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default FinanceSummary;
