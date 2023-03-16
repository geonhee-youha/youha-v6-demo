import { Box } from "@mui/material";

export default function Toolbar({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
