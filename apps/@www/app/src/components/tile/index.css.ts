import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

export const tileLink = style({
	display: "block",
	textDecoration: "none",
	color: "inherit",
	transition: "opacity 0.15s ease",

	":hover": {
		opacity: 0.6,
	},

	":focus": {
		outline: `${vars.borderWidth.base} solid ${vars.color.black}`,
		outlineOffset: vars.spacing["2"],
	},
});

export const tile = style({
	borderTop: `${vars.borderWidth.base} solid ${vars.color.black}`,
	paddingTop: vars.spacing["4"],
	paddingBottom: vars.spacing["6"],
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["3"],
	minWidth: "250px",
	maxWidth: "400px",
});

export const tileHeader = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["1"],
});

export const tileTitle = style({
	fontFamily: vars.font.heading,
	fontSize: vars.fontSize.xl,
	fontWeight: vars.fontWeight.normal,
	lineHeight: vars.lineHeight.tight,
	letterSpacing: "-0.01em",
});

export const tileMetadata = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.xs,
	color: vars.color.textMuted,
	textTransform: "uppercase",
	letterSpacing: "0.05em",
});

export const tileDescription = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.sm,
	lineHeight: vars.lineHeight.normal,
	color: vars.color.textSecondary,
});

export const tileLinks = style({
	display: "flex",
	gap: vars.spacing["3"],
	marginTop: vars.spacing["2"],
});

export const tileLinkIcon = style({
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

export const contributionBadge = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.xs,
	textTransform: "uppercase",
	letterSpacing: "0.05em",
	padding: `2px ${vars.spacing["2"]}`,
	borderRadius: "2px",
	border: `${vars.borderWidth.base} solid ${vars.color.black}`,
	backgroundColor: "transparent",
	fontWeight: vars.fontWeight.medium,

	selectors: {
		'&[data-type="pr"]': {
			color: vars.color.black,
			borderColor: vars.color.black,
		},
		'&[data-type="issue"]': {
			borderColor: vars.color.black,
			backgroundColor: vars.color.black,
			color: "white",
		},
	},
});
