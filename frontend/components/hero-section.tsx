"use client"

import { Scale, MessageSquare, Shield, Globe } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden bg-background">
      {/* Absolute Dark Fade Mask for seamless page transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Antigravity Aurora Fluid Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1, 1.1, 1],
            opacity: [0.3, 0.5, 0.4, 0.6, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[800px] h-[400px] bg-primary/20 blur-[150px] rounded-[100%] opacity-50"
        />
        <motion.div
          animate={{
            rotate: [360, 270, 180, 90, 0],
            scale: [1, 1.3, 1, 1.2, 1],
            x: [0, 100, -50, 0],
            y: [0, 50, -100, 0],
            opacity: [0.2, 0.4, 0.3, 0.5, 0.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[500px] bg-accent/20 blur-[150px] rounded-[100%] opacity-40 mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [-100, 100, -100],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-20">
        <div className="mx-auto text-center flex flex-col items-center">

          {/* Subtle minimal pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-xl px-4 py-1.5 text-xs tracking-widest font-medium uppercase text-muted-foreground hover:border-white/20 hover:text-foreground transition-colors duration-300 cursor-default"
          >
            <Scale className="h-3 w-3" />
            AI-Powered Legal Guidance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="text-balance text-6xl font-medium tracking-tighter sm:text-7xl lg:text-8xl leading-[1.1] text-foreground"
          >
            Know Your Rights. <br className="hidden sm:block" />
            <span className="bg-gradient-to-tr from-primary via-accent to-primary bg-clip-text text-transparent opacity-90">
              Take Action.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-2xl text-pretty text-lg sm:text-xl font-light tracking-wide leading-relaxed text-muted-foreground/80"
          >
            Dastoor Desk translates complex legislation into simple, actionable intelligence.
            Instant guidance for property, cybercrime, and consumer rights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 inline-flex items-center gap-8 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-3xl px-8 py-3 text-sm font-light text-foreground/70"
          >
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
              <MessageSquare className="h-4 w-4" />
              <span>Natural Language Chat</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-default">
              <Shield className="h-4 w-4" />
              <span>Evidence Guidance</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
              <Globe className="h-4 w-4" />
              <span>Multilingual Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
