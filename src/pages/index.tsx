import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Container from "../components/atoms/Container";
import YoutuberRow from "../components/molecules/YoutuberRow";
import MainBanner from "../components/organisms/MainBanner";
import { testCreators } from "../data";
import { theme } from "../themes/theme";


export default function Index() {
  return (
    <>
      <MainBanner />
      <Container>
        <Stack direction="row" spacing={5} sx={{ m: theme.spacing(10, 0) }}>
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              최근 인기 유튜버
            </Typography>
          </Box>
          <Box
            sx={{
              width: 400,
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              TOP 광고 유튜버 순위
            </Typography>
            <Stack
              spacing={1}
              sx={
                {
                  m: theme.spacing(2, 0, 0, 0),
                  // m: theme.spacing(2, 0, 0, 0),
                  // p: theme.spacing(1, 3),
                  // border: `1px solid ${grey[200]}`,
                  // borderRadius: 1,
                  // "& > *:not(:last-child)": {
                  //   borderBottom: `1px solid ${grey[200]}`,
                  // },
                }
              }
            >
              {testCreators.map((item, index) => {
                return index < 10 && <YoutuberRow key={index} index={index} item={item} />;
              })}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
