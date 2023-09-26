import { Box, ButtonBase } from "@mui/material";
import { theme } from "../../themes/theme";
import Icon from "../../components/atoms/Icon";
import Button from "../../components/atoms/Button";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        // borderBottom: `1px solid ${grey[200]}`,
      }}
    >
      <Box
        sx={{
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 1),
          maxWidth: "480px",
          height: `56px`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          "& img": {
            width: "auto",
            height: 20,
          },
        }}
      >
        <ButtonBase
          sx={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => router.back()}
        >
          <Icon name="chevron-left" size={20} />
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default function Index() {
  return (
    <>
      <Header />
      <Box
        sx={{
          p: theme.spacing(0, 0, 3, 0),
        }}
      ></Box>
    </>
  );
}
