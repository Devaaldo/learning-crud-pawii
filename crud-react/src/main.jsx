import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import HomePage from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FinanceList from "./pages/finance/List.jsx";
import FinanceAdd from "./pages/finance/Add.jsx";
import FinanceEdit from "./pages/finance/Edit.jsx";
import FinanceDelete from "./pages/finance/Delete.jsx";
import FinanceView from "./pages/finance/View.jsx";
import FinanceSummary from "./pages/finance/Summary.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route index element={<HomePage />} />
					<Route path="admin">
						<Route index element={<Dashboard />} />
						<Route path="finance">
							<Route index element={<FinanceList />} />
							<Route path=":id" element={<FinanceView />} />
							<Route path="add" element={<FinanceAdd />} />
							<Route path="edit/:id" element={<FinanceEdit />} />
							<Route path="delete/:id" element={<FinanceDelete />} />
							<Route path="summary" element={<FinanceSummary />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
