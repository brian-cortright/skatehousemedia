import React, { useEffect } from "react";
import styles from "./Popup.module.css";
import useScrollBlock from "@/hooks/useScrollBlock";
import CloseIcon from "@/components/enhancedSvg/svgs/CloseIcon";

interface PopupProps {
  children: React.ReactNode;
  isOpen: boolean;
  padding?: string;
  maxWidth?: string;
  onOverlayClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  children,
  isOpen,
  padding = "var(--spacing-medium_100)",
  maxWidth = "calc(100% - 100px)",
  onOverlayClick,
  onClose,
}) => {
  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
    return () => allowScroll();
  }, [isOpen, blockScroll, allowScroll]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
      onClick={onOverlayClick}
    >
      <div
        className={styles.contentWrapper}
        style={{ padding, maxWidth }}
      >
        {onClose && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close popup"
            type="button"
          >
            <CloseIcon fill="var(--color-grey-700)" size="large" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Popup;

