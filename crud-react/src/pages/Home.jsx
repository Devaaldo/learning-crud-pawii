import { useState, useEffect } from "react";
import { Link } from "react-router";
import { financeAPI } from "../data/financeData";
import { financeUtils } from "../utils/financeUtils";

function HomePage() {
	const [balance, setBalance] = useState(0);
	const [todayIncome, setTodayIncome] = useState(0);
	const [todayExpense, setTodayExpense] = useState(0);

	const loadData = () => {
		const allTransactions = financeAPI.getAll();
		const today = financeUtils.getTodayTransactions(allTransactions);

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
					<div>
						<div>
							<h5>Saldo Terkini</h5>
							<h3>{financeUtils.formatCurrency(balance)}</h3>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div>
						<div>
							<h5>Pemasukan Hari Ini</h5>
							<h3>{financeUtils.formatCurrency(todayIncome)}</h3>
						</div>
					</div>
				</div>
				<div className="col-md-4">
					<div>
						<div>
							<h5>Pengeluaran Hari Ini</h5>
							<h3>{financeUtils.formatCurrency(todayExpense)}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
