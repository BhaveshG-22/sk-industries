import AdminAuth from '@/components/admin/AdminAuth'
import AnnouncementManager from '@/components/admin/AnnouncementManager'

export default function AnnouncementsPage() {
  return (
    <AdminAuth>
      <AnnouncementManager />
    </AdminAuth>
  )
}