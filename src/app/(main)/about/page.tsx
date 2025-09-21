"use client"

import { useEffect } from 'react'
import { Award, Users, Leaf, Target, CheckCircle, Factory, Shield, Settings, Globe, Heart } from 'lucide-react'

const values = [
  {
    icon: <Award className="w-8 h-8 text-[var(--dark-red)]" />,
    title: "Superior Quality",
    description: "We use high-grade raw materials to ensure durability and safety."
  },
  {
    icon: <Users className="w-8 h-8 text-[var(--dark-red)]" />,
    title: "Customer-Centric Service", 
    description: "We believe in building long-term relationships by offering tailored solutions to meet unique business needs."
  },
  {
    icon: <Leaf className="w-8 h-8 text-[var(--dark-red)]" />,
    title: "Innovation & Sustainability",
    description: "We continually upgrade our processes to deliver products that are not only functional but also environmentally conscious."
  }
]

const highlights = [
  "Premium-quality paper cups, stationery, and industrial goods",
  "Manufacturing unit strategically located in Talawade, Pune",
  "Custom-designed solutions for diverse business needs",
  "Eco-friendly and sustainable product offerings",
  "Serving clients across India with reliable delivery",
  "Strong commitment to quality assurance and precision"
]

const usps = [
  {
    icon: <Leaf className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Sustainable Excellence",
    description: "Leading the way in eco-friendly manufacturing practices"
  },
  {
    icon: <Settings className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Customization Beyond Limits", 
    description: "Tailored solutions to meet your specific requirements"
  },
  {
    icon: <Shield className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Food-Safe Assurance",
    description: "Meeting the highest food safety standards and certifications"
  },
  {
    icon: <Globe className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Global Reach, Local Touch",
    description: "Serving clients nationwide with personalized service"
  },
  {
    icon: <Award className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Commitment to Quality",
    description: "Unwavering dedication to superior product standards"
  },
  {
    icon: <Heart className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Environmental Guardianship",
    description: "Protecting our planet through responsible manufacturing"
  },
  {
    icon: <Users className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Responsive Partnerships",
    description: "Building lasting relationships through exceptional service"
  },
  {
    icon: <Target className="w-6 h-6 text-[var(--dark-red)]" />,
    title: "Future-Forward Innovation",
    description: "Continuously evolving to meet tomorrow's challenges"
  }
]

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us - SK Industries"
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about SK Industries - a trusted manufacturer and trader of premium-quality paper cups, stationery, and industrial goods. Committed to innovation, sustainability, and superior quality.')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--light-gray)] to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--near-black)] mb-6 font-arimo">
              About Us – SK Industries
            </h1>
            <div className="w-24 h-1 bg-[var(--dark-red)] mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-[var(--soft-gray)]/20 mb-12">
              <p className="text-lg text-[var(--gray)] leading-relaxed mb-6">
                At SK Industries, we take pride in being a trusted manufacturer and trader of premium-quality paper cups, stationery, and industrial goods. Established with a vision to combine innovation with sustainability, we specialize in delivering eco-friendly and durable products that meet the needs of both businesses and individuals.
              </p>
              
              <p className="text-lg text-[var(--gray)] leading-relaxed mb-6">
                With our manufacturing unit located in Talawade, Pune, we are strategically positioned to cater to clients across India. Our wide product portfolio includes custom-designed paper cups, disposable products, and stationery items, all crafted with precision and quality assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--near-black)] mb-4">What Sets Us Apart</h2>
            <p className="text-lg text-[var(--gray)] max-w-2xl mx-auto">
              Our commitment to excellence drives everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-b from-[var(--light-gray)] to-white rounded-xl border border-[var(--soft-gray)]/20 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--near-black)] mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--gray)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our USP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--near-black)] mb-4">Our Unique Selling Proposition</h2>
            <p className="text-lg text-[var(--gray)] max-w-2xl mx-auto">
              What makes SK Industries the preferred choice for businesses across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usps.map((usp, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl border border-[var(--soft-gray)]/20 hover:shadow-lg hover:border-[var(--dark-red)]/30 transition-all">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-[var(--light-gray)] rounded-full flex items-center justify-center">
                    {usp.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--near-black)] mb-3">
                  {usp.title}
                </h3>
                <p className="text-sm text-[var(--gray)] leading-relaxed">
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--near-black)] mb-4">Why Choose SK Industries</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-[var(--light-gray)] to-white rounded-lg border border-[var(--soft-gray)]/20 hover:border-[var(--dark-red)]/30 transition-colors">
                  <CheckCircle className="w-5 h-5 text-[var(--dark-red)] mt-1 flex-shrink-0" />
                  <p className="text-[var(--gray)]">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Factory className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-white">Our Promise to You</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-200 leading-relaxed">
              Backed by experience, reliability, and strong values, SK Industries is more than just a manufacturer – we are a partner in your growth. Whether you are a business looking for bulk supply or an individual seeking customized solutions, we are here to serve you with excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Ready to Partner With Us?
            </h2>

            <div className="w-24 h-1 bg-[var(--primary-light)] mx-auto mb-8"></div>

            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Experience the SK Industries difference. Contact us today to discuss your requirements and discover how we can support your business goals.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a
                href="/contact?subject=Partnership Inquiry&message=Hello! I'm interested in learning more about SK Industries and would like to discuss potential partnership opportunities. Please contact me to explore how we can work together."
                className="bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                Get In Touch
              </a>
              <a
                href="/products"
                className="border-3 border-[var(--primary-light)] text-[var(--primary-light)] hover:bg-[var(--primary-light)] hover:text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                View Our Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}