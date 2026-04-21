"use client"

import Link from "next/link"
import { Scale, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/LanguageContext"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  // Prevent hydration mismatch for theme toggle
  useEffect(() => setMounted(true), [])

  const LangToggle = () => (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/40 p-1 text-xs font-semibold">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 transition-all duration-200 ${
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ur")}
        className={`rounded-full px-3 py-1 transition-all duration-200 font-medium ${
          language === "ur"
            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="اردو میں تبدیل کریں"
        style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
      >
        اردو
      </button>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_10px_var(--color-primary)]/50 group-hover:scale-105 transition-transform">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Dastoor Desk
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.home")}
          </Link>
          <Link href="#departments" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.legalAreas")}
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.howItWorks")}
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={t("nav.toggleTheme")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          )}
          <Button size="sm">{t("nav.getStarted")}</Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={t("nav.toggleTheme")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{t("nav.toggleMenu")}</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="#departments"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.legalAreas")}
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.howItWorks")}
            </Link>
            {/* Lang toggle in mobile menu */}
            <div className="px-3 py-2">
              <LangToggle />
            </div>
            <Button size="sm" className="mt-2 w-full">
              {t("nav.getStarted")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
