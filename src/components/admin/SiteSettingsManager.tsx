"use client"

import { useState, useEffect, useCallback } from 'react'
import { Settings, Save, RotateCcw, Globe, Phone, FileText, Type, Building2, ChevronDown, ChevronUp, Package } from 'lucide-react'

interface SiteSetting {
  id: string
  key: string
  value: string
  description: string | null
  category: string | null
  type: string
  createdAt: string
  updatedAt: string
}

interface SettingsGroup {
  [key: string]: SiteSetting[]
}

const defaultSettings = [
  {
    key: 'site_name',
    value: 'SK Industries',
    description: 'The name of your website',
    category: 'general',
    type: 'text'
  },
  {
    key: 'site_description',
    value: 'Quality products for your home and business',
    description: 'Brief description of your website',
    category: 'general',
    type: 'text'
  },
  {
    key: 'site_url',
    value: 'https://sk-industries.com',
    description: 'Your website URL',
    category: 'general',
    type: 'text'
  },
  {
    key: 'contact_email',
    value: 'info@sk-industries.com',
    description: 'Main contact email address',
    category: 'contact',
    type: 'text'
  },
  {
    key: 'contact_phone',
    value: '+1 (555) 123-4567',
    description: 'Main contact phone number',
    category: 'contact',
    type: 'text'
  },
  {
    key: 'contact_address',
    value: 'Gat No 107.108, Near Hotel Pandurang Krupa, Jyotiba Nagar, Talawade, Pune - 411062',
    description: 'Business address',
    category: 'contact',
    type: 'text'
  },
  {
    key: 'meta_title',
    value: 'SK Industries - Quality Products for Home & Business',
    description: 'Default meta title for SEO',
    category: 'seo',
    type: 'text'
  },
  {
    key: 'meta_description',
    value: 'Discover quality personal hygiene, food wrapping, kitchen hygiene, and household cleaning products at SK Industries.',
    description: 'Default meta description for SEO',
    category: 'seo',
    type: 'text'
  },
  {
    key: 'google_analytics',
    value: '',
    description: 'Google Analytics tracking ID',
    category: 'analytics',
    type: 'text'
  },
  {
    key: 'facebook_pixel',
    value: '',
    description: 'Facebook Pixel ID',
    category: 'analytics',
    type: 'text'
  },
  {
    key: 'footer_company_name',
    value: 'SK Industries',
    description: 'Company name displayed in footer',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_company_description',
    value: 'Leading manufacturer of eco-friendly paper products including cups, plates, bowls, and aluminum foil. Committed to quality and sustainability for over a decade.',
    description: 'Company description in footer',
    category: 'footer',
    type: 'textarea'
  },
  {
    key: 'footer_phone',
    value: '+91 98765 43210',
    description: 'Phone number displayed in footer',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_email',
    value: 'info@sk-industries.com',
    description: 'Email address displayed in footer',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_company_full_name',
    value: 'SK Industries',
    description: 'Full company name for address section',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_address_line1',
    value: 'Gat No 107.108, Near Hotel Pandurang Krupa',
    description: 'Address line 1',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_address_line2',
    value: 'Jyotiba Nagar, Talawade',
    description: 'Address line 2',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_city_state_zip',
    value: 'Pune, Maharashtra 411062',
    description: 'City, state and zip code',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_country',
    value: 'India',
    description: 'Country',
    category: 'footer',
    type: 'text'
  },
  {
    key: 'footer_business_hours',
    value: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
    description: 'Business hours (use \\n for line breaks)',
    category: 'footer',
    type: 'textarea'
  },
  // Content Settings
  {
    key: 'hero_main_heading',
    value: 'Get In Touch',
    description: 'Main heading for the contact section',
    category: 'content',
    type: 'text'
  },
  {
    key: 'hero_description',
    value: 'Ready to elevate your business with our premium eco-friendly products? Let\'s start a conversation about your needs and how we can help.',
    description: 'Description text for the contact section',
    category: 'content',
    type: 'textarea'
  },
  {
    key: 'catalog_heading',
    value: 'Our Product Catalog',
    description: 'Main heading for the product catalog section',
    category: 'content',
    type: 'text'
  },
  {
    key: 'catalog_description',
    value: 'Explore our wide range of eco-friendly paper products. Quality products designed for every occasion and serving need.',
    description: 'Description for the product catalog section',
    category: 'content',
    type: 'textarea'
  },
  {
    key: 'cta_heading',
    value: 'Ready to Order?',
    description: 'Call-to-action section heading',
    category: 'content',
    type: 'text'
  },
  {
    key: 'cta_description',
    value: 'Get in touch with us for bulk orders, custom designs, and competitive pricing. We\'re here to help with all your paper product needs.',
    description: 'Call-to-action section description',
    category: 'content',
    type: 'textarea'
  },
  // About Settings
  {
    key: 'about_company_intro',
    value: 'At SK Industries, we take pride in being a trusted manufacturer and trader of premium-quality paper cups, stationery, and industrial goods. Established with a vision to combine innovation with sustainability, we specialize in delivering eco-friendly and durable products that meet the needs of both businesses and individuals.',
    description: 'Company introduction paragraph for About page',
    category: 'about',
    type: 'textarea'
  },
  {
    key: 'about_location_info',
    value: 'With our manufacturing unit located in Talawade, Pune, we are strategically positioned to cater to clients across India. Our wide product portfolio includes custom-designed paper cups, disposable products, and stationery items, all crafted with precision and quality assurance.',
    description: 'Location and capabilities information',
    category: 'about',
    type: 'textarea'
  },
  {
    key: 'about_closing_message',
    value: 'Backed by experience, reliability, and strong values, SK Industries is more than just a manufacturer – we are a partner in your growth. Whether you are a business looking for bulk supply or an individual seeking customized solutions, we are here to serve you with excellence.',
    description: 'Closing message for About page',
    category: 'about',
    type: 'textarea'
  },
  // Company Details
  {
    key: 'company_establishment_year',
    value: '2010',
    description: 'Year the company was established',
    category: 'company',
    type: 'text'
  },
  {
    key: 'company_location',
    value: 'Talawade, Pune, Maharashtra, India',
    description: 'Main company location/manufacturing unit',
    category: 'company',
    type: 'text'
  },
  {
    key: 'company_tagline',
    value: 'Quality products for your home and business',
    description: 'Company tagline or slogan',
    category: 'company',
    type: 'text'
  }
]

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<SettingsGroup>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data: SiteSetting[] = await response.json()
        const grouped = groupSettingsByCategory(data)
        setSettings(grouped)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const toggleSection = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const groupSettingsByCategory = (settings: SiteSetting[]): SettingsGroup => {
    return settings.reduce((groups, setting) => {
      const category = setting.category || 'general'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(setting)
      return groups
    }, {} as SettingsGroup)
  }

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings }
      for (const category in newSettings) {
        newSettings[category] = newSettings[category].map(setting =>
          setting.key === key ? { ...setting, value } : setting
        )
      }
      return newSettings
    })
    setUnsavedChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const allSettings = Object.values(settings).flat()
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: allSettings }),
      })

      if (response.ok) {
        setUnsavedChanges(false)
        await fetchSettings() // Refresh to get updated timestamps
      }
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const initializeDefaultSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: defaultSettings }),
      })

      if (response.ok) {
        await fetchSettings()
      }
    } catch (error) {
      console.error('Error initializing settings:', error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return <Globe className="w-5 h-5 text-[var(--primary-light)]" />
      case 'contact':
        return <Phone className="w-5 h-5 text-[var(--primary-light)]" />
      case 'footer':
        return <FileText className="w-5 h-5 text-[var(--primary-light)]" />
      case 'content':
        return <Type className="w-5 h-5 text-[var(--primary-light)]" />
      case 'about':
        return <FileText className="w-5 h-5 text-[var(--primary-light)]" />
      case 'company':
        return <Building2 className="w-5 h-5 text-[var(--primary-light)]" />
      case 'products':
        return <Package className="w-5 h-5 text-[var(--primary-light)]" />
      case 'seo':
        return <Settings className="w-5 h-5 text-[var(--primary-light)]" />
      case 'analytics':
        return <Settings className="w-5 h-5 text-[var(--primary-light)]" />
      default:
        return <Settings className="w-5 h-5 text-[var(--primary-light)]" />
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'general':
        return 'General Settings'
      case 'contact':
        return 'Contact Information'
      case 'footer':
        return 'Footer Content'
      case 'content':
        return 'Website Content'
      case 'about':
        return 'About Page Content'
      case 'company':
        return 'Company Information'
      case 'products':
        return 'Product Display Settings'
      case 'seo':
        return 'SEO Settings'
      case 'analytics':
        return 'Analytics & Tracking'
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--primary-medium)]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-7 h-7 text-[var(--primary-light)]" />
            Site Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Configure your website settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          {Object.keys(settings).length === 0 && (
            <button
              onClick={initializeDefaultSettings}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Initialize Defaults
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!unsavedChanges || saving}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              unsavedChanges && !saving
                ? 'bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {unsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Unsaved changes:</strong> You have unsaved changes. Click &quot;Save Changes&quot; to apply them.
          </p>
        </div>
      )}

      {Object.keys(settings).length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <div className="text-center text-gray-500">
            <Settings className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No settings found</p>
            <p className="text-sm mb-4">Initialize default settings to get started.</p>
            <button
              onClick={initializeDefaultSettings}
              className="bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Initialize Default Settings
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(settings).map(([category, categorySettings]) => {
            const isExpanded = expandedSections[category]
            
            return (
              <div key={category} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between focus:outline-none focus:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <h2 className="text-lg font-semibold text-left">
                      {getCategoryTitle(category)}
                    </h2>
                    <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      {categorySettings.length} settings
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="p-6 space-y-4 border-t border-gray-200">
                    {categorySettings.map((setting) => (
                      <div key={setting.key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </label>
                        {setting.description && (
                          <p className="text-xs text-gray-500">{setting.description}</p>
                        )}
                        {setting.type === 'text' && (
                          <input
                            type="text"
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
                          />
                        )}
                        {setting.type === 'textarea' && (
                          <textarea
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
                          />
                        )}
                        {setting.type === 'boolean' && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={setting.value === 'true'}
                              onChange={(e) => handleSettingChange(setting.key, e.target.checked ? 'true' : 'false')}
                              className="h-4 w-4 text-[var(--primary-light)] focus:ring-[var(--primary-light)] border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-600">Enable</span>
                          </div>
                        )}
                        {setting.type === 'number' && (
                          <input
                            type="number"
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
                          />
                        )}
                        {setting.type === 'select' && (
                          <select
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
                          >
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}