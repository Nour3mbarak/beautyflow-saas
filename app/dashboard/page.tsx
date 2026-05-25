export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="bg-white shadow px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">BeautyFlow</h1>
          <div className="flex gap-6">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/dashboard" className="text-blue-600 font-semibold">Dashboard</a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to BeautyFlow</h2>
          <p className="text-gray-600">Manage your salon with ease</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Appointments */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Appointments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
            <p className="text-green-600 text-sm mt-2">+12% from last week</p>
          </div>

          {/* Customers */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Customers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <p className="text-green-600 text-sm mt-2">+8% from last month</p>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">€4,250</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <p className="text-green-600 text-sm mt-2">+23% from last week</p>
          </div>

          {/* Team */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Team Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              </div>
              <div className="text-4xl">🧑‍💼</div>
            </div>
            <p className="text-green-600 text-sm mt-2">All active</p>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Appointments</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Sarah Johnson</td>
                  <td className="py-3 px-4">Hair Cut</td>
                  <td className="py-3 px-4">10:00 AM</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Confirmed</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Emma Davis</td>
                  <td className="py-3 px-4">Makeup</td>
                  <td className="py-3 px-4">11:30 AM</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Confirmed</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">Lisa Wilson</td>
                  <td className="py-3 px-4">Nails</td>
                  <td className="py-3 px-4">2:00 PM</td>
                  <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}