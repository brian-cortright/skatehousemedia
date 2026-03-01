import React from 'react';
import Link from "next/link";
import { MidsLogo, VenomLogo } from "../enhancedSvg/svgs";
import { Subhead, BodyText } from "../Typography/Typography";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footerTop}>
        <div className={styles.sponsorsWrapper}>
          <BodyText className={styles.introParagraph} textAlignment="center" variant="6">
            {`This months site fees are paid for by:`}
          </BodyText>
          <div className={styles.sponsorWrapper}>
            <a className={styles.sponsorLogo} href="http://venomskate.com/">
              <VenomLogo customWidth={130} />
            </a>
            <a className={styles.sponsorLogo} href="https://www.mids4life.com/">
              <MidsLogo customWidth={85} />
            </a>
          </div>
        </div>
        <nav className={styles.footerNav}>
          <ul className={styles.navLinks}>
            <Subhead as='h2' variant="2">Quick Links</Subhead>
            <li>
              <Link href="/">
              <Subhead as='h3' fontWeight="400" variant="4">Blog</Subhead>
              </Link>
            </li>
            <li>
              <Link href="/videos">
              <Subhead as='h3' fontWeight="400" variant="4">Videos</Subhead>
              </Link>
            </li>
            <li>
              <Link href="/events">
                <Subhead as='h3' fontWeight="400" variant="4">Events</Subhead>
              </Link>
            </li>
            <li>
              <Link href="/history">
                <Subhead as='h3' fontWeight="400" variant="4">History</Subhead>
              </Link>
            </li>
          </ul>
          <ul className={styles.navLinks}>
            <Subhead as='h2' variant="2">Browse</Subhead>
            <li>
              <Link href="/shuffle">
              <Subhead as='h3' fontWeight="400" variant="4">Shuffle</Subhead>
              </Link>
            </li>
            <li>
              <Link href="/categories">
              <Subhead as='h3' fontWeight="400" variant="4">Categories</Subhead>
              </Link>
            </li>
            <li>
              <Link href="/tags">
                <Subhead as='h3' fontWeight="400" variant="4">Tags</Subhead>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Subhead as='h3' fontWeight="400" variant="4">Contact</Subhead>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <BodyText variant="5">© {new Date().getFullYear()} Skatehouse Media. All rights reserved.</BodyText>
      </div>
    </footer>
  )
}

export default Footer
