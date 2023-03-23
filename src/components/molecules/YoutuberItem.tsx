import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { grey, pink, red } from "@mui/material/colors";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import youhaBlue from "../../constants/youhaBlue";
import { testVideos } from "../../data";
import { theme } from "../../themes/theme";
import { comma, numberToKorean } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";
import dayjs from "dayjs";

export default function YoutuberItem({
  index,
  selectedIds,
  setSelectedIds,
  item,
}: {
  index: number;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  item: any;
}) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const {
    id,
    title,
    thumbnail,
    subscriberCount,
    standardCommercialPrice,
    averageCommercialViewCount,
    descriptionOnYoutube,
  } = item;
  const [videoShow, setVideoShow] = useState<boolean>(false);
  const selected = selectedIds.includes(id);
  const onClickSelect = (e: any) => {
    e.preventDefault();
    const newValue = selected
      ? selectedIds.filter((el) => el !== id)
      : [...selectedIds, id];
    setSelectedIds(newValue);
  };
  const onClickBookmark = (e: any) => {
    e.preventDefault();
    setBookmarked((prev) => !prev);
  };
  const onClickShowVideo = (e: any) => {
    e.preventDefault();
    setVideoShow((prev) => !prev);
  };
  return (
    <>
      <Link href="/" passHref>
        <ButtonBase
          sx={{
            width: "100%",
            height: 130,
            borderRadius: 1,
            border: `1px solid ${grey[300]}`,
            transition: `all 0.35s ease`,
            overflow: "hidden",
            "&:hover": {
              boxShadow: `rgb(0 0 0 / 8%) 0px 4px 20px`,
            },
            "@media(max-width: 480px)": {
              borderRadius: 0,
              borderTop: `none`,
              borderLeft: `none`,
              borderRight: `none`,
              flexDirection: "column",
              height: "auto",
              borderBottom: `1px solid ${grey[300]}`,
            },
          }}
          disableRipple
        >
          <Box
            sx={{
              height: "100%",
              p: theme.spacing(2),
              borderRight: `1px solid ${grey[300]}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "@media(max-width: 480px)": {
                position: "absolute",
                height: "auto",
                p: 0,
                borderRight: `none`,
                top: 12,
                left: 12,
                zIndex: 9,
              },
            }}
          >
            <ButtonBase
              sx={{
                width: 20,
                height: 20,
                borderRadius: 0.5,
                boxShadow: `${
                  selected ? youhaBlue[500] : grey[300]
                } 0px 0px 0px 1px`,
                backgroundColor: selected ? youhaBlue[500] : `#ffffff`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={onClickSelect}
              className="Checkbox"
            >
              <Icon
                name="check"
                color="#ffffff"
                prefix="fas"
                size={16}
                sx={{
                  opacity: selected ? 1 : 0,
                }}
              />
            </ButtonBase>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              "@media(max-width: 480px)": {
                flex: "initial",
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                p: theme.spacing(2, 0, 2, 2),
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 130 - 32 - 2,
                  height: 130 - 32 - 2,
                  overflow: "hidden",
                  borderRadius: 1,
                  "& img": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                  // borderRight: `1px solid ${grey[300]}`,
                }}
              >
                <img src={thumbnail} />
              </Box>
              <ButtonBase
                sx={{
                  position: "absolute",
                  right: -4,
                  bottom: 12,
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  backgroundColor: `#ffffff`,
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${grey[300]}`,
                }}
                onClick={onClickBookmark}
              >
                <Icon
                  name="bookmark"
                  size={18}
                  prefix={bookmarked ? "fas" : "fal"}
                  color={bookmarked ? pink[500] : grey[400]}
                />
              </ButtonBase>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: 124,
                p: theme.spacing(2, 0, 2, 2),
                // borderRight: `1px solid ${grey[300]}`,
                "@media(max-width: 480px)": {
                  p: theme.spacing(2, 2, 2, 2),
                },
              }}
            >
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    m: theme.spacing(0, 0, 0.5, 0),
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <Typography
                sx={{
                  width: 16,
                  textAlign: "center",
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  color: grey[900],
                  m: theme.spacing(0, 0.5, 0, 0),
                }}
              >
                💄
              </Typography> */}
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: "16px",
                      // fontWeight: "700",
                      color: grey[900],
                    }}
                  >
                    뷰티·패션
                  </Typography>
                </Box>
                <Typo
                  lines={1}
                  sx={{
                    fontSize: 16,
                    lineHeight: "24px",
                    fontWeight: "700",
                    color: grey[900],
                  }}
                >
                  {title}
                </Typo>
                <Typo
                  lines={1}
                  sx={{
                    m: theme.spacing(0.5, 0, 0, 0),
                    fontSize: 12,
                    lineHeight: "16px",
                    color: grey[500],
                  }}
                >
                  {descriptionOnYoutube}
                </Typo>
              </Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  p: theme.spacing(1, 0, 0, 0),
                }}
              >
                {(index + 2) % 3 !== 0 && (index + 2) % 5 !== 0 && (
                  <ButtonBase
                    sx={{
                      height: 20,
                      borderRadius: 0.5,
                      backgroundColor: grey[50],
                      p: theme.spacing(0, 0.75),
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        lineHeight: "14px",
                        fontWeight: "700",
                        color: grey[500],
                      }}
                    >
                       롱폼 + 쇼츠
                    </Typography>
                  </ButtonBase>
                )}
                {(index + 2) % 3 === 0 && (
                  <ButtonBase
                    sx={{
                      height: 20,
                      borderRadius: 0.5,
                      backgroundColor: youhaBlue[50],
                      p: theme.spacing(0, 0.75),
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        lineHeight: "14px",
                        fontWeight: "700",
                        color: youhaBlue[500],
                      }}
                    >
                       롱폼 전문
                    </Typography>
                  </ButtonBase>
                )}
                {(index + 2) % 5 === 0 && (
                  <ButtonBase
                    sx={{
                      height: 20,
                      borderRadius: 0.5,
                      backgroundColor: red[50],
                      p: theme.spacing(0, 0.75),
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        lineHeight: "14px",
                        fontWeight: "700",
                        color: red[500],
                      }}
                    >
                      쇼츠 전문
                    </Typography>
                  </ButtonBase>
                )}
                {index % 3 === 0 && (
                  <ButtonBase
                    sx={{
                      height: 20,
                      borderRadius: 0.5,
                      backgroundColor: pink[50],
                      p: theme.spacing(0, 0.75),
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        lineHeight: "14px",
                        fontWeight: "700",
                        color: pink[500],
                      }}
                    >
                      아이스크리에이티브
                    </Typography>
                  </ButtonBase>
                )}
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              width: 216,
              height: "100%",
              p: theme.spacing(2, 2, 2, 2),
              display: "grid",
              gridTemplateColumns: "1fr",
              gridAutoRows: "1fr",
              gridTemplateRows: "auto auto",
              gridRowGap: 4,
              "@media(max-width: 480px)": {
                width: `100%`,
                p: theme.spacing(0, 2, 2, 2),
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: 8,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: theme.spacing(0, 0.5, 0, 0),
                }}
              >
                <Icon prefix="fal" name="users" size={14} color={grey[500]} />
              </Box>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                구독자수
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  // fontWeight: "700",
                  color: grey[900],
                  // color: youhaBlue[500]
                }}
              >
                {comma(subscriberCount)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: theme.spacing(0, 0.5, 0, 0),
                }}
              >
                <Icon prefix="fal" name="coins" size={14} color={grey[500]} />
              </Box>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                예상 광고단가
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  // fontWeight: "700",
                  color: grey[900],
                  // color: youhaBlue[500]
                }}
              >
                {comma(standardCommercialPrice)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: theme.spacing(0, 0.5, 0, 0),
                }}
              >
                <Icon
                  prefix="fal"
                  name="bullseye-arrow"
                  size={14}
                  color={grey[500]}
                />
              </Box>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                주 시청타겟
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  // fontWeight: "700",
                  color: grey[900],
                  // color: youhaBlue[500]
                }}
              >
                2030 여성
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: theme.spacing(0, 0.5, 0, 0),
                }}
              >
                <Icon prefix="fal" name="eye" size={14} color={grey[500]} />
              </Box>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                평균 조회수
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  // fontWeight: "700",
                  color: grey[900],
                  // color: youhaBlue[500]
                }}
              >
                {averageCommercialViewCount
                  ? comma(averageCommercialViewCount)
                  : "집계중"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: theme.spacing(0, 0.5, 0, 0),
                }}
              >
                <Icon prefix="fal" name="flag" size={14} color={grey[500]} />
              </Box>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                한국 시청자 비율
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  // fontWeight: "700",
                  color: grey[900],
                  // color: youhaBlue[500]
                }}
              >
                78%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              "@media(max-width: 480px)": {
                width: '100%',
                height: videoShow
                  ? `calc(((100vw - 32px - 8px) / 2 / 16 * 9) + 16px)`
                  : 0,
                overflow: "hidden",
                transition: "all 0.35s ease",
              },
            }}
          >
            <Box
              sx={{
                p: theme.spacing(2, 2, 2, 2),
                "@media(max-width: 480px)": {
                  width: "100%",
                  p: theme.spacing(0, 2, 2, 2),
                },
              }}
            >
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  "@media(max-width: 480px)": {
                    width: "100%",
                  },
                }}
              >
                <Box
                  sx={{
                    "@media(max-width: 480px)": {
                      flex: 1,
                      width: "100%",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: ((130 - 32 - 2) / 9) * 16,
                      height: 130 - 32 - 2,
                      borderRadius: 1,
                      overflow: "hidden",
                      "& img": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      },
                      borderRight: `1px solid ${grey[300]}`,
                      "@media(max-width: 480px)": {
                        width: "100%",
                        height: 0,
                        p: theme.spacing(`${(9 / 16) * 100}%`, 0, 0, 0),
                      },
                    }}
                  >
                    <img src={testVideos[index].thumbnail} />
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))`,
                        p: theme.spacing(1),
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            m: theme.spacing(0, 0.5, 0, 0),
                          }}
                        >
                          <Icon
                            prefix="far"
                            name="eye"
                            size={14}
                            color={`#ffffff`}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: "16px",
                            // fontWeight: "700",
                            color: `#ffffff`,
                          }}
                        >
                          {numberToKorean(testVideos[index].viewCount)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            m: theme.spacing(0, 0.5, 0, 0),
                          }}
                        >
                          <Icon
                            prefix="far"
                            name="calendar"
                            size={14}
                            color={`#ffffff`}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: "16px",
                            // fontWeight: "700",
                            color: `#ffffff`,
                          }}
                        >
                          {dayjs(testVideos[index].createdAt).format(
                            "YYYY-MM-DD"
                          )}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
                <Box
                  sx={{
                    "@media(max-width: 480px)": {
                      flex: 1,
                      width: "100%",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: ((130 - 32) / 9) * 16,
                      height: 130 - 32,
                      borderRadius: 1,
                      overflow: "hidden",
                      "& img": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      },
                      borderRight: `1px solid ${grey[300]}`,
                      "@media(max-width: 480px)": {
                        width: "100%",
                        height: 0,
                        p: theme.spacing(`${(9 / 16) * 100}%`, 0, 0, 0),
                      },
                    }}
                  >
                    <img src={testVideos[index + 11].thumbnail} />
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))`,
                        p: theme.spacing(1),
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            m: theme.spacing(0, 0.5, 0, 0),
                          }}
                        >
                          <Icon
                            prefix="far"
                            name="eye"
                            size={14}
                            color={`#ffffff`}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: "16px",
                            // fontWeight: "700",
                            color: `#ffffff`,
                          }}
                        >
                          {numberToKorean(testVideos[index + 11].viewCount)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            m: theme.spacing(0, 0.5, 0, 0),
                          }}
                        >
                          <Icon
                            prefix="far"
                            name="calendar"
                            size={14}
                            color={`#ffffff`}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            lineHeight: "16px",
                            // fontWeight: "700",
                            color: `#ffffff`,
                          }}
                        >
                          {dayjs(testVideos[index + 11].createdAt).format(
                            "YYYY-MM-DD"
                          )}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
          <ButtonBase
            sx={{
              width: "100%",
              height: 36,
              borderTop: `1px solid ${grey[300]}`,
              // justifyContent: "center",
              p: theme.spacing(0, 2),
              justifyContent: "center",
              alignItems: "center",
              display: 'none',
              "@media(max-width: 480px)": {
                display: "flex",
              },
            }}
            disableRipple
            onClick={onClickShowVideo}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
              }}
            >
              광고영상 미리보기
            </Typography>
            <Icon
              name="chevron-down"
              size={16}
              color={grey[900]}
              sx={{
                m: theme.spacing(0, 0, 0, 0.5),
                transform: `rotate(${videoShow ? "180deg" : "0"})`,
              }}
            />
          </ButtonBase>
        </ButtonBase>
      </Link>
      <Box
        sx={{
          height: 8,
          backgroundColor: grey[200],
          display: "none",
          "@media(max-width: 480px)": {
            display: "block",
          },
        }}
      />
    </>
  );
}
