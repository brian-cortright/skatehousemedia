export const baseColors = {
  black: "#000000",
  white: "#ffffff",
  shmBlack: "#252525",

  gray1: "#333",
  gray2: "#444",
  gray3: "#666",
  gray4: "#888",
  gray5: "#999",
  gray6: "#dedede",
} as const;

export const breakpoints = {
  xsmall: "320px",
  small: "480px",
  medium: "768px",
  large: "1056px",
  xlarge: "1312px",
} as const;

export const fontSizing = {
  min: "10px",
  xSmall: "12px",
  small: "14px",
  base: "16px",
  basePlus: "20px",
  medium: "24px",
  mediumPlus: "32px",
  large: "40px",
  largePlus: "44px",
  xLarge: "48px",
  xxLarge: "56px",
  xxxLarge: "64px",
  xxxxLarge: "72px",
  max: "80px",
} as const;

export const fontWeights = {
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
  bolder: 800,
} as const;

export const lineHeights = {
  small: "80%",
  base: "100%",
  basePlus: "110%",
  mediumPlus: "116%",
  large: "125%",
  xLarge: "130%",
  xxLarge: "135%",
  max: "150%",
} as const;

export const basePadding = {
  half: "4px",
  base: "8px",
  small: "12px",
  medium: "16px",
  mediumLarge: "20px",
  large: "24px",
  xLarge: "32px",
  xxLarge: "40px",
  xxxLarge: "48px",
  xxxxLarge: "56px",
  max: "64px",
} as const;

export const transition = {
  default: "all 300ms ease",
} as const;
