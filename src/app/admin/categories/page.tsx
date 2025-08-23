import AdminAuth from '@/components/admin/AdminAuth'
import CategoryManager from '@/components/admin/CategoryManager'

export default function CategoriesPage() {
  return (
    <AdminAuth>
      <CategoryManager />
    </AdminAuth>
  )
}