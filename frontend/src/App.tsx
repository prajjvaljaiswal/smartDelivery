// App.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Partners from "./pages/Partners";
import Orders from "./pages/Orders";
import Assignments from "./pages/Assignments";
import Layout from "./components/layouts/Layouts";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Layout>
  );
}