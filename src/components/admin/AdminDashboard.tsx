import { Megaphone, Package, FolderOpen, FileText, Mail, Settings } from 'lucide-react'

const stats = [
  { name: 'Announcements', value: '0', icon: Megaphone, color: 'bg-blue-500' },
  { name: 'Products', value: '0', icon: Package, color: 'bg-green-500' },
  { name: 'Categories', value: '0', icon: FolderOpen, color: 'bg-purple-500' },
  { name: 'Blog Posts', value: '0', icon: FileText, color: 'bg-yellow-500' },
  { name: 'Contact Forms', value: '0', icon: Mail, color: 'bg-red-500' },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your Gavali Group website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-bold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/announcements"
            className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Megaphone className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-blue-900">Create Announcement</h3>
              <p className="text-sm text-blue-600">Add new site announcements</p>
            </div>
          </a>

          <a
            href="/admin/products"
            className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
          >
            <Package className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-green-900">Add Product</h3>
              <p className="text-sm text-green-600">Manage your product catalog</p>
            </div>
          </a>

          <a
            href="/admin/categories"
            className="flex items-center p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            <FolderOpen className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium text-purple-900">Manage Categories</h3>
              <p className="text-sm text-purple-600">Organize products by category</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No recent activity</p>
        </div>
      </div>
    </div>
  )
}