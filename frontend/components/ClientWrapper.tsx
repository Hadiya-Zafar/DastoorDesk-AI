"use client";

import React from "react";
import LogoIntro from "./LogoIntro";
import { ThemeProvider } from "next-themes";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <LogoIntro>{children}</LogoIntro>
    </ThemeProvider>
  );
}
