import React, { useState, useEffect, useRef } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  enable?: boolean;
  height?: number;
  offset?: number;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({ children, enable = true, height, offset = 0 }) => {
  const [isInView, setIsInView] = useState(!enable);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enable) return;

    const wrapper = wrapperRef.current;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting || entry.boundingClientRect.top <= 0 + offset) {
        setIsInView(true);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: `${offset}px`,
      threshold: 0,
    });

    if (wrapper) {
      observer.observe(wrapper);
    }

    return () => {
      if (wrapper) {
        observer.unobserve(wrapper);
      }
    };
  }, [enable, offset]);

  const styleObject: React.CSSProperties = {};

  if (height && !isInView) {
    styleObject.minHeight = `${height}px`;
  } else if (height) {
    styleObject.height = `${height}px`;
  }

  return (
    <div ref={wrapperRef} style={styleObject}>
      {isInView ? children : null}
    </div>
  );
};

export default LazyWrapper;
