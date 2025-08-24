import AdminAuth from '@/components/admin/AdminAuth'
import HeroCarouselManager from '@/components/admin/HeroCarouselManager'

export default function HeroCarouselPage() {
  return (
    <AdminAuth>
      <HeroCarouselManager />
    </AdminAuth>
  )
}