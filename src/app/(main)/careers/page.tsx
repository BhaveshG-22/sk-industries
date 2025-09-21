"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scrollToContact } from '@/lib/scroll';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Heart,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';

const benefits = [
  {
    icon: <Award className="w-8 h-8 text-[var(--primary-light)]" />,
    title: "Competitive Compensation",
    description: "Attractive salary packages with performance-based incentives and annual reviews."
  },
  {
    icon: <Heart className="w-8 h-8 text-[var(--primary-light)]" />,
    title: "Health & Wellness",
    description: "Comprehensive medical insurance for employees and their families, plus wellness programs."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[var(--primary-light)]" />,
    title: "Career Growth",
    description: "Clear advancement paths with skill development programs and leadership training opportunities."
  },
  {
    icon: <Users className="w-8 h-8 text-[var(--primary-light)]" />,
    title: "Team Environment",
    description: "Collaborative work culture that values innovation, teamwork, and employee contributions."
  }
];

const companyValues = [
  "Quality Excellence in every product we manufacture",
  "Innovation in packaging solutions and manufacturing processes", 
  "Sustainability and environmental responsibility",
  "Employee development and career advancement",
  "Customer satisfaction and reliable partnerships",
  "Safety-first approach in all operations"
];

export default function CareersPage() {
  useEffect(() => {
    // Set document title and meta description for SEO
    document.title = "Careers - Join Our Team | SK Industries";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join SK Industries and build your career with a leading manufacturer of premium food packaging solutions. Explore exciting opportunities in manufacturing, sales, and more.');
    }
  }, []);

  const handleApplyNow = () => {
    scrollToContact();
    // You could also implement specific application logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--accent-cream)] to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-dark)] mb-6 font-arimo">
            Build Your Career with SK Industries
          </h1>
          <p className="text-xl text-[var(--primary-medium)] max-w-3xl mx-auto mb-8">
            Join our growing team of dedicated professionals in the food packaging industry. 
            We&apos;re committed to creating innovative solutions while building meaningful careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToContact()}
              size="lg"
              className="bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white px-8 py-3"
            >
              Contact HR Team
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-4">Why Choose SK Industries?</h2>
            <p className="text-lg text-[var(--primary-medium)] max-w-2xl mx-auto">
              We believe our employees are our greatest asset. Here&apos;s what makes us a great place to work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 border-[var(--primary-light)]/20 hover:border-[var(--primary-light)] transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--primary-medium)]">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-4">Career Opportunities</h2>
            <p className="text-lg text-[var(--primary-medium)]">
              Join our growing team and explore exciting opportunities across different departments
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-[var(--primary-light)]/20 bg-gradient-to-r from-[var(--accent-cream)] to-[#F4F3EE]">
              <CardContent className="pt-8 text-center">
                <Users className="w-16 h-16 text-[var(--primary-light)] mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[var(--primary-dark)] mb-4">
                  We&apos;re Always Looking for Talented Professionals
                </h3>
                <p className="text-lg text-[var(--primary-medium)] mb-6 max-w-2xl mx-auto">
                  While we don&apos;t have specific openings listed at the moment, we&apos;re constantly growing 
                  and are interested in connecting with passionate individuals across various departments including 
                  Manufacturing, Sales & Marketing, Quality Assurance, and Administration.
                </p>
                <div className="space-y-4">
                  <p className="text-[var(--primary-medium)]">
                    <strong>Common roles we recruit for:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="border-[var(--primary-light)] text-[var(--primary-light)]">Production Supervisor</Badge>
                    <Badge variant="outline" className="border-[var(--primary-light)] text-[var(--primary-light)]">Sales Executive</Badge>
                    <Badge variant="outline" className="border-[var(--primary-light)] text-[var(--primary-light)]">Quality Control Analyst</Badge>
                    <Badge variant="outline" className="border-[var(--primary-light)] text-[var(--primary-light)]">Machine Operator</Badge>
                    <Badge variant="outline" className="border-[var(--primary-light)] text-[var(--primary-light)]">Marketing Specialist</Badge>
                    <Badge variant="outline" className="border-[var(--primary-light)] text-[var(--primary-light)]">Admin Assistant</Badge>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-[var(--primary-medium)] mb-4">
                    Submit your details in the contact form with the subject &quot;careers&quot; to get in touch with our HR team.
                  </p>
                  <Button 
                    onClick={handleApplyNow}
                    size="lg"
                    className="bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white px-8 py-3"
                  >
                    Contact Us About Careers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--primary-dark)] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values & Culture</h2>
            <p className="text-lg text-[var(--accent-cream)]/90 max-w-2xl mx-auto">
              At SK Industries, we&apos;re guided by core values that shape our workplace culture and drive our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((value, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[var(--accent-cream)]/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[var(--primary-light)] mt-1 flex-shrink-0" />
                <p className="text-[var(--accent-cream)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-8">Ready to Join Our Team?</h2>
          <div className="bg-gradient-to-r from-[var(--accent-cream)] to-[#F4F3EE] rounded-2xl p-8">
            <p className="text-lg text-[var(--primary-medium)] mb-6">
              To apply for any of our open positions, please contact our HR team with your resume and cover letter. 
              We review applications carefully and will reach out to qualified candidates within 5-7 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-[var(--primary-dark)]">
                <Mail className="w-5 h-5" />
                <span>hr@sk-industries.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--primary-dark)]">
                <Phone className="w-5 h-5" />
                <span>+91-XXXX-XXXXXX</span>
              </div>
            </div>
            <div className="mt-6">
              <Button 
                onClick={() => scrollToContact()}
                size="lg"
                className="bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] text-white px-8 py-3"
              >
                Contact Us About Careers
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}