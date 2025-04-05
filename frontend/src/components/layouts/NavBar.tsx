
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h2 className="text-xl font-bold text-indigo-600">Smart Delivery</h2>

        {/* Navigation Links (Only show on md and up) */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Orders</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Partners</a>
        </div>
      </div>
    </nav>
  );
}
