import React from 'react';
import styles from './Typography.module.css';

const defaultTags = {
  Headline: 'h2',
  Subhead: 'h3',
  Body: 'p',
  Paragraph: 'p',
};

const getTypeClass = (type, variantNumber) => {
  if (type === 'Body' || type === 'Paragraph') return styles[`Body${variantNumber}`];
  if (type === 'Subhead') return styles[`Subhead${variantNumber}`];
  if (type === 'Headline') return styles[`Headline${variantNumber}`];
  return '';
};

const getBaseClass = (type) => {
  if (type === 'Body' || type === 'Paragraph') return styles.body;
  if (type === 'Subhead') return styles.subhead;
  if (type === 'Headline') return styles.headline;
  return '';
};

const getSpecialWeight = (type, variantNumber, colorValue) => {
  const isWhite = colorValue === 'white' || colorValue === '#ffffff' || colorValue === 'var(--color-white)';
  if (type === 'Body' || type === 'Paragraph') {
    if (variantNumber === '1' || variantNumber === '3') {
      return isWhite ? 'var(--weight-bolder)' : 'var(--weight-bold)';
    } else {
      return isWhite ? 'var(--weight-medium)' : 'var(--weight-normal)';
    }
  }
  if (type === 'Subhead') {
    return isWhite ? 'var(--weight-bold)' : 'var(--weight-medium)';
  }
  return undefined;
};

/**
    * @param [as] - component as prop
    * @param [children] - child components/jsx
    * @param {string} [className] - additonal/override styles
    * @param {string} [color] - hex value ex.: #ffffff
    * @param {number} [fontWeight] - ex.: 300, 400
    * @param {boolean} [italic]
    * @param {string} [lineHeight] - ex.: '120%', or '20px'
    * @param {string} [margin] - ex.: '0 20px 0 10px'
    * @param {string} [padding] - ex.: '0 20px 0 10px'
    * @param {string} [size] - ex.: '10px'
    * @param {string} [textAlignment] - One of 'left' | 'center' | 'right'
    * @param {string} [transform] - One of 'uppercase' | 'capitalize' | 'lowercase';
    * @param {boolean} [underline]
    * @param {string} variant - Required variant prop: 1, 2, 3 etc.
    * @returns Typography component
*/

const Typography = ({
  as,
  children,
  className,
  color,
  fontWeight,
  italic,
  lineHeight,
  margin,
  padding,
  size,
  textAlignment,
  transform,
  underline,
  variant = '3',
  type = 'Body',
}) => {
  const Component = as || defaultTags[type] || 'p';

  const classNames = [
    styles.typography,
    getBaseClass(type),
    getTypeClass(type, variant),
    className
  ].filter(Boolean).join(" ");

  const inlineStyle = {};

  if (color) inlineStyle.color = color;

  const resolvedFontWeight = fontWeight || getSpecialWeight(type, variant, color);
  if (resolvedFontWeight) inlineStyle.fontWeight = resolvedFontWeight;

  if (italic) inlineStyle.fontStyle = 'italic';
  if (lineHeight) inlineStyle.lineHeight = lineHeight;
  if (margin) inlineStyle.margin = margin;
  if (padding) inlineStyle.padding = padding;
  if (size) inlineStyle.fontSize = size;
  if (textAlignment) inlineStyle.textAlign = textAlignment;
  if (transform) inlineStyle.textTransform = transform;
  if (underline) inlineStyle.textDecoration = 'underline';



  return (
    <Component className={classNames} style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}>
      {children}
    </Component>
  );
};

export const Headline = (props) => <Typography {...props} type="Headline" />;
export const Subhead = (props) => <Typography {...props} type="Subhead" />;
export const BodyText = (props) => <Typography {...props} type="Body" />;
export const Paragraph = (props) => <Typography {...props} type="Paragraph" />;

export default Typography;