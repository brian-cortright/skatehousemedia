"use client";
import React from "react";
import styles from "../privacy-policy/legal.module.css";
import { Headline } from "@/components/Typography/Typography";

const Terms: React.FC = () => {
  return (
    <main className={styles.pageWrapper}>
      <Headline as="h1" margin="0 0 var(--spacing-small_300) 0" variant="5">
        Terms of Service
      </Headline>
      <p className={styles.lastUpdated}>Last updated: March 10, 2026</p>

      <div className={styles.section}>
        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using skatehousemedia.com (the &quot;Site&quot;), you agree to be bound
          by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms,
          please do not use the Site.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Use of the Site</h2>
        <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the Site in any way that violates any applicable law or regulation</li>
          <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
          <li>Use the Site to transmit any malicious code, viruses, or harmful content</li>
          <li>Scrape, crawl, or use automated means to access the Site without our permission</li>
          <li>Interfere with the proper functioning of the Site</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Intellectual Property</h2>
        <p>
          The content on this Site, including text, images, videos, graphics, and logos, is the
          property of SkateHouseMedia or its content creators and is protected by copyright and
          other intellectual property laws. You may not reproduce, distribute, modify, or create
          derivative works from any content on the Site without prior written permission.
        </p>
      </div>

      <div className={styles.section}>
        <h2>User-Submitted Content</h2>
        <p>
          Some content on the Site was originally submitted by community members. If you believe
          any content on the Site infringes on your intellectual property rights, please contact
          us at the email address listed below and we will promptly review and address your
          concern.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Third-Party Content and Links</h2>
        <p>
          The Site may contain embedded content from third-party services (such as YouTube and
          Vimeo) and links to external websites. We are not responsible for the content, privacy
          practices, or availability of these third-party services. Your use of third-party
          content is subject to their respective terms of service.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Disclaimer of Warranties</h2>
        <p>
          The Site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without
          warranties of any kind, either express or implied. We do not warrant that the Site will
          be uninterrupted, error-free, or free of harmful components.
        </p>
        <p>
          Skateboarding is an inherently dangerous activity. Any information, videos, or content
          on this Site is for entertainment and informational purposes only. We do not encourage
          or endorse any dangerous or illegal activity. Always wear proper safety equipment and
          follow local laws.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, SkateHouseMedia shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising from your use
          of the Site, including but not limited to loss of data, revenue, or profits.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Changes to These Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Any changes will be posted on
          this page with an updated &quot;Last updated&quot; date. Your continued use of the Site
          after changes are posted constitutes your acceptance of the revised Terms.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, you can contact us at:{" "}
          <a
            href="mailto:contact@skatehousemedia.com"
            style={{ color: "var(--accent-blue-100)" }}
          >
            contact@skatehousemedia.com
          </a>
        </p>
      </div>
    </main>
  );
};

export default Terms;
