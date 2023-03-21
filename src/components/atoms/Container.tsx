import { Box, SxProps } from "@mui/material";
import React from "react";
import { theme } from "../../themes/theme";

export default function Container({
  children,
  sx,
}: {
  children?: React.ReactNode;
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        m: theme.spacing(0, "auto"),
        p: theme.spacing(0, 4),
        width: "100%",
        minWidth: 1280,
        maxWidth: 1280,
        "@media(max-width: 480px)": {
          m: 0,
          minWidth: "initial",
          maxWidth: "initial",
          p: theme.spacing(0, 2),
          overflowX: "hidden",
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
