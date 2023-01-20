import _ from "lodash";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import { categories } from "../../components/organisms/GlobalNavigationBar";
import { theme } from "../../themes/theme";

export default function Page() {
  const router = useRouter();
  const { first, secondary, value } = router.query;
  const secondaries = categories.flatMap((el) => el.secondaries);
  const firstTitle =
    typeof value === "string"
      ? ""
      : categories[_.findIndex(categories, (el) => el.value === first)].title;
  const secondTitle =
    typeof value === "string"
      ? ""
      : secondaries[_.findIndex(secondaries, (el) => el.value === secondary)]
          .title;
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
        {typeof value === "string"
          ? `${value} 검색결과`
          : `${firstTitle} 유튜버 : ${secondTitle} 검색결과`}
      </Typography>
      <Typography>페이지 예시사진 - 아래 두 형태를 섞어서 만들 예정</Typography>
      <img src="/example/search-1.png" />
      <img src="/example/search-2.png" />
    </Container>
  );
}
