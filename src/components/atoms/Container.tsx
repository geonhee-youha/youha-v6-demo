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
        p: theme.spacing(0, 10),
        width: "100%",
        minWidth: 1200,
        maxWidth: 1440,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
