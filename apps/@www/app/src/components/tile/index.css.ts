import { style } from "@vanilla-extract/css";

export const tile = style({
  borderTop: "1px solid black",
  padding: "6px 0",
  maxWidth: "200px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const title = style({
  padding: "4px 0",
});

export const description = style({});
