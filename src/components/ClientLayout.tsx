'use client'
import React from 'react';
import Navigation from "./Navigation"

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default ClientLayout
