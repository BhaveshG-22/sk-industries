import AdminAuth from '@/components/admin/AdminAuth'
import BlogPostManager from '@/components/admin/BlogPostManager'

export default function BlogPage() {
  return (
    <AdminAuth>
      <BlogPostManager />
    </AdminAuth>
  )
}