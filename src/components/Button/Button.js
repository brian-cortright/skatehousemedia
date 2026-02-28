import styles from './Button.module.css';

const Button = ({
  children = null,
  className = null,
  fullWidth = false,
  handleClick = null,
  href = "",
  mode = "light",
  target,
}) => {
  const Component = href ? "a" : "button";

  const classNames = [
    styles.button,
    styles[mode],
    fullWidth ? styles.fullWidth : styles.autoWidth,
    className
  ].filter(Boolean).join(" ");

  return (
    <Component
      className={classNames}
      href={href || null}
      onClick={handleClick}
      target={target}
    >
      {children}
    </Component>
  );
};

export default Button;
