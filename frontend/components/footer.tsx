"use client"

import { Scale } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Scale className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Dastoor Desk</span>
          </div>

          <p className="text-center text-sm text-muted-foreground sm:text-left">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>{t("footer.copyright")}</p>
            <p className="text-center">
              <strong>{t("footer.disclaimerBold")}</strong>{" "}
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
