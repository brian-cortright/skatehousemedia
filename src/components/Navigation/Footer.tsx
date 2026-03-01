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
        {/* ADD LINKS HERE */}
      </div>
      <div className={styles.footerBottom}>
        <BodyText variant="5">© {new Date().getFullYear()} Skatehouse Media. All rights reserved.</BodyText>
      </div>
    </footer>
  )
}

export default Footer
