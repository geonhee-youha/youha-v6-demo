import { IconName } from "@fortawesome/fontawesome-svg-core";
import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import { theme } from "../../themes/theme";
import Icon from "./Icon";

export default function Button({
  type,
  name,
  backgroundColor = youhaBlue[700],
  color = "#ffffff",
  children,
  onClick,
}: {
  type?: string;
  name?: IconName;
  backgroundColor?: string;
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <ButtonBase
      sx={{
        height: 40,
        borderRadius: 0.5,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        p: theme.spacing(0, 2, 0, 2),
        backgroundColor: type === "outlined" ? "transparent" : backgroundColor,
        boxShadow: `${backgroundColor} 0px 0px 0px ${
          type === "outlined" ? 1 : 0
        }px inset`,
        "&:hover .ripple": {
          opacity: 1,
        },
      }}
      onClick={onClick}
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
          fontSize: 14,
          lineHeight: "20px",
          color: type === "outlined" ? backgroundColor : color,
          fontWeight: "700",
          zIndex: 1,
        }}
      >
        {children}
      </Typography>
    </ButtonBase>
  );
}
