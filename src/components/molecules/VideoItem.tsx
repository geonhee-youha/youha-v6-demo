import { Box, ButtonBase, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import youhaBlue from "../../constants/youhaBlue";
import { testCreators } from "../../data";
import { theme } from "../../themes/theme";
import { numberToKorean } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";
import dayjs from "dayjs";
import _ from "lodash";
import { DataRow } from "./YoutuberItem";
import youhaGrey from "../../constants/youhaGrey";
import { Chart } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import {
  bookmarksDialogRecoilState,
  bookmarksRecoilState,
} from "../../constants/recoils";

export default function VideoItem({
  index,
  selectedIds,
  setSelectedIds,
  item,
  shorts,
}: {
  index: number;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  item: any;
  shorts?: boolean;
}) {
  const {
    id,
    title,
    description,
    thumbnail,
    viewCount,
    likeCount,
    commentsCount,
    createdAt,
  } = item;
  const type = shorts ? "shorts" : "video"
  const [dialog, setDialog] = useRecoilState(bookmarksDialogRecoilState);
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksRecoilState);
  const bookmarked = bookmarks[type]
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
        type: type,
        item: item,
      };
    });
  };
  const youtuber = testCreators[Math.floor(Math.random() * 20)];
  const contentsHeight = 237;
  return (
    <Link href="/" passHref>
      <ButtonBase
        sx={{
          width: "100%",
          flexDirection: "column",
          borderRadius: 1,
          border: `1px solid ${youhaGrey[200]}`,
          overflow: "hidden",
          boxShadow: `rgb(0 0 0 / 4%) 0px 2px 8px`,
          "&:hover": {
            boxShadow: `rgb(0 0 0 / 8%) 0px 4px 20px`,
          },
          "@media(max-width: 480px)": {
            borderRadius: 0,
            borderTop: `none`,
            borderLeft: `none`,
            borderRight: `none`,
            borderBottom: `1px solid ${youhaGrey[200]}`,
            boxShadow: `none`,
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
            width: "100%",
            display: "flex",
            flexDirection: shorts ? "row" : "column",
          }}
        >
          <Box
            sx={{
              width: shorts ? "auto" : "100%",
              "@media(max-width: 480px)": {
                width: shorts ? "auto" : "100%",
                p: theme.spacing(2, shorts ? 0 : 2, shorts ? 2 : 0, 2),
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: shorts ? (contentsHeight / 16) * 9 : "100%",
                height: 0,
                p: theme.spacing(
                  shorts ? `${contentsHeight}px` : `56.25%`,
                  0,
                  0,
                  0
                ),
                "@media(max-width: 480px)": {
                  borderRadius: 1,
                  width: shorts ? ((contentsHeight - 50) / 16) * 9 : "100%",
                  height: 0,
                  p: theme.spacing(
                    shorts ? `${contentsHeight - 50}px` : `56.25%`,
                    0,
                    0,
                    0
                  ),
                },
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
                "&::after": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  content: '""',
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <img src={thumbnail} />
              <ButtonBase
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 9,
                  width: 28,
                  height: 28,
                  border: `1px solid ${youhaGrey[200]}`,
                  borderRadius: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                }}
                disableRipple
                onClick={onClickBookmark}
              >
                <Icon
                  name="bookmark"
                  size={16}
                  prefix={bookmarked ? "fas" : "fal"}
                  color={bookmarked ? pink[500] : youhaGrey[300]}
                  sx={{
                    transition: "none !important",
                  }}
                />
              </ButtonBase>
            </Box>
          </Box>
          <Box
            sx={{
              flex: shorts ? 1 : "initial",
              "@media(max-width: 480px)": {
                flex: "initial",
              },
            }}
          >
            <Box
              sx={{
                p: theme.spacing(2, 2, 2, 2),
                minHeight: 164,
              }}
            >
              <Box
                sx={{
                  m: theme.spacing(0, 0, 1, 0),
                }}
              >
                <Youtuber shorts={shorts} item={youtuber} />
              </Box>
              <Typo
                lines={2}
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: "700",
                  color: youhaGrey[900],
                  m: theme.spacing(0, 0, 1, 0),
                  // "@media(max-width: 480px)": {
                  //   fontSize: shorts ? 14 : 16,
                  //   lineHeight: shorts ? "20px" : "24px",
                  // },
                }}
              >
                {title}
              </Typo>
              <Typo
                lines={3}
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: youhaGrey[700],
                  // "@media(max-width: 480px)": {
                  //   fontSize: shorts ? 12 : 14,
                  //   lineHeight: shorts ? "16px" : "20px",
                  // },
                }}
              >
                {description}
              </Typo>
            </Box>
            <Box
              sx={{
                borderTop: `1px solid ${youhaGrey[200]}`,
                position: "relative",
                overflow: "hidden",
                width: `100%`,
                p: theme.spacing(2, 2, 2, 2),
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "1fr",
                gridTemplateRows: "auto auto",
                gridColumnGap: 16,
                gridRowGap: 8,
                "&:hover": {
                  "& .Cover": {
                    bottom: 0,
                  },
                },
                "@media(max-width: 480px)": {
                  gridTemplateColumns: shorts ? "1fr 1fr" : "1fr 1fr",
                  gridColumnGap: 16,
                  borderTop: "none",
                  p: theme.spacing(0, 2, 2, 2),
                  "&:hover": {
                    "& .Cover": {
                      bottom: "-100%",
                    },
                  },
                },
              }}
            >
              <DataRow
                item={{
                  iconName: "calendar",
                  title: "업로드",
                  value: (
                    <>
                      {createdAt === null
                        ? "비공개"
                        : dayjs(createdAt).format(`YYYY.MM.DD`)}
                    </>
                  ),
                }}
              />
              <DataRow
                item={{
                  iconName: "eye",
                  title: "조회수",
                  value: (
                    <>
                      {viewCount === null
                        ? "비공개"
                        : numberToKorean(viewCount)}
                    </>
                  ),
                }}
              />
              <DataRow
                item={{
                  iconName: "thumbs-up",
                  title: "좋아요 수",
                  value: (
                    <>
                      {likeCount === null
                        ? "비공개"
                        : numberToKorean(likeCount)}
                    </>
                  ),
                }}
              />
              <DataRow
                item={{
                  iconName: "comment",
                  title: "댓글 수",
                  value: (
                    <>
                      {commentsCount === null
                        ? "비공개"
                        : numberToKorean(commentsCount)}
                    </>
                  ),
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: `-100%`,
                  transition: "all 0.35s ease",
                  height: "100%",
                  backgroundColor: "#ffffff",
                }}
                className="Cover"
              >
                <Box
                  sx={{
                    p: theme.spacing(2, 2, 2, 2),
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      m: theme.spacing(0, 2, 1, 0),
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
                      flex: 1,
                      width: 120,
                      height: 50,
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
        </Box>
      </ButtonBase>
    </Link>
  );
}

