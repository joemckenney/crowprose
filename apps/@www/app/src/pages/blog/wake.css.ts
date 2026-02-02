import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

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

export const headerContent = style({
	display: "flex",
	alignItems: "flex-start",
	gap: vars.spacing["4"],
});

export const logo = style({
	width: "48px",
	height: "48px",
	flexShrink: 0,
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

export const article = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.lg,
	lineHeight: vars.lineHeight.relaxed,
	color: vars.color.text,
	width: "100%",
});

globalStyle(`${article} h2`, {
	fontFamily: vars.font.heading,
	fontSize: vars.fontSize["2xl"],
	letterSpacing: "-0.02em",
	marginTop: vars.spacing["8"],
	marginBottom: vars.spacing["4"],
	textTransform: "uppercase",
});

globalStyle(`${article} p`, {
	marginBottom: vars.spacing["4"],
	maxWidth: "100%",
});

globalStyle(`${article} a`, {
	color: vars.color.text,
	textDecoration: "underline",
	textUnderlineOffset: "2px",
});

globalStyle(`${article} a:hover`, {
	color: vars.color.textSecondary,
});

globalStyle(`${article} code`, {
	fontFamily: vars.font.mono,
	fontSize: vars.fontSize.base,
	backgroundColor: vars.color.gray100,
	padding: "2px 6px",
	borderRadius: vars.borderRadius.sm,
});

globalStyle(`${article} pre`, {
	fontFamily: vars.font.mono,
	fontSize: vars.fontSize.sm,
	backgroundColor: vars.color.gray900,
	color: vars.color.gray100,
	padding: vars.spacing["4"],
	borderRadius: vars.borderRadius.base,
	overflowX: "auto",
	marginBottom: vars.spacing["4"],
});

globalStyle(`${article} pre code`, {
	backgroundColor: "transparent",
	padding: 0,
	color: "inherit",
});

globalStyle(`${article} strong`, {
	fontWeight: vars.fontWeight.bold,
});

globalStyle(`${article} ul, ${article} ol`, {
	marginBottom: vars.spacing["4"],
	paddingLeft: vars.spacing["6"],
});

globalStyle(`${article} li`, {
	marginBottom: vars.spacing["2"],
});
