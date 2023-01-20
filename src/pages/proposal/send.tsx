import { Typography } from "@mui/material";
import Container from "../../components/atoms/Container";
import { theme } from "../../themes/theme";

export default function Page() {
  return (
    <Container>
      <Typography
        sx={{
          fontSize: 24,
          lineHeight: "32px",
          fontWeight: "700",
          p: theme.spacing(10, 0),
        }}
      >
        광고 제안하기
      </Typography>
      <Typography>기존 유하 버전업</Typography> 
      {/* <Typography>페이지 예시사진</Typography> 
      <img src="/example/finance.png" /> */}
    </Container>
  );
}
