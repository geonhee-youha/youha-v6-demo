import { IconName } from "@fortawesome/fontawesome-svg-core";
import { alpha, Box, ButtonBase, SxProps, Typography } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import { theme } from "../../themes/theme";
import Icon from "./Icon";

export default function Button({
  type,
  size = "md",
  fullWidth,
  name,
  backgroundColor = youhaBlue[700],
  color = "#ffffff",
  children,
  onClick,
  sx,
  mobile,
  web,
}: {
  type?: string;
  size?: string;
  fullWidth?: boolean;
  name?: IconName;
  backgroundColor?: string;
  color?: string;
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  sx?: SxProps;
  mobile?: boolean;
  web?: boolean;
}) {
  return (
    <ButtonBase
      sx={{
        width: fullWidth ? "100%" : "auto",
        borderRadius: 0.5,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: type === "outlined" ? "transparent" : backgroundColor,
        boxShadow: `${backgroundColor} 0px 0px 0px ${
          type === "outlined" ? 1 : 0
        }px inset`,
        "&:hover .ripple": {
          opacity: 1,
        },
        height: 36,
        p: theme.spacing(0, 2),
        "&.lg": {
          height: 44,
        },
        "&.sm": {
          height: 32,
        },
        display: mobile ? "none" : web ? "flex" : "flex",
        "@media(max-width: 480px)": {
          display: mobile ? "flex" : web ? "none" : "flex",
        },
        ...sx,
      }}
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
          backgroundColor: alpha("#000000", 0.3),
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
          color={type === "outlined" ? backgroundColor : color}
        />
      )}
      <Typography
        sx={{
          color: type === "outlined" ? backgroundColor : color,
          fontWeight: "700",
          zIndex: 1,
          fontSize: 14,
          lineHeight: "20px",
          "&.lg": {
            fontSize: 16,
            lineHeight: "24px",
          },
          "&.sm": {
            fontSize: 12,
            lineHeight: "16px",
          },
        }}
        className={size}
      >
        {children}
      </Typography>
    </ButtonBase>
  );
}