function Youtuber({ shorts, item }: { shorts?: boolean; item: any }) {
  const { title, thumbnail } = item;
  return (
    <ButtonBase
      sx={{
        display: "flex",
        alignItems: "center",
        width: "auto",
        border: `1px solid ${youhaGrey[200]}`,
        borderRadius: 0.5,
        overflow: "hidden",
        p: theme.spacing(0, 1, 0, 0),
        boxShadow: `rgb(0 0 0 / 4%) 0px 2px 8px`,
        backgroundColor: "#ffffff",
      }}
      disableRipple
    >
      <Box
        sx={{
          position: "relative",
          width: 26,
          height: 26,
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
        }}
      >
        <img src={thumbnail} />
      </Box>
      <Typo
        lines={1}
        sx={{
          flex: 1,
          m: theme.spacing(0, 0, 0, 1),
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: "700",
          color: youhaGrey[500],
        }}
      >
        {title}
      </Typo>
    </ButtonBase>
  );
}

export const trendChartData = {
  labels: ["6/2", "6/9", "6/16", "6/23", "6/30", "7/6", "7/13", "7/20"],
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      data: [0.3, 40.5, 58.1, 90.8, 112.2, 140.3, 168.2, 300],
      pointRadius: 2,
      pointBorderWidth: 2,
      borderWidth: 2,
      backgroundColor: youhaGrey[50],
      borderColor: youhaBlue[500],
      curve: 3,
    },
    // {
    //     type: "line" as const,
    //     label: "Dataset 2",
    //     data: [160, 100, 40, 84, 36, 64, 250, 150],
    //     pointRadius: 6,
    //     pointBorderWidth: 6,
    //     borderWidth: 8,
    //     backgroundColor: youhaGrey[50],
    //     borderColor: green[500],
    //     curve: 3,
    // },
  ],
};
export const trendChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        display: false,
        font: {
          size: 8,
          family: "Pretendard",
          weight: "700",
        },
        color: youhaGrey[300],
      },
      grid: {
        // display: false,
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        font: {
          size: 8,
          family: "Pretendard",
          weight: "700",
        },
        color: youhaGrey[300],
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: false,
};
