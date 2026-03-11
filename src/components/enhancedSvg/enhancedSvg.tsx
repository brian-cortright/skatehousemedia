'use client'
import React from 'react';
import styles from './enhancedSvg.module.css';

interface EnhancedSvgProps {
  align?: string;
  className?: string;
  cursor?: string;
  customHeight?: number;
  customWidth?: number;
  fill?: string;
  handleClick?: () => void;
  size?: keyof typeof sizes;
}

const sizes: Record<string, string> = {
  small: 'var(--font-base)',
  medium: 'var(--font-md)',
  large: 'var(--font-lg)',
  xLarge: 'var(--font-xl)',
};

const enhancedSvg = (Component: React.ComponentType) => {
  const EnhancedComponent: React.FC<EnhancedSvgProps> = ({
    align = '',
    className = '',
    cursor = '',
    customHeight,
    customWidth,
    fill = '',
    handleClick = () => { },
    size = '',
  }) => {
    const alignClass = align ? styles[`align${align}`] : '';
    const wrapperClassNames = `${styles.svgWrapper} ${alignClass} ${className}`.trim();

    // Create standard inline styles for the wrapper
    const wrapperStyle: React.CSSProperties = {};
    if (cursor) wrapperStyle.cursor = cursor;

    // Custom properties to be passed down and inherited
    const styleVariables: Record<string, string> = {};

    if (fill) {
      styleVariables['--color-shm-black'] = fill;
    }

    styleVariables['--svg-height'] = (customHeight || customWidth) ? (customHeight ? `${customHeight}px` : 'auto') : (size ? sizes[size] : sizes.medium);
    styleVariables['--svg-width']  = (customHeight || customWidth) ? (customWidth ? `${customWidth}px` : 'auto') : (size ? sizes[size] : sizes.medium);

    return (
      <span
        className={wrapperClassNames}
        style={{ ...wrapperStyle, ...styleVariables } as React.CSSProperties}
        onClick={handleClick}
      >
        <Component />
      </span>
    );
  };

  return EnhancedComponent;
};

export default enhancedSvg;
