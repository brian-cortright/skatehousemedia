"use client";
import React from "react";
import Navigation from "./Navigation/Navigation";
import Footer from "./Navigation/Footer";
import { PopupProvider } from "./Popup/PopupContext";

interface AppShellProps {
  children: React.ReactNode;
  pathname?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, pathname }) => {
  return (
    <PopupProvider>
      <Navigation pathname={pathname} />
      {children}
      <Footer />
    </PopupProvider>
  );
};

export default AppShell;
