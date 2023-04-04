import { Box } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";

export default function FilterPanel({
    open,
    title,
    children,
  }: {
    open: boolean;
    title: string;
    children?: React.ReactNode;
  }) {
    const mcnFilter = title === "MCN 필터";
    return (
      <Box
        sx={{
          position: "absolute",
          top: 48,
          left: mcnFilter ? "initial" : 0,
          right: mcnFilter ? -524 : "initial",
          width: mcnFilter ? 980 : 320,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          overflow: "auto",
          border: `1px solid ${youhaGrey[200]}`,
          borderRadius: 0.5,
          backgroundColor: "#ffffff",
          zIndex: 999,
          "& .FilterSection:not(:nth-of-type(1))": {
            borderTop: `1px solid ${youhaGrey[200]}`,
          },
        }}
      >
        {children}
      </Box>
    );
  }
  