// src/utils/financeUtils.js
// Utility functions untuk kalkulasi dan formatting

export const financeUtils = {
	// Format currency ke Rupiah
	formatCurrency: (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(amount);
	},

	// Format tanggal ke format Indonesia
	formatDate: (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("id-ID", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	},

	// Format tanggal pendek
	formatDateShort: (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("id-ID");
	},

	// Kalkulasi total saldo dari array transaksi
	calculateBalance: (transactions) => {
		return transactions.reduce((balance, transaction) => {
			if (transaction.type === "income") {
				return balance + transaction.amount;
			} else {
				return balance - transaction.amount;
			}
		}, 0);
	},

	// Kalkulasi total pemasukan
	calculateTotalIncome: (transactions) => {
		return transactions
			.filter((t) => t.type === "income")
			.reduce((total, t) => total + t.amount, 0);
	},

	// Kalkulasi total pengeluaran
	calculateTotalExpense: (transactions) => {
		return transactions
			.filter((t) => t.type === "expense")
			.reduce((total, t) => total + t.amount, 0);
	},

	// Filter transaksi berdasarkan tanggal hari ini
	getTodayTransactions: (transactions) => {
		const today = new Date().toISOString().split("T")[0];
		return transactions.filter((t) => t.date === today);
	},

	// Filter transaksi berdasarkan bulan tertentu
	getMonthTransactions: (transactions, monthKey) => {
		return transactions.filter((t) => t.date.startsWith(monthKey));
	},

	// Validasi input transaksi
	validateTransaction: (data) => {
		const errors = {};

		if (!data.date || data.date.trim() === "") {
			errors.date = "Tanggal harus diisi";
		}

		if (!data.amount || data.amount <= 0) {
			errors.amount = "Jumlah harus lebih dari 0";
		}

		if (!data.type || !["income", "expense"].includes(data.type)) {
			errors.type = "Tipe transaksi harus dipilih";
		}

		if (!data.description || data.description.trim() === "") {
			errors.description = "Deskripsi harus diisi";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	},

	// Mendapatkan nama bulan dalam bahasa Indonesia
	getMonthName: (monthKey) => {
		const months = {
			"01": "Januari",
			"02": "Februari",
			"03": "Maret",
			"04": "April",
			"05": "Mei",
			"06": "Juni",
			"07": "Juli",
			"08": "Agustus",
			"09": "September",
			10: "Oktober",
			11: "November",
			12: "Desember",
		};

		const [year, month] = monthKey.split("-");
		return `${months[month]} ${year}`;
	},

	// Generate warna untuk tipe transaksi
	getTransactionColor: (type) => {
		return type === "income" ? "success" : "danger";
	},

	// Generate icon untuk tipe transaksi
	getTransactionIcon: (type) => {
		return type === "income" ? "↗️" : "↘️";
	},

	// Sorting transaksi berdasarkan tanggal terbaru
	sortByDateDesc: (transactions) => {
		return [...transactions].sort((a, b) => {
			return (
				new Date(b.date + "T" + (b.createdAt || "00:00:00")) -
				new Date(a.date + "T" + (a.createdAt || "00:00:00"))
			);
		});
	},
};
