import { IconName } from "@fortawesome/fontawesome-svg-core";
import { alpha, Box, ButtonBase, SxProps, Typography } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "./Icon";

export default function Button({
  disabled,
  type,
  size = "md",
  fullWidth,
  name,
  backgroundColor: backgroundColorOrigin = youhaBlue[700],
  color,
  borderColor,
  children,
  onClick,
  sx,
  mobile,
  web,
}: {
  disabled?: boolean;
  type?: string;
  size?: string;
  fullWidth?: boolean;
  name?: IconName;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  sx?: SxProps;
  mobile?: boolean;
  web?: boolean;
}) {
  const backgroundColor = disabled ? youhaGrey[100] : backgroundColorOrigin;
  return (
    <ButtonBase
      disabled={disabled}
      sx={{
        width: fullWidth ? "100%" : "auto",
        borderRadius: 0.5,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: type === "outlined" ? "transparent" : backgroundColor,
        boxShadow: `${borderColor ?? backgroundColor} 0px 0px 0px ${
          type === "outlined" || borderColor ? 1 : 0
        }px inset`,
        "&:hover .ripple": {
          opacity: type === "outlined" ? 0 : 1,
        },
        "&:hover": {
          opacity: type === "outlined" ? 0.7 : 1,
        },
        height: 40,
        p: theme.spacing(0, 2),
        "&.lg": {
          height: 48,
          fontSize: 16,
          lineHeight: "24px",
        },
        "&.sm": {
          height: 32,
          p: theme.spacing(0, 1.5),
          fontSize: 12,
          lineHeight: "16px",
        },
        display: mobile ? "none" : web ? "flex" : "flex",
        "@media(max-width: 480px)": {
          display: mobile ? "flex" : web ? "none" : "flex",
        },
        fontWeight: "700",
        zIndex: 1,
        fontSize: 14,
        lineHeight: "20px",
        color:
          type === "outlined"
            ? disabled
              ? youhaGrey[300]
              : color ?? backgroundColor
            : disabled
            ? youhaGrey[300]
            : color ?? "#ffffff",
        ...sx,
      }}
      disableRipple={type === "outlined"}
      onClick={onClick}
      className={size}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha("#000000", 0.15),
          transition: `all 0.35s ease`,
          opacity: 0,
          zIndex: type === "outlined" ? 2 : 0,
        }}
        className="ripple"
      />
      {name && (
        <Icon
          prefix="fas"
          name={name}
          sx={{ m: theme.spacing(0, 1, 0, 0) }}
          size={20}
          color={
            type === "outlined"
              ? backgroundColor
              : disabled
              ? youhaGrey[300]
              : color
          }
        />
      )}
      {children}
    </ButtonBase>
  );
}
