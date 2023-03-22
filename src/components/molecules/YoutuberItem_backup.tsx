import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import youhaBlue from "../../constants/youhaBlue";
import { theme } from "../../themes/theme";
import { comma } from "../../utils";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";

export default function YoutuberItem({
  selectedIds,
  setSelectedIds,
  item,
}: {
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  item: any;
}) {
  console.log(item);
  const {
    id,
    title,
    thumbnail,
    subscriberCount,
    standardCommercialPrice,
    averageCommercialViewCount,
  } = item;
  const selected = selectedIds.includes(id);
  const onClickSelect = (e: any) => {
    e.preventDefault();
    const newValue = selected
      ? selectedIds.filter((el) => el !== id)
      : [...selectedIds, id];
    setSelectedIds(newValue);
  };
  return (
    <Link href="/" passHref>
      <ButtonBase
        sx={{
          height: 126,
          borderRadius: 0.5,
          border: `1px solid ${grey[300]}`,
          transition: `all 0.35s ease`,
          "&:hover": {
            boxShadow: `rgb(0 0 0 / 8%) 0px 4px 20px`,
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
              backgroundColor: selected ? youhaBlue[500] : "transparent",
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
            flex: 1,
            height: "100%",
            p: theme.spacing(2),
            borderRight: `1px solid ${grey[300]}`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 126 - 2 - 32,
              height: 126 - 2 - 32,
              borderRadius: "50%",
              overflow: "hidden",
              "& img": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                objectFit: "cover",
              },
              m: theme.spacing(0, 2, 0, 0),
            }}
          >
            <img src={thumbnail} />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              sx={{
                m: theme.spacing(0, 0, 0.5, 0),
              }}
            >
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
            <Box
              sx={{
                flex: 1,
                m: theme.spacing(1, 0, 0, 0),
              }}
            >
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
                  연락가능
                </Typography>
              </ButtonBase>
            </Box>
          </Box>
        </Box>
        <Stack
          spacing={0.5}
          sx={{
            width: 240,
            height: "100%",
            p: theme.spacing(2),
            borderRight: `1px solid ${grey[300]}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                flex: 1,
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
              }}
            >
              구독자수
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
                color: grey[900],
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
            <Typography
              sx={{
                flex: 1,
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
              }}
            >
              예상 광고단가
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
                color: grey[900],
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
            <Typography
              sx={{
                flex: 1,
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
              }}
            >
              주 시청타겟
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
                color: grey[900],
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
            <Typography
              sx={{
                flex: 1,
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
              }}
            >
              평균 조회수
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: "700",
                color: grey[900],
              }}
            >
              {averageCommercialViewCount
                ? comma(averageCommercialViewCount)
                : "집계중"}
            </Typography>
          </Box>
        </Stack>
        <Stack
          sx={{
            p: theme.spacing(2),
            width: 240,
          }}
        ></Stack>
      </ButtonBase>
    </Link>
  );
}
