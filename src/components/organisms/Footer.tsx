import { Box } from "@mui/material";
import { useRouter } from "next/router";
import youhaGrey from "../../constants/youhaGrey";

export default function Footer() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const focused = `/${pathnames[1]}` !== "/auth";
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        borderTop: `1px solid ${youhaGrey[200]}`,
        display: focused ? "flex" : "none",
      }}
    ></Box>
  );
}
