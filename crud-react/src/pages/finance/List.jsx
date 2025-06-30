import { useState, useEffect } from "react";
import { Link } from "react-router";
import { financeAPI } from "../../data/financeData";
import { financeUtils } from "../../utils/financeUtils";

function FinanceList() {
	const [groupedData, setGroupedData] = useState({});
	const [filter, setFilter] = useState("all"); // all, income, expense

	const loadData = () => {
		const grouped = financeAPI.getGroupedByDate();
		setGroupedData(grouped);
	};

	useEffect(() => {
		loadData();
	}, []);

	const getFilteredTransactions = (transactions) => {
		if (filter === "all") return transactions;
		return transactions.filter((t) => t.type === filter);
	};

	const getTotalForDate = (transactions) => {
		const income = financeUtils.calculateTotalIncome(transactions);
		const expense = financeUtils.calculateTotalExpense(transactions);
		return { income, expense, balance: income - expense };
	};

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-md-6">
					<h1>Daftar Transaksi</h1>
				</div>
				<div className="col-md-6 text-end">
					<Link to="add" className="btn btn-primary">
						Tambah Transaksi
					</Link>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-md-12">
					<div className="card">
						<div className="card-body">
							<h6 className="card-title">Filter Transaksi</h6>
							<div className="btn-group" role="group">
								<input
									type="radio"
									className="btn-check"
									name="filter"
									id="filter-all"
									checked={filter === "all"}
									onChange={() => setFilter("all")}
								/>
								<label
									className="btn btn-outline-secondary"
									htmlFor="filter-all"
								>
									Semua
								</label>

								<input
									type="radio"
									className="btn-check"
									name="filter"
									id="filter-income"
									checked={filter === "income"}
									onChange={() => setFilter("income")}
								/>
								<label
									className="btn btn-outline-primary"
									htmlFor="filter-income"
								>
									Pemasukan
								</label>

								<input
									type="radio"
									className="btn-check"
									name="filter"
									id="filter-expense"
									checked={filter === "expense"}
									onChange={() => setFilter("expense")}
								/>
								<label
									className="btn btn-outline-primary"
									htmlFor="filter-expense"
								>
									Pengeluaran
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Transaksi berdasarkan tanggal */}
			{Object.keys(groupedData).length === 0 ? (
				<div className="text-center">
					<p className="text-muted">Belum ada transaksi</p>
				</div>
			) : (
				Object.entries(groupedData).map(([date, transactions]) => {
					const filteredTransactions = getFilteredTransactions(transactions);
					if (filteredTransactions.length === 0) return null;

					const totals = getTotalForDate(transactions);

					return (
						<div key={date} className="card mb-3">
							<div className="card-header">
								<div className="row">
									<div className="col-md-6">
										<h5 className="mb-0">{financeUtils.formatDate(date)}</h5>
									</div>
									<div className="col-md-6 text-end">
										<small className="text-muted">
											<span className="text-success">
												+{financeUtils.formatCurrency(totals.income)}
											</span>
											{" | "}
											<span className="text-danger">
												-{financeUtils.formatCurrency(totals.expense)}
											</span>
											{" | "}
											<span
												className={
													totals.balance >= 0 ? "text-success" : "text-danger"
												}
											>
												Net: {financeUtils.formatCurrency(totals.balance)}
											</span>
										</small>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="table-responsive">
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Tipe</th>
												<th>Deskripsi</th>
												<th>Jumlah</th>
												<th>Aksi</th>
											</tr>
										</thead>
										<tbody>
											{filteredTransactions.map((transaction) => (
												<tr key={transaction.id}>
													<td>
														<span
															className={`badge bg-${financeUtils.getTransactionColor(
																transaction.type
															)}`}
														>
															{financeUtils.getTransactionIcon(
																transaction.type
															)}
															{transaction.type === "income"
																? "Pemasukan"
																: "Pengeluaran"}
														</span>
													</td>
													<td>{transaction.description}</td>
													<td
														className={`text-${financeUtils.getTransactionColor(
															transaction.type
														)}`}
													>
														{transaction.type === "income" ? "+" : "-"}
														{financeUtils.formatCurrency(transaction.amount)}
													</td>
													<td>
														<Link
															to={`${transaction.id}`}
															className="btn btn-sm btn-secondary me-1"
														>
															Lihat
														</Link>
														<Link
															to={`edit/${transaction.id}`}
															className="btn btn-sm btn-primary me-1"
														>
															Edit
														</Link>
														<Link
															to={`delete/${transaction.id}`}
															className="btn btn-sm btn-danger"
														>
															Hapus
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}

export default FinanceList;
