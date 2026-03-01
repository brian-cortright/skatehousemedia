import React from 'react';
import Link from "next/link";
import { ShmLogo } from "../enhancedSvg/svgs";
import { Subhead } from "../Typography/Typography";
import styles from "./Navigation.module.css";
import { usePathname } from "next/navigation";

const Navigation: React.FC = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <ShmLogo customWidth={60} />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link href="/">
           <Subhead as='h3' variant="4">Blog</Subhead>
          </Link>
        </li>
        <li className={pathname === "/videos" ? styles.active : ""}>
          <Link href="/videos">
           <Subhead as='h3' variant="4">Videos</Subhead>
          </Link>
        </li>
        <li className={pathname === "/shuffle" ? styles.active : ""}>
          <Link href="/shuffle">
            <Subhead as='h3'variant="4">Shuffle</Subhead>
          </Link>
        </li>
        <li className={pathname === "/events" ? styles.active : ""}>
          <Link href="/events">
            <Subhead as='h3'variant="4">Events</Subhead>
          </Link>
        </li>
        <li className={pathname === "/history" ? styles.active : ""}>
          <Link href="/history">
            <Subhead as='h3'variant="4">History</Subhead>
          </Link>
        </li>
        <li className={pathname === "/contact" ? styles.active : ""}>
          <Link href="/contact">
            <Subhead as='h3'variant="4">Contact</Subhead>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
