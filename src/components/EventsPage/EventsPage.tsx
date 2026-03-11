"use client";

import React, { useState, useMemo } from "react";
import styles from "./EventsPage.module.css";
import { Headline, BodyText } from "@/components/Typography/Typography";
import Button from "@/components/Button/Button";
import Popup from "@/components/Popup/Popup";
import RegionBadge from "@/components/RegionBadge/RegionBadge";
import { events } from "../../../data/events";
import { 
  FilterIcon, 
  AddIcon, 
  GridViewIcon, 
  ViewListIcon, 
  EventIcon, 
  PlaceIcon, 
  LinkOutIcon 
} from "@/components/enhancedSvg/svgs";

type ViewMode = "grid" | "list";

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const regions = useMemo(() => {
    const uniqueRegions = new Set(events.map(e => e.region));
    return Array.from(uniqueRegions).sort();
  }, []);

  const filteredEvents = useMemo(() => {
    let result = [...events];
    if (selectedRegion) {
      result = result.filter(e => e.region === selectedRegion);
    }
    return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedRegion]);

  const formatDate = (dateStr: string, endDateStr?: string) => {
    const d = new Date(dateStr);
    
    // Quick hack for formatting since timezone bugs can shift dates. 
    // Using UTC to avoid local timezone shifting the date back one day.
    const month = d.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
    const day = d.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" });
    const year = d.toLocaleDateString("en-US", { year: "numeric", timeZone: "UTC" });
    
    if (endDateStr && endDateStr !== dateStr) {
      const endD = new Date(endDateStr);
      const endDay = endD.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" });
      const endMonth = endD.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
      
      if (month === endMonth) {
        return `${month} ${day}-${endDay}, ${year}`;
      } else {
        return `${month} ${day}-${endMonth} ${endDay}, ${year}`;
      }
    }
    
    return `${month} ${day}, ${year}`;
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerText}>
          <Headline as="h1" variant="4">Event Calendar</Headline>
          <BodyText variant="5" className={styles.subhead}>
            Upcoming skateboarding events, competitions, and community meetups
          </BodyText>
        </div>
        
        <div className={styles.headerActions}>
           <Button handleClick={() => setIsPopupOpen(true)} className={styles.submitButtonContent}>
             <AddIcon fill="var(--color-shm-black)" size="small" />
             <BodyText variant="5">Submit Your Event</BodyText>
           </Button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <FilterIcon fill="var(--color-grey-700)" size="small" />
          <BodyText variant="5">Filter by Region</BodyText>
        </div>
        <div className={styles.filterButtons}>
          {regions.map(region => (
            <Button
              key={region}
              className={`${styles.filterButton}`}
              handleClick={() => setSelectedRegion(region)}
              variant={selectedRegion === region ? "solid" : "outline"}
            >
              {region}
            </Button>
          ))}
          <Button
            className={`${styles.filterButton}`}
            handleClick={() => setSelectedRegion(null)}
            variant={selectedRegion ? "outline" : "solid"}
          >
            All Regions
          </Button>
          
          <div style={{ flexGrow: 1 }} />
          
          <div className={styles.viewToggles}>
            <Button 
              className={`${styles.viewToggle}`}
              handleClick={() => setViewMode("grid")}
              aria-label="Grid view"
              variant={viewMode === "grid" ? "solid" : "outline"}
            >
              <GridViewIcon fill={viewMode === "grid" ? "var(--color-shm-black)" : "var(--color-grey-800)"} />
            </Button>
            <Button 
              className={`${styles.viewToggle}`}
              handleClick={() => setViewMode("list")}
              aria-label="List view"
              variant={viewMode === "list" ? "solid" : "outline"}
            >
              <ViewListIcon fill={viewMode === "list" ? "var(--color-shm-black)" : "var(--color-grey-800)"} />
            </Button>
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No events found for this region.</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? styles.eventsContainerGrid : styles.eventsContainerList}>
          {filteredEvents.map((event, i) => (
            <div key={`${event.title}-${i}`} className={styles.eventCard}>
              {event.featuredImage ? (
                <img src={event.featuredImage} alt={event.title} className={styles.eventImage} />
              ) : (
                <div className={styles.eventImagePlaceholder} title="No image provided" />
              )}
              
              <div className={styles.eventContent}>
                <div className={styles.eventDetails}>
                  <Headline as="h2" variant="7">{event.title}</Headline>
                  
                  <div className={styles.eventMeta}>
                    <div className={styles.metaItem}>
                      <EventIcon fill="var(--color-grey-800)" size="small" />
                      <BodyText variant="6">{formatDate(event.date, event.endDate)}</BodyText>
                    </div>
                    <div className={styles.metaItem}>
                      <PlaceIcon fill="var(--color-grey-800)" size="small" />
                      <BodyText variant="6">{event.country}</BodyText>
                    </div>
                    <RegionBadge region={event.region} />
                  </div>
                </div>
                
                <div className={styles.eventActions}>
                  {event.registrationLink ? (
                    <a 
                      href={event.registrationLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.registerButton}
                    >
                      Register
                    </a>
                  ) : null}
                  {event.websiteLink ? (
                    <span className={styles.websiteLink}>
                      <LinkOutIcon fill="var(--color-grey-800)" size="small" />
                      Website
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} maxWidth="800px">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf068xZZ5bYsdmazqHbsPeJq_9p6HlKBqb3OhZBUkLRMYD8Sw/viewform?embedded=true"
          className={styles.formIframe}
          title="Event Submission Form"
        />
      </Popup>
    </main>
  );
}
