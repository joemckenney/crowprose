import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

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

export const pageHeader = style({
	borderBottom: `${vars.borderWidth.thick} solid ${vars.color.black}`,
	paddingBottom: vars.spacing["6"],
	display: "flex",
	flexDirection: "column",
	gap: vars.spacing["2"],
});

export const pageTitle = style({
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

export const pageDescription = style({
	fontFamily: vars.font.body,
	fontSize: vars.fontSize.lg,
	lineHeight: vars.lineHeight.normal,
	color: vars.color.textSecondary,
	maxWidth: vars.maxWidth.prose,
});

export const projectGrid = style({
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
