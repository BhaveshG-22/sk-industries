import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface FooterSettings {
  footer_company_name: string;
  footer_company_description: string;
  footer_phone: string;
  footer_email: string;
  footer_company_full_name: string;
  footer_address_line1: string;
  footer_address_line2: string;
  footer_city_state_zip: string;
  footer_country: string;
  footer_business_hours: string;
}

async function getFooterSettings(): Promise<FooterSettings> {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          in: [
            'footer_company_name',
            'footer_company_description', 
            'footer_phone',
            'footer_email',
            'footer_company_full_name',
            'footer_address_line1',
            'footer_address_line2',
            'footer_city_state_zip',
            'footer_country',
            'footer_business_hours'
          ]
        }
      }
    });

    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key as keyof FooterSettings] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    // Return with fallback values
    return {
      footer_company_name: settingsMap.footer_company_name || 'SK Industries',
      footer_company_description: settingsMap.footer_company_description || 'Leading manufacturer of eco-friendly paper products including cups, plates, bowls, and aluminum foil. Committed to quality and sustainability for over a decade.',
      footer_phone: settingsMap.footer_phone || '+91 98765 43210',
      footer_email: settingsMap.footer_email || 'info@sk-industries.com',
      footer_company_full_name: settingsMap.footer_company_full_name || 'SK Industries',
      footer_address_line1: settingsMap.footer_address_line1 || '123 Business Street',
      footer_address_line2: settingsMap.footer_address_line2 || 'Commercial District',
      footer_city_state_zip: settingsMap.footer_city_state_zip || 'Mumbai, Maharashtra 400001',
      footer_country: settingsMap.footer_country || 'India',
      footer_business_hours: settingsMap.footer_business_hours || 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed'
    };
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    // Return fallback values
    return {
      footer_company_name: 'SK Industries',
      footer_company_description: 'Leading manufacturer of eco-friendly paper products including cups, plates, bowls, and aluminum foil. Committed to quality and sustainability for over a decade.',
      footer_phone: '+91 98765 43210',
      footer_email: 'info@sk-industries.com',
      footer_company_full_name: 'SK Industries',
      footer_address_line1: '123 Business Street',
      footer_address_line2: 'Commercial District',
      footer_city_state_zip: 'Mumbai, Maharashtra 400001',
      footer_country: 'India',
      footer_business_hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed'
    };
  }
}

export default async function Footer() {
  const footerSettings = await getFooterSettings();
  return (
    <footer className="bg-[var(--primary-light)] text-[var(--accent-cream)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{footerSettings.footer_company_name}</h3>
            <p className="text-sm leading-relaxed mb-4">
              {footerSettings.footer_company_description}
            </p>
            <div className="space-y-2">
              <div>
                <p className="font-semibold text-sm">Phone:</p>
                <p className="text-sm">{footerSettings.footer_phone}</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Email:</p>
                <p className="text-sm">{footerSettings.footer_email}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-sm hover:text-[var(--accent-cream)] transition-colors">
                Home
              </Link>
              <Link href="/products" className="block text-sm hover:text-[var(--accent-cream)] transition-colors">
                Products
              </Link>
              <Link href="/about" className="block text-sm hover:text-[var(--accent-cream)] transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-sm hover:text-[var(--accent-cream)] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Our Address */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Address</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm leading-relaxed">
                  {footerSettings.footer_company_full_name}<br />
                  {footerSettings.footer_address_line1}<br />
                  {footerSettings.footer_address_line2}<br />
                  {footerSettings.footer_city_state_zip}<br />
                  {footerSettings.footer_country}
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm mb-2">Business Hours:</p>
                <p className="text-sm leading-relaxed">
                  {footerSettings.footer_business_hours.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < footerSettings.footer_business_hours.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--accent-cream)]"></div>

      {/* Copyright */}
      <div className="bg-[var(--cream-white)] text-[var(--dark-forest)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center">
            © Copyright {new Date().getFullYear()} {footerSettings.footer_company_full_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}