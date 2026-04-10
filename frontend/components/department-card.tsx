"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DepartmentIcon } from "@/components/department-icon"
import type { LegalDepartment } from "@/lib/legal-departments"

interface DepartmentCardProps {
  department: LegalDepartment
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/chat/${department.id}`} className="block h-full group">
      <Card className="group relative h-full cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] bg-card/40 backdrop-blur-md border border-white/[0.08] hover:border-primary/40 hover:bg-card/60">
        {/* Subtle spotlight effect behind card content */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen" />
        
        <CardHeader className="relative pb-4 z-10">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-background/50 border border-white/10 shadow-inner group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-500 shadow-[0_0_10px_rgba(var(--primary),0.1)]">
            <DepartmentIcon name={department.iconName} className={`h-5 w-5 text-primary group-hover:text-primary transition-colors`} />
          </div>
          <CardTitle className="flex items-center justify-between text-lg tracking-tight font-medium group-hover:text-primary transition-colors text-foreground">
            {department.name}
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-primary" />
          </CardTitle>
          <CardDescription className="text-sm font-normal text-muted-foreground leading-relaxed mt-2">
            {department.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative pt-0 z-10">
          <div className="space-y-3">
            <div className="h-px w-full bg-gradient-to-r from-border to-transparent" />
            <ul className="space-y-2 mt-2">
              {department.examples.map((example, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-xs font-normal text-muted-foreground/80 group-hover:text-foreground transition-colors"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shadow-[0_0_5px_rgba(var(--primary),0.5)]" />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
