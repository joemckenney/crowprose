import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

export const socialLinks = style({
  display: "flex",
  gap: vars.spacing["4"],
  alignItems: "center",
});

export const socialLink = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.black,
  transition: "opacity 0.15s ease",

  ":hover": {
    opacity: 0.6,
  },

  ":focus": {
    outline: `${vars.borderWidth.base} solid ${vars.color.black}`,
    outlineOffset: "2px",
  },
});
