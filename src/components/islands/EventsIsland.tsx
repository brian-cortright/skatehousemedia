"use client";
import React from "react";
import AppShell from "@/components/AppShell";
import EventsPage from "@/components/EventsPage/EventsPage";

export default function EventsIsland({ pathname }: { pathname?: string }) {
  return (
    <AppShell pathname={pathname}>
      <EventsPage />
    </AppShell>
  );
}
