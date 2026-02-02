import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../../styles/tokens.css";

export const page = style({
	maxWidth: vars.maxWidth.narrow,
	margin: "0 auto",
	padding: `${vars.spacing["8"]} ${vars.spacing["6"]}`,
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["8"],

	"@media": {
		"(max-width: 768px)": {
			padding: `${vars.spacing["6"]} ${vars.spacing["4"]}`,
			gap: vars.spacing["6"],
		},
	},
});

export const header = style({
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["4"],
	borderBottom: `${vars.borderWidth.thick} solid ${vars.color.black}`,
	paddingBottom: vars.spacing["6"],
});

export const title = style({
	fontFamily: vars.font.heading,
	fontSize: vars.fontSize["4xl"],
	letterSpacing: "-0.03em",
	lineHeight: vars.lineHeight.tight,

	"@media": {
		"(max-width: 768px)": {
			fontSize: vars.fontSize["3xl"],
		},
	},
});

export const description = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.lg,
	lineHeight: vars.lineHeight.relaxed,
	color: vars.color.textSecondary,
});

globalStyle(`${description} a`, {
	color: vars.color.textSecondary,
	textDecoration: "underline",
	textUnderlineOffset: "2px",
});

globalStyle(`${description} a:hover`, {
	color: vars.color.text,
});

export const postList = style({
	listStyle: "none",
	padding: 0,
	margin: 0,
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["6"],
});

export const postItem = style({
	borderBottom: `1px solid ${vars.color.gray200}`,
	paddingBottom: vars.spacing["6"],

	selectors: {
		"&:last-child": {
			borderBottom: "none",
			paddingBottom: 0,
		},
	},
});

export const postTitle = style({
	fontFamily: vars.font.heading,
	fontSize: vars.fontSize.xl,
	letterSpacing: "-0.01em",
	display: "block",
	marginBottom: vars.spacing["2"],
	color: vars.color.text,
	textDecoration: "none",

	selectors: {
		"a:hover &": {
			textDecoration: "underline",
			textUnderlineOffset: "2px",
		},
	},
});

export const postDescription = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.base,
	lineHeight: vars.lineHeight.relaxed,
	color: vars.color.textSecondary,
	display: "block",

	selectors: {
		"a &": {
			textDecoration: "none",
		},
	},
});
