import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/Dashboard"
import Partners from "./pages/Partners"
import Orders from "./pages/Orders"
import Assignments from "./pages/Assignments"

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/assignments" element={<Assignments />} />
          </Routes>
        <Toaster position="top-right" />
      </Router>
  )
}

export default App

