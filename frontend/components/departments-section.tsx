"use client"

import { motion } from "framer-motion"
import { DepartmentCard } from "@/components/department-card"
import { legalDepartments } from "@/lib/legal-departments"
import { useLanguage } from "@/context/LanguageContext"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export function DepartmentsSection() {
  const { t } = useLanguage()

  return (
    <section id="departments" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("dept.heading")}
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            {t("dept.subtext")}
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {legalDepartments.map((department) => (
            <motion.div key={department.id} variants={item} className="h-full">
              <DepartmentCard department={department} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
