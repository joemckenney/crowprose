import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/tokens.css";

export const codeBlock = style({
	fontFamily: vars.font.mono,
	fontSize: "13px",
	lineHeight: "1.5",
	padding: vars.spacing["4"],
	borderRadius: vars.borderRadius.base,
	overflowX: "auto",
	marginTop: 0,
	marginBottom: vars.spacing["4"],
});

export const codeLine = style({
	display: "flex",
});

export const codeLineNumber = style({
	userSelect: "none",
	opacity: 0.5,
	paddingRight: vars.spacing["4"],
	textAlign: "right",
	minWidth: "2em",
});

export const codeLineContent = style({
	flex: 1,
});
