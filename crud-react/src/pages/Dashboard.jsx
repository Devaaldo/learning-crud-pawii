import { NavLink } from "react-router";

function Dashboard() {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<h1 className="mb-4">Dashboard Admin</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-md-6 col-lg-4 mb-3">
					<div className="card h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Kelola Transaksi</h5>
							<p className="card-text">
								Lihat, tambah, edit, dan hapus transaksi keuangan
							</p>
							<NavLink to="finance" className="btn btn-primary">
								Buka Transaksi
							</NavLink>
						</div>
					</div>
				</div>

				<div className="col-md-6 col-lg-4 mb-3">
					<div className="card h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Ringkasan Bulanan</h5>
							<p className="card-text">
								Lihat laporan pemasukan dan pengeluaran per bulan
							</p>
							<NavLink to="finance/summary" className="btn btn-primary">
								Lihat Ringkasan
							</NavLink>
						</div>
					</div>
				</div>

				<div className="col-md-6 col-lg-4 mb-3">
					<div className="card h-100">
						<div className="card-body text-center">
							<h5 className="card-title">Tambah Cepat</h5>
							<p className="card-text">Tambah transaksi baru dengan cepat</p>
							<NavLink to="finance/add" className="btn btn-primary">
								Tambah Transaksi
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
