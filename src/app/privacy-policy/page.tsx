"use client";
import React from "react";
import styles from "./legal.module.css";
import { Headline } from "@/components/Typography/Typography";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className={styles.pageWrapper}>
      <Headline as="h1" margin="0 0 var(--spacing-small_300) 0" variant="5">
        Privacy Policy
      </Headline>
      <p className={styles.lastUpdated}>Last updated: March 10, 2026</p>

      <div className={styles.section}>
        <h2>Introduction</h2>
        <p>
          SkateHouseMedia (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website
          skatehousemedia.com (the &quot;Site&quot;). This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our Site.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Usage Data:</strong> Information about how you access and use the Site,
            including your IP address, browser type, operating system, referring URLs, pages
            viewed, and the dates and times of your visits.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and
            similar technologies to collect information about your browsing activity. You can
            control cookies through your browser settings.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate, maintain, and improve the Site</li>
          <li>Analyze usage trends and user preferences</li>
          <li>Display relevant advertisements</li>
          <li>Monitor and prevent fraud or abuse</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Third-Party Services</h2>
        <p>We use the following third-party services that may collect information about you:</p>
        <ul>
          <li>
            <strong>Google Analytics:</strong> We use Google Analytics to analyze website traffic.
            Google Analytics uses cookies to collect anonymous usage data. For more information,
            visit{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-blue-100)" }}
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google AdSense:</strong> We use Google AdSense to display advertisements.
            AdSense may use cookies and web beacons to serve ads based on your prior visits to
            this or other websites. You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-blue-100)" }}
            >
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            <strong>Embedded Content:</strong> Some pages embed videos from YouTube and Vimeo.
            These services may collect data about you when you interact with the embedded content.
            Please refer to their respective privacy policies.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Data Retention</h2>
        <p>
          We retain usage data for as long as necessary to fulfill the purposes outlined in this
          policy. Analytics data is retained according to the default retention settings of our
          third-party analytics providers.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Object to or restrict the processing of your personal data</li>
          <li>Opt out of personalized advertising</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the email address listed below.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Children&apos;s Privacy</h2>
        <p>
          The Site is not directed at children under the age of 13. We do not knowingly collect
          personal information from children under 13. If you believe we have collected
          information from a child under 13, please contact us so we can take appropriate action.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated &quot;Last updated&quot; date. We encourage you to review this policy
          periodically.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at:{" "}
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

export default PrivacyPolicy;
