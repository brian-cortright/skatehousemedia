import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string | null;
  fullWidth?: boolean;
  handleClick?: (() => void) | null;
  href?: string;
  mode?: 'light' | 'dark';
  target?: string;
}

const Button: React.FC<ButtonProps> = ({
  children = null,
  className = null,
  fullWidth = false,
  handleClick = null,
  href = "",
  mode = "light",
  target,
}) => {
  const Component: React.ElementType = href ? "a" : "button";

  const classNames = [
    styles.button,
    styles[mode],
    fullWidth ? styles.fullWidth : styles.autoWidth,
    className
  ].filter(Boolean).join(" ");

  return (
    <Component
      className={classNames}
      href={href || undefined}
      onClick={handleClick || undefined}
      target={target}
    >
      {children}
    </Component>
  );
};

export default Button;
