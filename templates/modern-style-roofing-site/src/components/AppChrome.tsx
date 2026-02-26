"use client";

import React from "react";

import { Header } from "../sections/Header";
import { useLead } from "./LeadProvider";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const { pathname, site } = useLead();
  const hideChrome =
    pathname === "/" && Boolean(site.previewSection) && site.previewSection !== "brand";

  return (
    <>
      {!hideChrome ? <Header /> : null}
      {children}
    </>
  );
}

