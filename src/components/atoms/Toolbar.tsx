import { Box } from "@mui/material";

export default function Toolbar({ children }: { children?: React.ReactNode }) {
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
      }}
    >
      {children}
    </Box>
  );
}
