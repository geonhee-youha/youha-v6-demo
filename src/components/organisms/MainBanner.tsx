import { alpha, Box, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import { theme } from "../../themes/theme";
import { splitBold } from "../../utils";
import youhaBlue from "../../constants/youhaBlue";
import Button from "../atoms/Button";
import { useRouter } from "next/router";

const banners = [
  {
    thumbnail: "https://i.ytimg.com/vi/opbJWXxJN9k/maxresdefault.jpg",
    category: "먹방 ASMR",
    title: "먹방 유튜버 치훈과 함께\\n광고 진행하세요!",
    backgroundColor: grey[900],
  },
  {
    thumbnail:
      "https://file3.instiz.net/data/file3/2020/02/22/d/3/b/d3b1eee3ed22983fd81ffcf1c8a6b20b.jpg",
    category: "먹방",
    title: "먹방 유튜버 햄지와 함께\\n광고 진행하세요!",
    backgroundColor: youhaBlue[900],
  },
];

export default function MainBanner() {
  const router = useRouter();
  const [categorySwiper, setCategorySwiper] = useState<any>(null);
  const [titleSwiper, setTitleSwiper] = useState<any>(null);
  const [imgSwiper, setImgSwiper] = useState<any>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);
  const banner = banners[swiperIndex];
  const { backgroundColor } = banner;
  useEffect(() => {
    let swiperAutoPlayTimer = setTimeout(() => {
      imgSwiper?.slideTo(
        swiperIndex === banners.length - 1 ? 0 : swiperIndex + 1
      );
    }, 5000);
    return () => {
      clearTimeout(swiperAutoPlayTimer);
    };
  }, [imgSwiper, swiperIndex]);
  const onCategotySlideChange = (swiper: any) => {
    const index = swiper.realIndex;
    setSwiperIndex(index);
    titleSwiper?.slideTo(index);
    imgSwiper?.slideTo(index);
  };
  const onTitleSlideChange = (swiper: any) => {
    const index = swiper.realIndex;
    setSwiperIndex(index);
    categorySwiper?.slideTo(index);
    imgSwiper?.slideTo(index);
  };
  const onImgSlideChange = (swiper: any) => {
    const index = swiper.realIndex;
    setSwiperIndex(index);
    titleSwiper?.slideTo(index);
    categorySwiper?.slideTo(index);
  };
  const onClickPrev = () => {
    if (swiperIndex === 0) return;
    categorySwiper?.slideTo(swiperIndex - 1);
    titleSwiper?.slideTo(swiperIndex - 1);
    imgSwiper?.slideTo(swiperIndex - 1);
  };
  const onClickNext = () => {
    if (swiperIndex === banners.length - 1) return;
    categorySwiper?.slideTo(swiperIndex + 1);
    titleSwiper?.slideTo(swiperIndex + 1);
    imgSwiper?.slideTo(swiperIndex + 1);
  };
  const onYoutuberClick = () => {
    router.push(`/youtuber/1`);
  };
  const onSendProposalClick = () => {
    router.push(`/proposal/send`);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: 360,
        transition: `all 0.35s ease`,
        backgroundColor: alpha(backgroundColor, 1),
      }}
    >
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 24,
              "& .swiper": {
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Swiper
              onSwiper={setCategorySwiper}
              onSlideChange={onCategotySlideChange}
              direction="vertical"
            >
              {banners.map((item, index) => {
                const { category } = item;
                return (
                  <SwiperSlide key={index}>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      {category}
                    </Typography>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          <Box
            sx={{
              m: theme.spacing(0.5, 0, 0, 0),
              width: "100%",
              height: 80,
              "& .swiper": {
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Swiper
              onSwiper={setTitleSwiper}
              onSlideChange={onTitleSlideChange}
              direction="vertical"
            >
              {banners.map((item, index) => {
                const { title } = item;
                return (
                  <SwiperSlide key={index}>
                    <Typography
                      sx={{
                        fontSize: 36,
                        lineHeight: "40px",
                        fontWeight: "700",
                        color: "#ffffff",
                        "& span": {
                          display: "block",
                          "& b": {
                            position: "relative",
                          },
                        },
                      }}
                    >
                      {title.split("\\n").map((i, key) => {
                        return <span key={key}>{splitBold(i)}</span>;
                      })}
                    </Typography>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
            <Button
              backgroundColor="#ffffff"
              color={backgroundColor}
              onClick={onYoutuberClick}
            >
              채널 정보 보러가기
            </Button>
            <Button
              type="outlined"
              backgroundColor="#ffffff"
              onClick={onSendProposalClick}
            >
              바로 광고 제안하기
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              m: theme.spacing(5, 0, 0, 0),
            }}
          >
            <IconButton
              onClick={onClickPrev}
              sx={{
                width: 24,
                height: 24,
                opacity: swiperIndex === 0 ? 0.6 : 1,
                backgroundColor: `${alpha("#ffffff", 1)} !important`,
                zIndex: 9,
                borderRadius: "50%",
                overflow: "hidden",
                transition: `all 0.35s ease`,
                // boxShadow: `rgb(0 0 0 / 24%) 0px 4px 8px`,
              }}
            >
              <Icon
                prefix="fas"
                name="chevron-left"
                size={16}
                color={backgroundColor}
              />
            </IconButton>
            <IconButton
              onClick={onClickNext}
              sx={{
                width: 24,
                height: 24,
                opacity: swiperIndex === banners.length - 1 ? 0.6 : 1,
                backgroundColor: `${alpha("#ffffff", 1)} !important`,
                zIndex: 9,
                borderRadius: "50%",
                overflow: "hidden",
                transition: `all 0.35s ease`,
                // boxShadow: `rgb(0 0 0 / 24%) 0px 4px 8px`,
              }}
            >
              <Icon
                prefix="fas"
                name="chevron-right"
                size={16}
                color={backgroundColor}
              />
            </IconButton>
            <Box
              sx={{
                backgroundColor: `${alpha("#ffffff", 1)} !important`,
                height: 24,
                p: theme.spacing(0, 1.5),
                borderRadius: 16,
                zIndex: 9,
                display: "flex",
                alignItems: "center",
                // boxShadow: `rgb(0 0 0 / 24%) 0px 4px 8px`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  color: backgroundColor,
                }}
              >{`${swiperIndex + 1} / ${banners.length}`}</Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            position: "relative",
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: alpha("#000000", 0.3),
            "& .swiper": {
              width: `533px`,
              height: "300px",
              transition: `all 0.35s ease`,
            },
          }}
        >
          <Swiper
            allowTouchMove
            onSwiper={setImgSwiper}
            onSlideChange={onImgSlideChange}
            className="visual"
            lazy
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
          >
            {banners.map((item, index) => {
              const { backgroundColor, thumbnail } = item;
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      transition: `all 0.35s ease`,
                      "& img": {
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  >
                    {/* <img src={thumbnail} /> */}
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}
