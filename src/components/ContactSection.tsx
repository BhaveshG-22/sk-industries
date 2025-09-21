"use client"

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[var(--cream-white)] to-[var(--warm-tan)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--burnt-orange)] rounded-full mb-6">
            <Send className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--dark-forest)] mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-[var(--olive-green)] max-w-3xl mx-auto leading-relaxed">
            Ready to elevate your business with our premium eco-friendly products? 
            Let&apos;s start a conversation about your needs and how we can help.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--burnt-orange)] to-[var(--dark-forest)] mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-[var(--warm-tan)]/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--burnt-orange)]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[var(--warm-tan)]/20 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
            
            {isSubmitted ? (
              <div className="text-center py-12 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--dark-forest)] mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="text-lg text-[var(--olive-green)] mb-8 max-w-md mx-auto">
                  Thank you for reaching out! Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-[var(--burnt-orange)] to-[var(--dark-forest)] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[var(--dark-forest)] mb-3">
                    Send us a Message
                  </h3>
                  <p className="text-[var(--olive-green)] text-lg">
                    Fill out the form below and we&apos;ll respond promptly
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-semibold text-[var(--dark-forest)] mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-[var(--warm-tan)]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--burnt-orange)] focus:border-[var(--burnt-orange)] transition-all duration-200 group-hover:border-[var(--warm-tan)] bg-[var(--cream-white)]/50"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-[var(--dark-forest)] mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-[var(--warm-tan)]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--burnt-orange)] focus:border-[var(--burnt-orange)] transition-all duration-200 group-hover:border-[var(--warm-tan)] bg-[var(--cream-white)]/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-semibold text-[var(--dark-forest)] mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-[var(--warm-tan)]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--burnt-orange)] focus:border-[var(--burnt-orange)] transition-all duration-200 group-hover:border-[var(--warm-tan)] bg-[var(--cream-white)]/50"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-semibold text-[var(--dark-forest)] mb-3">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-[var(--warm-tan)]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--burnt-orange)] focus:border-[var(--burnt-orange)] transition-all duration-200 group-hover:border-[var(--warm-tan)] bg-[var(--cream-white)]/50"
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-[var(--dark-forest)] mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-5 py-4 border-2 border-[var(--warm-tan)]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--burnt-orange)] focus:border-[var(--burnt-orange)] transition-all duration-200 group-hover:border-[var(--warm-tan)] bg-[var(--cream-white)]/50 resize-none"
                      placeholder="Tell us about your project needs, quantity requirements, or any questions you have..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative bg-gradient-to-r from-[var(--burnt-orange)] to-[var(--dark-forest)] text-white py-4 px-12 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                        ) : (
                          <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                        )}
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}