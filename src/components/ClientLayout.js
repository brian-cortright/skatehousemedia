'use client'
import Navigation from "./Navigation"

const ClientLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default ClientLayout