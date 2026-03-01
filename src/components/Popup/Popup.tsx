import React, { useEffect } from "react";
import styles from "./Popup.module.css";
import useScrollBlock from "@/hooks/useScrollBlock";

interface PopupProps {
  children: React.ReactNode;
  handleClose?: () => void;
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = ({ children, handleClose = () => {}, isOpen }) => {
  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    }
    return () => allowScroll();
  }, [isOpen, blockScroll, allowScroll]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.container} ${isOpen ? styles.containerOpen : ''}`}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
};

export default Popup;
