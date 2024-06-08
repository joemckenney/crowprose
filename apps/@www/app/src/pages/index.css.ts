import { style } from "@vanilla-extract/css";

export const header = style({
  textTransform: "capitalize",
});

export const brand = style({
  fontSize: "24px",
  borderTop: "2px solid black",
});

export const shortBio = style({
  padding: "18px 0",
});

export const sections = {
  container: style({
    display: "flex",
    flexDirection: "column",
    gap: "3em",
  }),
};

export const section = {
  container: style({
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  }),
  heading: style({
    borderTop: "1px solid black",
    padding: "12px 0",
    fontSize: "18px",
    fontWeight: "600",
  }),
  content: style({
    display: "flex",
    flexWrap: "wrap",
    gap: "1em",
  }),
};
