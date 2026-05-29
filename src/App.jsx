import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Packages from './pages/Packages'
import CustomPackages from './pages/CustomPackages'
import Bookings from './pages/Bookings'
import Hotels from './pages/Hotels'
import Cars from './pages/Cars'
import HotelPartners from './pages/HotelPartners'
import CarPartners from './pages/CarPartners'
import Users from './pages/Users'
import Reviews from './pages/Reviews'
import ContactMessages from './pages/ContactMessages'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="custom-packages" element={<CustomPackages />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="cars" element={<Cars />} />
          <Route path="hotel-partners" element={<HotelPartners />} />
          <Route path="car-partners" element={<CarPartners />} />
          <Route path="users" element={<Users />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contact-messages" element={<ContactMessages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
