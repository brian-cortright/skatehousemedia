import { useRef } from "react";

interface ScrollBlockReturn {
  blockScroll: () => void;
  allowScroll: () => void;
}

const useScrollBlock = (): ScrollBlockReturn => {
  const scrollBlocked = useRef(false);
  const html =
    typeof document !== "undefined" ? document.documentElement : null;
  const body = typeof document !== "undefined" ? document.body : null;

  const blockScroll = () => {
    if (!body || !html || !body.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    html.style.overflow = "hidden";
    html.style.position = "relative";
    body.style.overflow = "hidden";
    body.style.position = "relative";
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (!body || !html || !body.style) return;

    html.style.overflow = "";
    html.style.position = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.paddingRight = ``;

    scrollBlocked.current = false;
  };

  return { blockScroll, allowScroll };
};

export default useScrollBlock;
