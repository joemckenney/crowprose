import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    // Monochrome palette - newspaper inspired
    black: "#000000",
    gray900: "#1a1a1a",
    gray800: "#333333",
    gray700: "#4d4d4d",
    gray600: "#666666",
    gray500: "#808080",
    gray400: "#999999",
    gray300: "#b3b3b3",
    gray200: "#cccccc",
    gray100: "#e6e6e6",
    gray50: "#f5f5f5",
    white: "#ffffff",

    // Semantic colors
    text: "#1a1a1a",
    textSecondary: "#4d4d4d",
    textMuted: "#808080",
    border: "#cccccc",
    borderStrong: "#000000",
    background: "#ffffff",
    backgroundSubtle: "#f5f5f5",
  },

  font: {
    // DIN font family
    heading: '"DIN 1451 Std Engschrift", -apple-system, system-ui, sans-serif',
    body: '"DIN 1451 Std Mittelschrift", -apple-system, system-ui, sans-serif',
    mono: '"Courier New", Courier, monospace',
  },

  fontSize: {
    // Modular scale - newspaper inspired
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    base: "1rem",       // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "3.75rem",   // 60px
  },

  lineHeight: {
    tight: "1.1",
    snug: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  spacing: {
    // 8px base spacing scale
    "0": "0",
    "1": "0.25rem",   // 4px
    "2": "0.5rem",    // 8px
    "3": "0.75rem",   // 12px
    "4": "1rem",      // 16px
    "5": "1.25rem",   // 20px
    "6": "1.5rem",    // 24px
    "8": "2rem",      // 32px
    "10": "2.5rem",   // 40px
    "12": "3rem",     // 48px
    "16": "4rem",     // 64px
    "20": "5rem",     // 80px
    "24": "6rem",     // 96px
  },

  borderWidth: {
    thin: "1px",
    base: "2px",
    thick: "3px",
  },

  borderRadius: {
    none: "0",
    sm: "2px",
    base: "4px",
  },

  maxWidth: {
    prose: "65ch",      // Optimal reading width
    container: "1200px",
    narrow: "800px",
  },
});
