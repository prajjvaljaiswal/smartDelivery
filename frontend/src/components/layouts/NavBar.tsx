import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  setMobileMenuOpen(false)
  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h2 className="text-xl font-bold text-indigo-600">Smart Delivery</h2>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Orders</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Partners</a>
        </div>

        {/* Mobile Menu Button */}
        {/* <button
          className="md:hidden sd:hidden lg:hidden text-gray-600 hover:text-indigo-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Orders</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Partners</a>
        </div>
      )}
    </nav>
  );
}
