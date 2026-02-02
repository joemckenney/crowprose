import { style } from "@vanilla-extract/css";
import { vars } from "../styles/tokens.css";

export const page = style({
	maxWidth: vars.maxWidth.container,
	margin: "0 auto",
	padding: `${vars.spacing["8"]} ${vars.spacing["6"]}`,
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["12"],

	"@media": {
		"(max-width: 768px)": {
			padding: `${vars.spacing["6"]} ${vars.spacing["4"]}`,
			gap: vars.spacing["8"],
		},
	},
});

export const masthead = style({
	borderBottom: `${vars.borderWidth.thick} solid ${vars.color.black}`,
	paddingBottom: vars.spacing["6"],
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["4"],
});

export const brand = style({
	fontFamily: vars.font.heading,
	fontSize: vars.fontSize["4xl"],
	letterSpacing: "-0.03em",
	textTransform: "uppercase",

	"@media": {
		"(max-width: 768px)": {
			fontSize: vars.fontSize["3xl"],
		},
	},
});

export const tagline = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.lg,
	lineHeight: vars.lineHeight.normal,
	color: vars.color.textSecondary,
	maxWidth: vars.maxWidth.prose,
});

export const section = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["6"],
});

export const sectionHeader = style({
	borderBottom: `${vars.borderWidth.thin} solid ${vars.color.border}`,
	paddingBottom: vars.spacing["3"],
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

export const sectionTitle = style({
	fontFamily: vars.font.heading,
	fontSize: vars.fontSize["2xl"],
	textTransform: "uppercase",
	letterSpacing: "0.02em",

	"@media": {
		"(max-width: 768px)": {
			fontSize: vars.fontSize.xl,
		},
	},
});

export const sectionLink = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.sm,
	textDecoration: "none",
	color: vars.color.black,
	textTransform: "uppercase",
	letterSpacing: "0.05em",
	transition: "opacity 0.15s ease",
	display: "inline-flex",
	alignItems: "center",
	gap: vars.spacing["1"],

	":hover": {
		opacity: 0.6,
	},

	":focus": {
		outline: `${vars.borderWidth.base} solid ${vars.color.black}`,
		outlineOffset: vars.spacing["1"],
	},
});

export const tileGrid = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
	gap: vars.spacing["8"],
	columnGap: vars.spacing["10"],

	"@media": {
		"(max-width: 768px)": {
			gridTemplateColumns: "1fr",
			gap: vars.spacing["6"],
		},
	},
});
