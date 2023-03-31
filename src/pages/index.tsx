import PopupBanner from "../components/organisms/PopupBanner";

export default function Index() {
  return (
    <>
      {/* <MainBanner />
      <Container>
        <Box sx={{ m: theme.spacing(10, 0) }}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            최근 광고 성공사례
          </Typography>
          <Typography>예시사진</Typography>
          <img src="/example/home-case.png" />
        </Box>
        <Box sx={{ m: theme.spacing(10, 0) }}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            인기 광고 카테고리
          </Typography>
          <Typography>예시사진</Typography>
          <img src="/example/home-category.png" />
        </Box>
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
              TOP 유튜버 랭킹
            </Typography>
            <Stack
              spacing={1}
              sx={{
                m: theme.spacing(2, 0, 0, 0),
                // m: theme.spacing(2, 0, 0, 0),
                // p: theme.spacing(1, 3),
                // border: `1px solid ${grey[300]}`,
                // borderRadius: 1,
                // "& > *:not(:last-child)": {
                //   borderBottom: `1px solid ${grey[300]}`,
                // },
              }}
            >
              {testCreators.map((item, index) => {
                return (
                  index < 10 && (
                    <YoutuberRow key={index} index={index} item={item} />
                  )
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Container> */}
    </>
  );
}
