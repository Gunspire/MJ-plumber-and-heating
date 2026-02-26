"use client";

import React from "react";

import { AppChrome } from "./AppChrome";

export function LeadFrame({
  initialQueryString,
  children,
}: {
  initialQueryString?: string;
  children: React.ReactNode;
}) {
  return (
    <AppChrome>{children}</AppChrome>
  );
}

