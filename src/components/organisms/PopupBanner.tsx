import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { useEffect, useState } from "react";

export type PopupBannerDataType = {
  id: string;
  thumbnail: string | null;
  url: string | null;
  order: number | null;
};

export default function PopupBanner({
  hidden,
  item,
}: {
  hidden?: boolean;
  item: PopupBannerDataType;
}) {
  const [open, setOpen] = useState<boolean>(false); // 배너 열기 닫기 제어
  const onClickHideWeek = () => {
    //다른 쿠키 및 함수 제어 필요
    setOpen(false);
  }; // 일주일간 보지 않기
  const onClickClose = () => {
    setOpen(false);
  }; // 닫기
  useEffect(() => {
    if (hidden !== false) {
      setOpen(true);
    }
  }, [hidden]); // 이미 일주일간 보지 않기(hidden === true)시 열지 않음
  useEffect(() => {
    var body: HTMLElement = document.body;
    if (body !== null) {
      if (open) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  }, [open]); //팝업 오픈시 body 스크롤 불가
  return open ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: alpha("#000000", 0.7),
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <Link href={item.url ?? "/"} passHref>
          <Box
            sx={{
              position: "relative",
              width: 343,
              height: 424,
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
            <img src={item.thumbnail ?? ""} />
          </Box>
        </Link>
        <Box sx={{ display: "flex", height: 56 }}>
          <ButtonBase
            sx={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            disableRipple
            onClick={onClickHideWeek}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
                fontWeight: "700",
              }}
            >
              일주일간 보지 않기
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              flex: 1,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            disableRipple
            onClick={onClickClose}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
                fontWeight: "700",
              }}
            >
              닫기
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  ) : null;
}
