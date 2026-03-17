"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Server, FileCheck } from "lucide-react"

const certifications = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    description: "Enterprise security certified"
  },
  {
    icon: Lock,
    title: "ISO 27001",
    description: "Information security management"
  },
  {
    icon: Server,
    title: "India Data Residency",
    description: "Data stays within Bharat"
  },
  {
    icon: FileCheck,
    title: "MeitY Compliant",
    description: "Government standards certified"
  }
]

export function SecuritySection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-balance">
            Enterprise-grade Security.
            <br />
            Built in from Day One.
          </h2>
        </motion.div>

        <div 
          className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16"
          style={{ transform: "translateZ(0)" }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-secondary to-muted border border-border flex items-center justify-center mb-4 group-hover:border-accent/50 transition-colors duration-300">
                <cert.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground/70 group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-foreground">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-8">
            Built to run anywhere your business runs
          </h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: "Rivinity Cloud", desc: "Fully managed AI infrastructure" },
              { name: "Private Cloud (VPC)", desc: "Your security perimeter, our scale" },
              { name: "On-Premise", desc: "Full control, air-gapped if needed" }
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-highlight/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{option.name}</p>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
