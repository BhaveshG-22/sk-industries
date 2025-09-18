"use client"

import { useState, useEffect, useCallback } from 'react'
import { Settings, Save, RotateCcw, Globe, Phone } from 'lucide-react'

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
    value: 'Gavali Group',
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
    value: '123 Business Street, City, State 12345',
    description: 'Business address',
    category: 'contact',
    type: 'text'
  },
  {
    key: 'meta_title',
    value: 'Gavali Group - Quality Products for Home & Business',
    description: 'Default meta title for SEO',
    category: 'seo',
    type: 'text'
  },
  {
    key: 'meta_description',
    value: 'Discover quality personal hygiene, food wrapping, kitchen hygiene, and household cleaning products at Gavali Group.',
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
  }
]

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<SettingsGroup>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

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
        return <Globe className="w-5 h-5 text-[#BC6C25]" />
      case 'contact':
        return <Phone className="w-5 h-5 text-[#BC6C25]" />
      case 'seo':
        return <Settings className="w-5 h-5 text-[#BC6C25]" />
      case 'analytics':
        return <Settings className="w-5 h-5 text-[#BC6C25]" />
      default:
        return <Settings className="w-5 h-5 text-[#BC6C25]" />
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'general':
        return 'General Settings'
      case 'contact':
        return 'Contact Information'
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#BC6C25]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-7 h-7 text-[#BC6C25]" />
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
                ? 'bg-[#BC6C25] hover:bg-[#A0561F] text-white'
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
              className="bg-[#BC6C25] hover:bg-[#A0561F] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Initialize Default Settings
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(settings).map(([category, categorySettings]) => (
            <div key={category} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {getCategoryTitle(category)}
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC6C25] focus:border-transparent"
                      />
                    )}
                    {setting.type === 'textarea' && (
                      <textarea
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC6C25] focus:border-transparent"
                      />
                    )}
                    {setting.type === 'boolean' && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setting.value === 'true'}
                          onChange={(e) => handleSettingChange(setting.key, e.target.checked ? 'true' : 'false')}
                          className="h-4 w-4 text-[#BC6C25] focus:ring-[#BC6C25] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Enable</span>
                      </div>
                    )}
                    {setting.type === 'number' && (
                      <input
                        type="number"
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BC6C25] focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}