"use client"

import { motion } from "framer-motion"
import { 
  Shield, 
  Lock, 
  Server, 
  Users, 
  Building2,
  Headphones,
  FileCheck,
  Globe,
  ArrowRight,
  Check,
  Sparkles
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II, ISO 27001, and HIPAA compliant infrastructure with end-to-end encryption and comprehensive audit logging.",
  },
  {
    icon: Lock,
    title: "Data Sovereignty",
    description: "Keep your data in India with our dedicated Indian data centers. Full compliance with DPDP Act and MeitY guidelines.",
  },
  {
    icon: Server,
    title: "Private Deployment",
    description: "Deploy Rivinity in your own VPC or on-premise infrastructure with air-gapped options for sensitive workloads.",
  },
  {
    icon: Users,
    title: "SSO & RBAC",
    description: "Enterprise single sign-on with SAML 2.0 and OIDC, plus granular role-based access control for teams of any size.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 priority support with dedicated customer success manager, technical account manager, and SLA guarantees.",
  },
  {
    icon: FileCheck,
    title: "Custom Contracts",
    description: "Flexible licensing, custom terms, and enterprise procurement support including government vendor registration.",
  },
]

const customers = [
  { name: "Reliance", sector: "Conglomerate" },
  { name: "TATA Group", sector: "Conglomerate" },
  { name: "Infosys", sector: "IT Services" },
  { name: "HDFC Bank", sector: "Banking" },
  { name: "Bharti Airtel", sector: "Telecom" },
  { name: "Wipro", sector: "IT Services" },
  { name: "HCL Tech", sector: "IT Services" },
  { name: "Tech Mahindra", sector: "IT Services" },
]

const useCases = [
  {
    title: "Customer Service AI",
    description: "Deploy intelligent chatbots and voice agents handling millions of customer interactions in 22 Indian languages.",
    stats: "60% cost reduction",
  },
  {
    title: "Document Intelligence",
    description: "Extract, classify, and process documents at scale with OCR, NER, and intelligent summarization.",
    stats: "10x faster processing",
  },
  {
    title: "Code Generation",
    description: "Accelerate software development with AI-powered code generation, review, and documentation.",
    stats: "40% productivity boost",
  },
  {
    title: "Knowledge Management",
    description: "Build enterprise search and knowledge bases that understand context and deliver precise answers.",
    stats: "5x search accuracy",
  },
]

const certifications = [
  { name: "SOC 2 Type II", description: "Security & availability" },
  { name: "ISO 27001", description: "Information security" },
  { name: "HIPAA", description: "Healthcare compliance" },
  { name: "DPDP Act", description: "India data protection" },
  { name: "MeitY Empaneled", description: "Government approved" },
  { name: "PCI DSS", description: "Payment security" },
]

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 text-sm font-medium text-foreground mb-8"
              >
                <Building2 className="w-4 h-4 text-accent" />
                Enterprise Solutions
              </motion.span>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
                AI for{" "}
                <span className="text-gradient">India&apos;s Largest</span>{" "}
                Enterprises
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Trusted by Fortune 500 companies and government organizations. 
                Deploy sovereign AI with enterprise-grade security, compliance, and support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full">
                  Download Security Brief
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              {/* Enterprise customers grid */}
              <div className="grid grid-cols-4 gap-4">
                {customers.map((customer, index) => (
                  <motion.div
                    key={customer.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="aspect-square rounded-2xl bg-card border border-border p-4 flex flex-col items-center justify-center text-center hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg font-bold text-foreground mb-2">
                      {customer.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-foreground">{customer.name}</span>
                    <span className="text-[10px] text-muted-foreground">{customer.sector}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enterprise Features */}
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the security, compliance, and scale requirements of large organizations
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-highlight/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Compliance & Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meeting the highest standards for security and regulatory compliance
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card rounded-xl p-6 border border-border text-center hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-24 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Enterprise Use Cases
            </h2>
            <p className="text-xl text-background/70 max-w-2xl mx-auto">
              How India&apos;s leading companies are transforming with Rivinity
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl p-8 border border-background/10 bg-background/5 hover:bg-background/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                    {useCase.stats}
                  </span>
                </div>
                <p className="text-background/70 leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-accent/10 via-highlight/5 to-accent/10 border border-accent/20 p-12 lg:p-16 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Ready to transform your enterprise?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join India&apos;s leading organizations using Rivinity to build intelligent applications at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full">
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
