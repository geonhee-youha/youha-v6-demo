import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { pink, red } from "@mui/material/colors";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import youhaBlue from "../../constants/youhaBlue";
import { theme } from "../../themes/theme";
import { comma, numberToKorean } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import youhaGrey from "../../constants/youhaGrey";
import Checkbox from "../atoms/Checkbox";
import dayjs from "dayjs";
import { testVideos } from "../../data";
import { Chart } from "react-chartjs-2";
import { trendChartData, trendChartOptions } from "./VideoItem";
import { useRecoilState } from "recoil";
import {
  bookmarksDialogRecoilState,
  bookmarksRecoilState,
} from "../../constants/recoils";
import _ from "lodash";

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
  const {
    id,
    title,
    thumbnail,
    subscriberCount,
    standardCommercialPrice,
    averageCommercialViewCount,
  } = item;
  const [dialog, setDialog] = useRecoilState(bookmarksDialogRecoilState);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksRecoilState);
  const bookmarked = bookmarks["youtuber"]
    .flatMap((el) => el.list)
    .includes(id);
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
    setDialog((prev) => {
      return {
        ...prev,
        open: true,
        type: "youtuber",
        item: item,
      };
    });
  };
  const size = 120;
  const videos = [testVideos[index + 1], testVideos[index + 11]];
  return (
    <Link href="/" passHref>
      <ButtonBase
        sx={{
          width: "100%",
          height: size + 2,
          borderRadius: 1,
          border: `1px solid ${youhaGrey[200]}`,
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
            borderBottom: `1px solid ${youhaGrey[200]}`,
            "&:hover": {
              boxShadow: `none`,
            },
          },
          transition: "none",
        }}
        disableRipple
      >
        <Box
          sx={{
            height: "100%",
            p: theme.spacing(2, 1, 2, 2),
            borderRight: `1px solid ${youhaGrey[200]}`,
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
          <Checkbox focused={selected} onClick={onClickSelect} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            "@media(max-width: 480px)": {
              flex: "initial",
              width: "100%",
              height: "auto",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              "@media(max-width: 480px)": {
                p: theme.spacing(2, 0, 2, 2),
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: size,
                height: size,
                overflow: "hidden",
                borderRight: `1px solid ${youhaGrey[200]}`,
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
                "@media(max-width: 480px)": {
                  width: size - 32,
                  height: size - 32,
                  borderRadius: 1,
                  borderRight: `none`,
                },
              }}
            >
              <img src={thumbnail} />
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              p: theme.spacing(2, 2, 2, 2),
              "@media(max-width: 480px)": {
                height: size,
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
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    fontWeight: "700",
                    color: youhaGrey[700],
                  }}
                >
                  뷰티·패션
                </Typography>
              </Box>
              <Typo
                lines={1}
                sx={{
                  fontSize: 18,
                  lineHeight: "28px",
                  fontWeight: "700",
                  color: youhaGrey[900],
                  "@media(max-width: 480px)": {
                    fontSize: 16,
                    lineHeight: "24px",
                  },
                }}
              >
                {title}
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
                    height: 24,
                    borderRadius: 0.5,
                    backgroundColor: youhaGrey[100],
                    p: theme.spacing(0, 1),
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10,
                      lineHeight: "14px",
                      fontWeight: "700",
                      color: youhaGrey[700],
                    }}
                  >
                     롱폼 + 쇼츠
                  </Typography>
                </ButtonBase>
              )}
              {(index + 2) % 3 === 0 && (
                <ButtonBase
                  sx={{
                    height: 24,
                    borderRadius: 0.5,
                    backgroundColor: youhaBlue[50],
                    p: theme.spacing(0, 1),
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
                    height: 24,
                    borderRadius: 0.5,
                    backgroundColor: red[50],
                    p: theme.spacing(0, 1),
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
                    height: 24,
                    borderRadius: 0.5,
                    backgroundColor: pink[50],
                    p: theme.spacing(0, 1),
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
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "1fr",
            gridTemplateRows: "auto auto",
            gridRowGap: 8,
            p: theme.spacing(2, 2, 2, 2),
            width: 400 + 16,
            gridColumnGap: 16,
            borderLeft: `1px solid ${youhaGrey[200]}`,
            "&:hover": {
              "& .Cover": {
                right: 0,
              },
            },
            "@media(max-width: 480px)": {
              width: `100%`,
              p: theme.spacing(0, 2, 2, 2),
              borderLeft: `none`,
              gridRowGap: 8,
              "&:hover": {
                "& .Cover": {
                  right: "-100%",
                },
              },
            },
          }}
        >
          <DataRow
            item={{
              iconName: "users",
              title: "구독자수",
              value: <>{comma(subscriberCount)}</>,
            }}
          />
          <DataRow
            item={{
              iconName: "coins",
              title: "예상 광고단가",
              value: <>{numberToKorean(standardCommercialPrice)}원</>,
              valueColor: youhaBlue[500],
            }}
          />
          <DataRow
            item={{
              iconName: "eye",
              title: "평균 조회수",
              value: (
                <>
                  {averageCommercialViewCount
                    ? comma(averageCommercialViewCount)
                    : "집계중"}
                </>
              ),
            }}
          />
          <DataRow
            item={{
              iconName: "bullseye-arrow",
              title: "주 시청타겟",
              value: "2030 여성",
            }}
          />
          <DataRow
            item={{
              iconName: "comment",
              title: "댓글 작성률",
              value: "32%",
            }}
          />
          <DataRow
            item={{
              iconName: "thumbs-up",
              title: "콘텐츠 호감도",
              value: "72%",
            }}
          />
          <DataRow
            item={{
              iconName: "flag",
              title: "한국 시청자 비율",
              value: "78%",
            }}
          />
          <DataRow
            item={{
              iconName: "upload",
              title: "주간 업로드 빈도",
              value: "3.6회",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: `-100%`,
              bottom: 0,
              transition: "all 0.35s ease",
              backgroundColor: "#ffffff",
              width: "100%",
            }}
            className="Cover"
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: 416 / 2,
                  p: theme.spacing(2, 2, 2, 2),
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    m: theme.spacing(0, 0, 1, 0),
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
                      prefix="fad"
                      name="users"
                      size={14}
                      color={youhaGrey[500]}
                    />
                  </Box>
                  <Typography
                    sx={{
                      flex: 1,
                      color: youhaGrey[500],
                      fontSize: 12,
                      lineHeight: "16px",
                      fontWeight: 700,
                      "@media(max-width: 480px)": {
                        fontSize: 12,
                        lineHeight: "16px",
                      },
                    }}
                  >
                    주간 구독자 추이
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 120 - 16 - 8 - 32,
                  }}
                >
                  <Chart
                    type="line"
                    data={trendChartData}
                    options={trendChartOptions}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: 416 / 2,
                  p: theme.spacing(2, 2, 2, 2),
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    m: theme.spacing(0, 0, 1, 0),
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
                      prefix="fad"
                      name="eye"
                      size={14}
                      color={youhaGrey[500]}
                    />
                  </Box>
                  <Typography
                    sx={{
                      flex: 1,
                      color: youhaGrey[500],
                      fontSize: 12,
                      lineHeight: "16px",
                      fontWeight: 700,
                      "@media(max-width: 480px)": {
                        fontSize: 12,
                        lineHeight: "16px",
                      },
                    }}
                  >
                    주간 조회수 추이
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 120 - 16 - 8 - 32,
                  }}
                >
                  <Chart
                    type="line"
                    data={trendChartData}
                    options={trendChartOptions}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <ButtonBase
          sx={{
            height: "100%",
            p: theme.spacing(2),
            borderLeft: `1px solid ${youhaGrey[200]}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media(max-width: 480px)": {
              position: "absolute",
              p: 0,
              borderRight: `none`,
              borderLeft: "none",
              top: 16,
              right: 16,
              zIndex: 9,
              width: 28,
              height: 28,
              border: `1px solid ${youhaGrey[200]}`,
              borderRadius: 0.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ffffff",
            },
          }}
          disableRipple
          onClick={onClickBookmark}
        >
          <Icon
            name="bookmark"
            size={24}
            prefix={bookmarked ? "fas" : "fal"}
            color={bookmarked ? pink[500] : youhaGrey[200]}
            sx={{
              transition: "none !important",
              display: "flex",
              "@media(max-width: 480px)": {
                display: "none",
              },
            }}
          />
          <Icon
            name="bookmark"
            size={16}
            prefix={bookmarked ? "fas" : "fal"}
            color={bookmarked ? pink[500] : youhaGrey[300]}
            sx={{
              transition: "none !important",
              display: "none",
              "@media(max-width: 480px)": {
                display: "flex",
              },
            }}
          />
        </ButtonBase>
      </ButtonBase>
    </Link>
  );
}

export function DataRow({
  autoWidth,
  item,
}: {
  autoWidth?: boolean;
  item: {
    iconName: IconName;
    title: React.ReactNode;
    value: React.ReactNode;
    valueColor?: string;
  };
}) {
  const { iconName, title, value, valueColor } = item;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: autoWidth ? "initial" : "space-between",
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
        <Icon prefix="fad" name={iconName} size={14} color={youhaGrey[500]} />
      </Box>
      <Typography
        sx={{
          flex: autoWidth ? "initial" : 1,
          m: theme.spacing(0, autoWidth ? 1 : 0, 0, 0),
          color: youhaGrey[500],
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: 700,
          "@media(max-width: 480px)": {
            fontSize: 12,
            lineHeight: "16px",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: valueColor ?? youhaGrey[900],
          fontWeight: 700,
          fontSize: 12,
          lineHeight: "16px",
          "@media(max-width: 480px)": {
            fontSize: 12,
            lineHeight: "16px",
          },
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function Video({ item }: { item: any }) {
  const { thumbnail, viewCount, createdAt } = item;
  const size = 120 - 32;
  return (
    <Box
      sx={{
        position: "relative",
        width: (size / 9) * 16,
        height: size,
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
        "@media(max-width: 480px)": {
          width: "100%",
          height: 0,
          p: theme.spacing(`${(9 / 16) * 100}%`, 0, 0, 0),
        },
      }}
    >
      <img src={thumbnail} />
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
            <Icon prefix="far" name="eye" size={14} color={`#ffffff`} />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              // fontWeight: "700",
              color: `#ffffff`,
            }}
          >
            {numberToKorean(viewCount)}
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
            <Icon prefix="far" name="calendar" size={14} color={`#ffffff`} />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: "16px",
              // fontWeight: "700",
              color: `#ffffff`,
            }}
          >
            {dayjs(createdAt).format("YYYY-MM-DD")}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
