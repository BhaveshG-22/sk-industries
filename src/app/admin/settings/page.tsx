import AdminAuth from '@/components/admin/AdminAuth'
import SiteSettingsManager from '@/components/admin/SiteSettingsManager'

export default function SettingsPage() {
  return (
    <AdminAuth>
      <SiteSettingsManager />
    </AdminAuth>
  )
}