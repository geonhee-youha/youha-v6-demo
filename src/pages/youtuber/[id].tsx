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
        유튜버 상세페이지
      </Typography>
      <Typography>기존 유하 버전업 : 채널데이터/모델데이터 바탕으로</Typography>
      {/* <Typography>페이지 예시사진</Typography> 
      <img src="/example/finance.png" /> */}
    </Container>
  );
}
