'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Popup from './Popup';

interface PopupState {
  isOpen: boolean;
  children: React.ReactNode;
  padding?: string;
  maxWidth?: string;
}

interface PopupContextValue {
  openPopup: (opts: { children: React.ReactNode; padding?: string; maxWidth?: string }) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextValue | null>(null);

export const usePopup = (): PopupContextValue => {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return ctx;
};

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PopupState>({
    isOpen: false,
    children: null,
  });

  const openPopup = useCallback(
    (opts: { children: React.ReactNode; padding?: string; maxWidth?: string }) => {
      setState({
        isOpen: true,
        children: opts.children,
        padding: opts.padding,
        maxWidth: opts.maxWidth,
      });
    },
    []
  );

  const closePopup = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.isOpen) {
        closePopup();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, closePopup]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closePopup();
      }
    },
    [closePopup]
  );

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      <Popup
        isOpen={state.isOpen}
        padding={state.padding}
        maxWidth={state.maxWidth}
        onOverlayClick={handleOverlayClick}
        onClose={closePopup}
      >
        {state.children}
      </Popup>
    </PopupContext.Provider>
  );
};
