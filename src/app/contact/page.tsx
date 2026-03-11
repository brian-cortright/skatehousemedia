"use client";
import React from "react";
import styles from "./contact.module.css";
import { Headline, Subhead, BodyText, Paragraph } from "@/components/Typography/Typography";

const Contact: React.FC = () => {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.columns}>
        <div className={styles.leftColumn}>
          <Headline as="h1" variant="5">
            Contact Us
          </Headline>
          <p>
            We love hearing from the community! Whether you have a question about content on the
            site, spotted a bug or broken link, want to collaborate on a project, or just want to
            say what&apos;s up — drop us a line using the form and we&apos;ll get back to you as
            soon as we can.
          </p>

          <div className={styles.contactSection}>
            <Subhead as="h2" variant="2">Submit Content</Subhead>
            <BodyText variant="5">
              Have a video, photo, or article you&apos;d like to share? Send it to:<br />
              <a href="mailto:contact@skatehousemedia.com">contact@skatehousemedia.com</a>
            </BodyText>
          </div>

          <div className={styles.contactSection}>
            <Subhead as="h2" variant="2">Event Submissions</Subhead>
            <BodyText variant="5">
              Want to add your event to the calendar? Contact us at:<br />
              <a href="mailto:contact@skatehousemedia.com">contact@skatehousemedia.com</a>
            </BodyText>
          </div>

          <div className={styles.responseTime}>
            <Subhead as="h2" variant="2">Response Time</Subhead>
            <BodyText variant="5" color="var(--color-grey-600)">
              We typically respond to inquiries within 24-48 hours. For urgent matters, please
              include &quot;URGENT&quot; in your subject line.
            </BodyText>
          </div>
        </div>

        <div className={styles.formWrapper}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSf068xZZ5bYsdmazqHbsPeJq_9p6HlKBqb3OhZBUkLRMYD8Sw/viewform?embedded=true"
            width="640"
            height="1450"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Contact Form"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </main>
  );
};

export default Contact;
