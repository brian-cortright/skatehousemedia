import React from 'react';
import styles from './Typography.module.css';

type TypographyType = 'Body' | 'Paragraph' | 'Subhead' | 'Headline';
type TextAlignment = 'left' | 'center' | 'right';
type TextTransform = 'uppercase' | 'capitalize' | 'lowercase';

interface TypographyProps {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  color?: string;
  fontWeight?: string | number;
  italic?: boolean;
  lineHeight?: string;
  margin?: string;
  padding?: string;
  size?: string;
  textAlignment?: TextAlignment;
  transform?: TextTransform;
  underline?: boolean;
  variant?: string;
  type?: TypographyType;
}

const defaultTags: Record<string, React.ElementType> = {
  Headline: 'h2',
  Subhead: 'h3',
  Body: 'p',
  Paragraph: 'p',
};

const getTypeClass = (type: TypographyType, variantNumber: string): string => {
  if (type === 'Body' || type === 'Paragraph') return styles[`Body${variantNumber}`];
  if (type === 'Subhead') return styles[`Subhead${variantNumber}`];
  if (type === 'Headline') return styles[`Headline${variantNumber}`];
  return '';
};

const getBaseClass = (type: TypographyType): string => {
  if (type === 'Body' || type === 'Paragraph') return styles.body;
  if (type === 'Subhead') return styles.subhead;
  if (type === 'Headline') return styles.headline;
  return '';
};

const getSpecialWeight = (type: TypographyType, variantNumber: string, colorValue?: string): string | undefined => {
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

const Typography: React.FC<TypographyProps> = ({
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

  const inlineStyle: React.CSSProperties = {};

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

type TypographyExportProps = Omit<TypographyProps, 'type'>;

export const Headline: React.FC<TypographyExportProps> = (props) => <Typography {...props} type="Headline" />;
export const Subhead: React.FC<TypographyExportProps> = (props) => <Typography {...props} type="Subhead" />;
export const BodyText: React.FC<TypographyExportProps> = (props) => <Typography {...props} type="Body" />;
export const Paragraph: React.FC<TypographyExportProps> = (props) => <Typography {...props} type="Paragraph" />;

export default Typography;
