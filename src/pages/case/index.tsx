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
        성공 사례
      </Typography>
      <Typography>페이지 예시사진</Typography>
      <img src='/example/case.png'/>
    </Container>
  );
}
