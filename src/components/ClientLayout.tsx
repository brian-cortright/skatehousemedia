'use client'
import React from 'react';
import Navigation from "./Navigation/Navigation"
import Footer from "./Navigation/Footer"
import { PopupProvider } from "./Popup/PopupContext"

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <PopupProvider>
      <Navigation />
      {children}
      <Footer />
    </PopupProvider>
  )
}

export default ClientLayout
