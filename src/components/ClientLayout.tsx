'use client'
import React from 'react';
import Navigation from "./Navigation/Navigation"
import Footer from "./Navigation/Footer"

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}

export default ClientLayout
