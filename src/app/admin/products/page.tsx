import AdminAuth from '@/components/admin/AdminAuth'
import ProductManager from '@/components/admin/ProductManager'

export default function ProductsPage() {
  return (
    <AdminAuth>
      <ProductManager />
    </AdminAuth>
  )
}