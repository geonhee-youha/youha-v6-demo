import { Box, SxProps } from "@mui/material";

export default function Toolbar({
  sx,
  children,
}: {
  sx?: SxProps;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 64,
        display: "flex",
        alignItems: "center",
        "@media(max-width: 480px)": {
          height: 56,
        },
        ...sx
      }}
    >
      {children}
    </Box>
  );
}
