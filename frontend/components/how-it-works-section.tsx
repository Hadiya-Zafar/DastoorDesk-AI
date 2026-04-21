"use client"

import { MessageSquare, Brain, FileText, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

export function HowItWorksSection() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: MessageSquare,
      titleKey: "hiw.step1.title" as const,
      descKey:  "hiw.step1.desc"  as const,
    },
    {
      icon: Brain,
      titleKey: "hiw.step2.title" as const,
      descKey:  "hiw.step2.desc"  as const,
    },
    {
      icon: FileText,
      titleKey: "hiw.step3.title" as const,
      descKey:  "hiw.step3.desc"  as const,
    },
    {
      icon: CheckCircle,
      titleKey: "hiw.step4.title" as const,
      descKey:  "hiw.step4.desc"  as const,
    },
  ]

  return (
    <section id="how-it-works" className="relative border-t border-border/40 bg-transparent py-24 sm:py-32 overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tighter sm:text-5xl text-foreground">
            {t("hiw.heading")}
          </h2>
        </div>

        <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="relative text-center group"
              >
                {/* Animated connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-6 hidden h-[1px] w-full lg:block overflow-hidden bg-white/5">
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "circOut" }}
                      className="w-full h-full bg-gradient-to-r from-primary via-accent to-transparent shadow-lg shadow-primary/30"
                    />
                  </div>
                )}

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  className="relative mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-card/40 border border-white/10 text-primary shadow-lg shadow-primary/30 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/50 transition-all duration-500"
                >
                  <Icon className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest shadow-lg shadow-primary/60">
                    0{index + 1}
                  </span>
                </motion.div>

                <h3 className="mb-3 text-lg font-medium tracking-tight text-foreground">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  {t(step.descKey)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
