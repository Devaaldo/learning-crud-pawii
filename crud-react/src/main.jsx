import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import HomePage from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TravelPlaceAdmin from './pages/travel_place/Admin.jsx'
import TravelPlaceView from './pages/travel_place/View.jsx'
import TravelPlaceAdd from './pages/travel_place/Add.jsx'
import TravelPlaceEdit from './pages/travel_place/Edit.jsx'
import TravelPlaceDelete from './pages/travel_place/Delete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="admin">
            <Route index element={<Dashboard />} />
            <Route path="travel_place">
              <Route index element={<TravelPlaceAdmin />} />
              <Route path=":id" element={<TravelPlaceView />} />
              <Route path="add" element={<TravelPlaceAdd />} />
              <Route path="edit/:id" element={<TravelPlaceEdit />} />
              <Route path="delete/:id" element={<TravelPlaceDelete />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
