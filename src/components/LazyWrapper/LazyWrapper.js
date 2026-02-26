import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const LazyDiv = styled.div`
  ${({ $height, $isInView }) =>
    $height && !$isInView && `min-height: ${$height}px;`}
`;

const LazyWrapper = ({ children, enable = true, height, offset }) => {
  const [isInView, setIsInView] = useState(!enable);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!enable) return;

    const wrapper = wrapperRef.current;

    const observerCallback = (entries) => {
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

  const styleOnbject = {};

  if (height) {
    styleOnbject["height"] = `${height}px`;
  }

  return (
    <LazyDiv ref={wrapperRef} $height={height} $isInView={isInView}>
      {isInView ? children : null}
    </LazyDiv>
  );
};

export default LazyWrapper;
