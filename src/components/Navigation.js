import Link from "next/link";
import { ShmLogo } from "./enhancedSvg/svgs";
import { Headline, Subhead } from "./Typography/Typography";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link href="/">
          <ShmLogo customWidth={60} />
          <Headline as='h2' variant="8">The Archive</Headline>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/videos">
           <Subhead as='h3' variant="4">Videos</Subhead>
          </Link>
        </li>
        <li>
          <Link href="/shuffle">
            <Subhead as='h3'variant="4">Shuffle</Subhead>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation