"use client"

import { useState, useEffect } from 'react'
import { Mail, Trash2, Eye, EyeOff, Phone, User, Calendar, MessageSquare } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export default function ContactFormManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (submissionId: string, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contacts/${submissionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead }),
      })

      if (response.ok) {
        await fetchSubmissions()
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  const handleDelete = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/contacts/${submissionId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchSubmissions()
        if (selectedSubmission?.id === submissionId) {
          setSelectedSubmission(null)
        }
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
    }
  }

  const handleView = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission)
    if (!submission.isRead) {
      await markAsRead(submission.id, true)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === 'read') return submission.isRead
    if (filterStatus === 'unread') return !submission.isRead
    return true
  })

  const unreadCount = submissions.filter(s => !s.isRead).length

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
            <Mail className="w-7 h-7 text-[#BC6C25]" />
            Contact Form Submissions
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage contact form submissions from your website
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-[#BC6C25] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({submissions.length})
          </button>
          <button
            onClick={() => setFilterStatus('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'unread'
                ? 'bg-[#BC6C25] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilterStatus('read')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'read'
                ? 'bg-[#BC6C25] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Read ({submissions.length - unreadCount})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Submissions ({filteredSubmissions.length})</h2>
            </div>
            
            {filteredSubmissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No submissions found</p>
                <p className="text-sm">Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedSubmission?.id === submission.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    } ${!submission.isRead ? 'bg-yellow-50' : ''}`}
                    onClick={() => handleView(submission)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!submission.isRead ? 'font-bold text-gray-900' : 'text-gray-800'}`}>
                            {submission.name}
                          </h3>
                          {!submission.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                        {submission.subject && (
                          <p className="text-sm font-medium text-gray-700 mb-2">{submission.subject}</p>
                        )}
                        <p className="text-sm text-gray-500 line-clamp-2">{submission.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(submission.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(submission.id, !submission.isRead)
                          }}
                          className={`p-1 rounded transition-colors ${
                            submission.isRead 
                              ? 'text-gray-400 hover:text-gray-600' 
                              : 'text-blue-500 hover:text-blue-700'
                          }`}
                          title={submission.isRead ? 'Mark as unread' : 'Mark as read'}
                        >
                          {submission.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(submission.id)
                          }}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Submission Details</h2>
            </div>
            
            {selectedSubmission ? (
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Name</span>
                  </div>
                  <p className="text-gray-900">{selectedSubmission.name}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Email</span>
                  </div>
                  <p className="text-gray-900">
                    <a 
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-[#BC6C25] hover:underline"
                    >
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>

                {selectedSubmission.phone && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Phone</span>
                    </div>
                    <p className="text-gray-900">
                      <a 
                        href={`tel:${selectedSubmission.phone}`}
                        className="text-[#BC6C25] hover:underline"
                      >
                        {selectedSubmission.phone}
                      </a>
                    </p>
                  </div>
                )}

                {selectedSubmission.subject && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Subject</span>
                    </div>
                    <p className="text-gray-900">{selectedSubmission.subject}</p>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Message</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Submitted</span>
                  </div>
                  <p className="text-gray-900">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button
                      onClick={() => markAsRead(selectedSubmission.id, !selectedSubmission.isRead)}
                      className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        selectedSubmission.isRead
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {selectedSubmission.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedSubmission.id)}
                      className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No submission selected</p>
                <p className="text-sm">Click on a submission to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}