import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Visual from "../../components/atoms/Visual";

function Youtuber() {
  return (
    <Box>
      <Visual
        src="https://yt3.ggpht.com/ytc/APkrFKaUNDH3mgVQtM87zcunIb4elVrj687hnSzrd82Qlg=s800-c-k-c0x00ffffff-no-rj"
        sx={{
          width: 80,
          height: 80,
        }}
      />
    </Box>
  );
}

export default function Index() {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Youtuber />
    </Box>
  );
}
