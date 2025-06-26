import { useState, useEffect } from "react";
import { Link } from "react-router";
import { financeAPI } from "../data/financeData";
import { financeUtils } from "../utils/financeUtils";

function HomePage() {
	const [transactions, setTransactions] = useState([]);
	const [todayTransactions, setTodayTransactions] = useState([]);
	const [balance, setBalance] = useState(0);
	const [todayIncome, setTodayIncome] = useState(0);
	const [todayExpense, setTodayExpense] = useState(0);

	const loadData = () => {
		const allTransactions = financeAPI.getAll();
		const today = financeUtils.getTodayTransactions(allTransactions);

		setTransactions(allTransactions);
		setTodayTransactions(today);
		setBalance(financeUtils.calculateBalance(allTransactions));
		setTodayIncome(financeUtils.calculateTotalIncome(today));
		setTodayExpense(financeUtils.calculateTotalExpense(today));
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<h1 className="mb-4">Dashboard Keuangan Personal</h1>
				</div>
			</div>

			{/* Saldo Cards */}
			<div className="row mb-4">
				<div className="col-md-4">
					<div
						className={`card text-white ${
							balance >= 0 ? "bg-success" : "bg-danger"
						}`}
					>
						<div className="card-body">
							<h5 className="card-title">💰 Saldo Terkini</h5>
							<h3 className="card-text">
								{financeUtils.formatCurrency(balance)}
							</h3>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white bg-primary">
						<div className="card-body">
							<h5 className="card-title">Pemasukan Hari Ini</h5>
							<h3 className="card-text">
								{financeUtils.formatCurrency(todayIncome)}
							</h3>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div className="card text-white bg-warning">
						<div className="card-body">
							<h5 className="card-title">Pengeluaran Hari Ini</h5>
							<h3 className="card-text">
								{financeUtils.formatCurrency(todayExpense)}
							</h3>
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="row mb-4">
				<div className="col-md-12">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title">Aksi Cepat</h5>
							<div className="d-flex gap-2 flex-wrap">
								<Link to="/admin/finance/add" className="btn btn-success">
									Tambah Transaksi
								</Link>
								<Link to="/admin/finance" className="btn btn-primary">
									Lihat Semua Transaksi
								</Link>
								<Link to="/admin/finance/summary" className="btn btn-info">
									Ringkasan Bulanan
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Today's Transactions */}
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-header">
							<h5 className="mb-0">Transaksi Hari Ini</h5>
						</div>
						<div className="card-body">
							{todayTransactions.length === 0 ? (
								<p className="text-muted text-center">
									Belum ada transaksi hari ini
								</p>
							) : (
								<div className="table-responsive">
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Tipe</th>
												<th>Deskripsi</th>
												<th>Jumlah</th>
											</tr>
										</thead>
										<tbody>
											{todayTransactions.map((transaction) => (
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
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
