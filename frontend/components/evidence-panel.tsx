"use client"

import { useState } from "react"
import { FileCheck, ChevronDown, ChevronUp, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { EvidenceIcon } from "@/components/evidence-icon"
import { getEvidenceByDepartment, type EvidenceType } from "@/lib/evidence-guidance"
import { useLanguage } from "@/context/LanguageContext"

interface EvidencePanelProps {
  departmentId: string
  isOpen: boolean
  onClose: () => void
}

function EvidenceTypeCard({ evidence }: { evidence: EvidenceType }) {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const name = language === "ur" ? evidence.nameUr : evidence.name
  const description = language === "ur" ? evidence.descriptionUr : evidence.description
  const tips = language === "ur" ? evidence.tipsUr : evidence.tips

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-3 text-start transition-colors hover:bg-muted">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <EvidenceIcon name={evidence.iconName} className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ms-2" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ms-2" />
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="mt-2 space-y-1.5 ps-12 pe-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
              {tip}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function EvidencePanel({ departmentId, isOpen, onClose }: EvidencePanelProps) {
  const evidence = getEvidenceByDepartment(departmentId)
  const { t, language } = useLanguage()

  if (!isOpen || !evidence) return null

  const title = language === "ur" ? evidence.titleUr : evidence.title
  const description = language === "ur" ? evidence.descriptionUr : evidence.description
  const importantNotes = language === "ur" ? evidence.importantNotesUr : evidence.importantNotes

  return (
    <div 
      className={`relative z-20 h-full w-[380px] sm:w-[400px] border-x border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-2xl animate-in duration-500 ease-out ${
        language === "ur" ? "slide-in-from-left" : "slide-in-from-right"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold">{t("chat.evidenceGuide")}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} title={t("chat.closePanel")}>
            <X className="h-4 w-4" />
            <span className="sr-only">{t("chat.closePanel")}</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <Card className="mb-6 border-primary/20 bg-primary/5 shadow-none pb-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-primary">{title}</CardTitle>
              <CardDescription className="text-xs leading-relaxed opacity-80">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 px-1">
              {t("chat.evidenceTypes")}
            </h3>
            {evidence.evidenceTypes.map((type) => (
              <EvidenceTypeCard key={type.id} evidence={type} />
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-col gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center gap-2 text-accent">
                <AlertTriangle className="h-4 w-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">{t("chat.importantNotes")}</h4>
              </div>
              <ul className="space-y-2">
                {importantNotes.map((note, index) => (
                  <li key={index} className="text-xs text-muted-foreground/80 flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
