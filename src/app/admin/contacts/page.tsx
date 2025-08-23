import AdminAuth from '@/components/admin/AdminAuth'
import ContactFormManager from '@/components/admin/ContactFormManager'

export default function ContactsPage() {
  return (
    <AdminAuth>
      <ContactFormManager />
    </AdminAuth>
  )
}