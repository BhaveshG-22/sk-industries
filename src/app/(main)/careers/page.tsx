"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scrollToContact } from '@/lib/scroll';
import { 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  TrendingUp, 
  Heart,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';

const jobOpenings = [
  {
    id: 1,
    title: "Production Supervisor",
    department: "Manufacturing",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "3-5 years",
    description: "Lead production teams and ensure quality standards in our aluminum container manufacturing facility.",
    requirements: [
      "Bachelor's degree in Engineering or related field",
      "3+ years of manufacturing supervision experience",
      "Knowledge of quality control processes",
      "Strong leadership and communication skills"
    ]
  },
  {
    id: 2,
    title: "Sales Executive",
    department: "Sales & Marketing",
    location: "Pan India",
    type: "Full-time", 
    experience: "2-4 years",
    description: "Drive sales growth by building relationships with distributors and key accounts across India.",
    requirements: [
      "Bachelor's degree in Business or Marketing",
      "2+ years of B2B sales experience",
      "Excellent communication and negotiation skills",
      "Willingness to travel extensively"
    ]
  },
  {
    id: 3,
    title: "Quality Control Analyst",
    department: "Quality Assurance",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "1-3 years",
    description: "Ensure product quality through rigorous testing and compliance with food safety standards.",
    requirements: [
      "Bachelor's degree in Chemistry or Food Technology",
      "Knowledge of food safety regulations",
      "Attention to detail and analytical skills",
      "Laboratory testing experience preferred"
    ]
  }
];

const benefits = [
  {
    icon: <Award className="w-8 h-8 text-[#BC6C25]" />,
    title: "Competitive Compensation",
    description: "Attractive salary packages with performance-based incentives and annual reviews."
  },
  {
    icon: <Heart className="w-8 h-8 text-[#BC6C25]" />,
    title: "Health & Wellness",
    description: "Comprehensive medical insurance for employees and their families, plus wellness programs."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#BC6C25]" />,
    title: "Career Growth",
    description: "Clear advancement paths with skill development programs and leadership training opportunities."
  },
  {
    icon: <Users className="w-8 h-8 text-[#BC6C25]" />,
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
    document.title = "Careers - Join Our Team | Gavali Group";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join Gavali Group and build your career with a leading manufacturer of premium food packaging solutions. Explore exciting opportunities in manufacturing, sales, and more.');
    }
  }, []);

  const handleApplyNow = () => {
    scrollToContact();
    // You could also implement specific application logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEFAE0] to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#283618] mb-6 font-arimo">
            Build Your Career with Gavali Group
          </h1>
          <p className="text-xl text-[#606C38] max-w-3xl mx-auto mb-8">
            Join our growing team of dedicated professionals in the food packaging industry. 
            We&apos;re committed to creating innovative solutions while building meaningful careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => scrollToContact()}
              size="lg"
              className="bg-[#BC6C25] hover:bg-[#A0571C] text-white px-8 py-3"
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
            <h2 className="text-3xl font-bold text-[#283618] mb-4">Why Choose Gavali Group?</h2>
            <p className="text-lg text-[#606C38] max-w-2xl mx-auto">
              We believe our employees are our greatest asset. Here&apos;s what makes us a great place to work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2 border-[#DDA15E]/20 hover:border-[#BC6C25] transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#283618] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#606C38]">
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
            <h2 className="text-3xl font-bold text-[#283618] mb-4">Current Job Openings</h2>
            <p className="text-lg text-[#606C38]">
              Explore exciting career opportunities across different departments
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="border-2 border-[#DDA15E]/20 hover:border-[#BC6C25] transition-colors">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-[#283618] mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-[#606C38]">
                          <Users className="w-4 h-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1 text-[#606C38]">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-[#606C38]">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <Badge variant="outline" className="border-[#BC6C25] text-[#BC6C25]">
                          {job.experience}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      onClick={handleApplyNow}
                      className="bg-[#BC6C25] hover:bg-[#A0571C] text-white"
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#606C38] mb-4">
                    {job.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-[#283618] mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#606C38]">
                          <CheckCircle className="w-4 h-4 text-[#BC6C25] mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#283618] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values & Culture</h2>
            <p className="text-lg text-[#FEFAE0]/90 max-w-2xl mx-auto">
              At Gavali Group, we&apos;re guided by core values that shape our workplace culture and drive our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((value, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[#FEFAE0]/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-[#BC6C25] mt-1 flex-shrink-0" />
                <p className="text-[#FEFAE0]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#283618] mb-8">Ready to Join Our Team?</h2>
          <div className="bg-gradient-to-r from-[#FEFAE0] to-[#F4F3EE] rounded-2xl p-8">
            <p className="text-lg text-[#606C38] mb-6">
              To apply for any of our open positions, please contact our HR team with your resume and cover letter. 
              We review applications carefully and will reach out to qualified candidates within 5-7 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-[#283618]">
                <Mail className="w-5 h-5" />
                <span>hr@gavaligroup.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#283618]">
                <Phone className="w-5 h-5" />
                <span>+91-XXXX-XXXXXX</span>
              </div>
            </div>
            <div className="mt-6">
              <Button 
                onClick={() => scrollToContact()}
                size="lg"
                className="bg-[#BC6C25] hover:bg-[#A0571C] text-white px-8 py-3"
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