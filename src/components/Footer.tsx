import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--burnt-orange)] text-[var(--cream-white)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Address:</p>
                <p className="text-sm leading-relaxed">
                  123 Business Street<br />
                  Commercial District, Mumbai,<br />
                  Maharashtra, 400001
                </p>
              </div>
              
              <div>
                <p className="font-semibold">Phone:</p>
                <p className="text-sm">+91 98765 43210</p>
              </div>
              
              <div>
                <p className="font-semibold">Email:</p>
                <p className="text-sm">info@sk-industries.com</p>
              </div>
            </div>
          </div>


          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Information</h3>
            <div className="space-y-3">
              <Link href="/about" className="block text-sm hover:text-[var(--warm-tan)] transition-colors">
                About us
              </Link>
              <Link href="/careers" className="block text-sm hover:text-[var(--warm-tan)] transition-colors">
                Careers
              </Link>
              <Link href="/terms-conditions" className="block text-sm hover:text-[var(--warm-tan)] transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[var(--cream-white)] text-[var(--dark-forest)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center">
            © Copyright {new Date().getFullYear()} sk-industries
          </p>
        </div>
      </div>
    </footer>
  );
}