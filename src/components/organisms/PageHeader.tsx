import { IconName } from "@fortawesome/fontawesome-svg-core";
import { IconButton, SxProps, Typography } from "@mui/material";
import { MouseEventHandler } from "react";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";
import Toolbar from "../atoms/Toolbar";

export default function PageHeader({
  iconName = "xmark",
  onClose,
  title,
  children,
  sx,
}: {
  iconName?: IconName;
  onClose?: MouseEventHandler<HTMLButtonElement> | undefined;
  title?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <Toolbar
      sx={{
        position: "relative",
        p: theme.spacing(1, 0.5),
        justifyContent: "space-between",
        backgroundColor: '#ffffff',
        ...sx,
      }}
    >
      <IconButton disableRipple onClick={onClose}>
        <Icon name={iconName} prefix="fal" />
      </IconButton>
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 18,
          lineHeight: "28px",
          fontWeight: "700",
        }}
      >
        {title}
      </Typography>
      {children}
    </Toolbar>
  );
}
