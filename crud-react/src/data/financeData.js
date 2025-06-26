let financeData = [
	{
		id: 1,
		date: "2025-01-15",
		amount: 500000,
		type: "income",
		description: "Gaji bulanan",
		createdAt: "2025-01-15T08:00:00Z",
	},
	{
		id: 2,
		date: "2025-01-15",
		amount: 25000,
		type: "expense",
		description: "Bensin motor",
		createdAt: "2025-01-15T10:30:00Z",
	},
	{
		id: 3,
		date: "2025-01-16",
		amount: 15000,
		type: "expense",
		description: "Makan siang",
		createdAt: "2025-01-16T12:00:00Z",
	},
	{
		id: 4,
		date: "2025-01-16",
		amount: 100000,
		type: "income",
		description: "Bonus proyek",
		createdAt: "2025-01-16T14:00:00Z",
	},
];

let nextId = 5;

// API functions untuk manipulasi data
export const financeAPI = {
	// Mendapatkan semua data
	getAll: () => {
		return [...financeData]; // Return copy untuk menghindari mutasi langsung
	},

	// Mendapatkan data berdasarkan ID
	getById: (id) => {
		return financeData.find((item) => item.id === parseInt(id));
	},

	// Menambah data baru
	add: (newData) => {
		const transaction = {
			id: nextId++,
			...newData,
			createdAt: new Date().toISOString(),
		};
		financeData.push(transaction);
		return transaction;
	},

	// Update data
	update: (id, updatedData) => {
		const index = financeData.findIndex((item) => item.id === parseInt(id));
		if (index !== -1) {
			financeData[index] = { ...financeData[index], ...updatedData };
			return financeData[index];
		}
		return null;
	},

	// Hapus data
	delete: (id) => {
		const index = financeData.findIndex((item) => item.id === parseInt(id));
		if (index !== -1) {
			const deleted = financeData.splice(index, 1)[0];
			return deleted;
		}
		return null;
	},

	// Mendapatkan data yang dikelompokkan berdasarkan tanggal
	getGroupedByDate: () => {
		const grouped = {};
		financeData.forEach((item) => {
			if (!grouped[item.date]) {
				grouped[item.date] = [];
			}
			grouped[item.date].push(item);
		});

		// Sort tanggal dari yang terbaru
		const sortedDates = Object.keys(grouped).sort(
			(a, b) => new Date(b) - new Date(a)
		);
		const result = {};
		sortedDates.forEach((date) => {
			result[date] = grouped[date];
		});

		return result;
	},

	// Mendapatkan ringkasan per bulan
	getMonthlySummary: () => {
		const monthly = {};

		financeData.forEach((item) => {
			const monthKey = item.date.substring(0, 7); // YYYY-MM

			if (!monthly[monthKey]) {
				monthly[monthKey] = {
					month: monthKey,
					income: 0,
					expense: 0,
					balance: 0,
				};
			}

			if (item.type === "income") {
				monthly[monthKey].income += item.amount;
			} else {
				monthly[monthKey].expense += item.amount;
			}

			monthly[monthKey].balance =
				monthly[monthKey].income - monthly[monthKey].expense;
		});

		return Object.values(monthly).sort((a, b) =>
			b.month.localeCompare(a.month)
		);
	},
};
