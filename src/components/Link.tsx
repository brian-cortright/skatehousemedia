import React from "react";

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}

const Link: React.FC<LinkProps> = ({
  href,
  children,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  ...rest
}) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

export default Link;
