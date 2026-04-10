"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Scale, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import { EvidencePanel } from "@/components/evidence-panel"
import { DepartmentIcon } from "@/components/department-icon"
import { getDepartmentById } from "@/lib/legal-departments"
import { use } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatPageProps {
  params: Promise<{ departmentId: string }>
}

export default function ChatPage({ params }: ChatPageProps) {
  const { departmentId } = use(params)
  const department = getDepartmentById(departmentId)
  const [showEvidence, setShowEvidence] = useState(false)

  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Department Not Found</h1>
        <Link href="/" className="text-primary hover:underline mt-4">Return Home</Link>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center relative overflow-hidden bg-background px-4">
      {/* Background ambient glow for premium aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[80vw] h-[40vh] bg-primary/10 blur-[150px] rounded-[100%]" />
        <div className="absolute w-[60vw] h-[50vh] bg-accent/10 blur-[150px] rounded-[100%] mix-blend-screen" />
      </div>

      <motion.div 
        layout
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={`relative z-10 flex h-[90vh] w-full gap-5 ${showEvidence ? "max-w-7xl" : "max-w-5xl"}`}
      >
        {/* Main Chat Interface Glass Panel */}
        <motion.div 
          layout
          className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/40 shadow-2xl backdrop-blur-2xl"
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-border/40 bg-transparent px-4 py-3 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild className="hover:bg-black/5 dark:hover:bg-white/10">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back to home</span>
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${department.color} bg-background/50 backdrop-blur-sm shadow-sm`}>
                  <DepartmentIcon name={department.iconName} className="h-4 w-4" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold">{department.name}</h1>
                  <p className="text-xs text-muted-foreground">AI Legal Assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 mr-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
                  <Scale className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="hidden text-sm font-semibold sm:inline bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Dastoor Desk
                </span>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEvidence(!showEvidence)}
                className={`hidden sm:flex gap-2 rounded-xl border-primary/20 hover:bg-primary/10 transition-all ${
                  showEvidence ? "bg-primary/20 border-primary text-primary" : "text-muted-foreground"
                }`}
              >
                <FileCheck className="h-4 w-4" />
                Evidence Guide
              </Button>
            </div>
          </header>

          {/* Chat Interface */}
          <main className="flex-1 overflow-hidden z-10">
            <ChatInterface department={department} />
          </main>
        </motion.div>

        {/* Side-by-Side Evidence Guide */}
        <AnimatePresence mode="popLayout">
          {showEvidence && (
            <motion.div 
              key="evidence-panel"
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="hidden lg:block w-[400px] overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-black/40 shadow-2xl backdrop-blur-2xl"
            >
              <EvidencePanel
                departmentId={department.id}
                isOpen={showEvidence}
                onClose={() => setShowEvidence(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
