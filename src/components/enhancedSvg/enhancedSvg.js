'use client'
import React from 'react';
import styles from './enhancedSvg.module.css';
import { fontSizing } from '../../theme';

const sizes = {
  small: fontSizing?.base || '16px',
  medium: fontSizing?.medium || '24px',
  large: fontSizing?.large || '40px',
  xLarge: fontSizing?.xLarge || '48px',
};

const enhancedSvg = (Component) => ({
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
  const wrapperStyle = {};
  if (cursor) wrapperStyle.cursor = cursor;

  // Custom properties to be passed down and inherited
  const styleVariables = {};

  if (fill) {
    styleVariables['--color-shm-black'] = fill;
  }

  styleVariables['--svg-height'] = (customHeight || customWidth) ? (customHeight ? `${customHeight}px` : 'auto') : (size ? sizes[size] : sizes.medium);
  styleVariables['--svg-width']  = (customHeight || customWidth) ? (customWidth ? `${customWidth}px` : 'auto') : (size ? sizes[size] : sizes.medium);

  return (
    <div
      className={wrapperClassNames}
      style={{ ...wrapperStyle, ...styleVariables }}
      onClick={handleClick}
    >
      <Component />
    </div>
  );
};

export default enhancedSvg;