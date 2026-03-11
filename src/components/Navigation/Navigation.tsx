"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { ShmLogo, MenuIcon, CloseIcon } from "../enhancedSvg/svgs";
import { Subhead } from "../Typography/Typography";
import styles from "./Navigation.module.css";
import { usePathname } from "next/navigation";

const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Blog", path: "/" },
    { name: "Videos", path: "/videos" },
    { name: "Shuffle", path: "/shuffle" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link href="/" onClick={closeMobileMenu}>
          <ShmLogo customWidth={60} />
        </Link>
      </div>

      <button 
        className={styles.mobileMenuToggle} 
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <MenuIcon fill="var(--color-grey-800)" />
      </button>

      {/* Desktop Navigation */}
      <ul className={styles.navLinks}>
        {navItems.map((item) => (
          <li key={item.path} className={pathname === item.path ? styles.active : ""}>
            <Link href={item.path}>
              <Subhead as="h3" variant="4">{item.name}</Subhead>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileNavOverlay}>
          <div className={styles.mobileNavHeader}>
            <Link href="/" onClick={closeMobileMenu}>
              <ShmLogo customWidth={60} />
            </Link>
            <button 
              className={styles.mobileCloseButton} 
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <CloseIcon fill="var(--color-grey-800)" size='large'/>
            </button>
          </div>
          <ul className={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <li key={`mobile-${item.path}`} className={pathname === item.path ? styles.active : ""}>
                <Link href={item.path} onClick={closeMobileMenu}>
                  <Subhead as="h3" variant="3">{item.name}</Subhead>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation
