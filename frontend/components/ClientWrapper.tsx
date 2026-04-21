"use client";

import React from "react";
import LogoIntro from "./LogoIntro";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        <LogoIntro>{children}</LogoIntro>
      </ThemeProvider>
    </LanguageProvider>
  );
}
