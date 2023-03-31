import { alpha, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { grey, pink, red } from "@mui/material/colors";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import youhaBlue from "../../constants/youhaBlue";
import { testCreators, testVideos } from "../../data";
import { theme } from "../../themes/theme";
import { comma, numberToKorean } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";
import dayjs from "dayjs";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash";
import { DataRow } from "./YoutuberItem";

export default function VideoItem({
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
    description,
    thumbnail,
    viewCount,
    likeCount,
    commentsCount,
    createdAt,
  } = item;
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
  const youtuber = testCreators[Math.floor(Math.random() * 20)];
  return (
    <Box>
      <Link href="/" passHref>
        <ButtonBase
          sx={{
            width: "100%",
            flexDirection: "column",
            borderRadius: 1,
            border: `1px solid ${grey[300]}`,
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
              height: "auto",
              borderBottom: `1px solid ${grey[300]}`,
            },
            transition: "none",
          }}
          disableRipple
        >
          <Box
            sx={{
              width: `100%`,
              "@media(max-width: 480px)": {
                p: theme.spacing(2, 2, 0, 2),
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 0,
                p: theme.spacing(`56.25%`, 0, 0, 0),
                "@media(max-width: 480px)": {
                  borderRadius: 1,
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
                  left: 8,
                  top: 8,
                  width: 24,
                  height: 24,
                  borderRadius: 0.5,
                  boxShadow: `${
                    selected ? youhaBlue[500] : grey[300]
                  } 0px 0px 0px 1px`,
                  backgroundColor: selected ? youhaBlue[500] : `#ffffff`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "none !important",
                  zIndex: 9,
                }}
                disableRipple
                onClick={onClickSelect}
                className="Checkbox"
              >
                <Icon
                  name="check"
                  color="#ffffff"
                  prefix="fas"
                  size={18}
                  sx={{
                    opacity: selected ? 1 : 0,
                    transition: "none !important",
                  }}
                />
              </ButtonBase>
              <ButtonBase
                sx={{
                  position: "absolute",
                  right: 8,
                  bottom: 8,
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  backgroundColor: `#ffffff`,
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${grey[300]}`,
                  transition: "none !important",
                  zIndex: 9,
                }}
                disableRipple
                onClick={onClickBookmark}
              >
                <Icon
                  name="bookmark"
                  size={20}
                  prefix={bookmarked ? "fas" : "fal"}
                  color={bookmarked ? pink[500] : grey[300]}
                  sx={{
                    transition: "none !important",
                  }}
                />
              </ButtonBase>
            </Box>
          </Box>
          <Box
            sx={{
              p: theme.spacing(2, 2, 2, 2),
            }}
          >
            <Youtuber item={youtuber} />
            <Typo
              lines={2}
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "700",
                color: grey[900],
                m: theme.spacing(0, 0, 1, 0),
              }}
            >
              {title}
            </Typo>
            <Typo
              lines={3}
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[700],
              }}
            >
              {description}
            </Typo>
          </Box>
          <Box
            sx={{
              width: `100%`,
              p: theme.spacing(0, 2, 2, 2),
              display: "grid",
              gridTemplateColumns: "1fr",
              gridAutoRows: "1fr",
              gridTemplateRows: "auto auto",
              gridRowGap: 4,
              "@media(max-width: 480px)": {
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: 16,
              },
            }}
          >
            <DataRow
              item={{
                iconName: "eye",
                title: "조회수",
                value: (
                  <>
                    {viewCount === null ? "비공개" : numberToKorean(viewCount)}
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
                    {likeCount === null ? "비공개" : numberToKorean(likeCount)}
                  </>
                ),
              }}
            />
            <DataRow
              item={{
                iconName: "calendar",
                title: "업로드",
                value: (
                  <>
                    {createdAt === null
                      ? "비공개"
                      : dayjs(createdAt).format(`YYYY년 MM월 DD일`)}
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
          </Box>
        </ButtonBase>
      </Link>
      <Box
        sx={{
          height: 8,
          backgroundColor: grey[300],
          display: "none",
          "@media(max-width: 480px)": {
            display: "block",
          },
        }}
      />
    </Box>
  );
}

function Youtuber({ item }: { item: any }) {
  const { title, thumbnail } = item;
  return (
    <ButtonBase
      sx={{
        // position: "absolute",
        // left: 8,
        // bottom: 8,
        alignItems: "center",
        m: theme.spacing(0, 0, 2, 0),
        borderRadius: 0.5,
        overflow: "hidden",
        border: `1px solid ${grey[300]}`,
        backgroundColor: "#ffffff",
        p: theme.spacing(0, 1, 0, 0),
        boxShadow: `rgb(0 0 0 / 4%) 0px 2px 8px`,
        // backgroundColor: grey[300]
      }}
      disableRipple
    >
      <Box
        sx={{
          position: "relative",
          width: 28,
          height: 28,
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
          color: grey[900],
        }}
      >
        {title}
      </Typo>
    </ButtonBase>
  );
}
