import { Box, Dialog, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { firstLoginDialogRecoilState } from "../../constants/recoils";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Button from "../atoms/Button";
import { useRouter } from "next/router";

export default function FirstLoginDialog() {
  const router = useRouter();
  const [firstLoginDialog, setFirstLoginDialog] = useRecoilState(
    firstLoginDialogRecoilState
  );
  const { open } = firstLoginDialog;
  const onClose = () => {
    setFirstLoginDialog((prev) => {
      return {
        open: false,
      };
    });
  };
  const onClickNext = () => {
    onClose();
  };
  const onClickProposal = () => {
    onClose();
  };
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        zIndex: 99999,
        "& .MuiBackdrop-root": {
          backgroundColor: `rgba(0, 0, 0, 0.8)`,
        },
        "@media(max-width: 480px)": {
          "& > *": {
            transition: "none !important",
          },
          "& .MuiDialog-paper": {
            width: "100%",
            transition: "none",
            maxWidth: "initial",
            height: "100vh",
            maxHeight: "initial",
            borderRadius: 0,
            m: 0,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 600,
          "@media(max-width: 480px)": {
            width: "100%",
            height: "100%",
          },
          p: theme.spacing(4, 2, 2, 2),
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 64,
                lineHeight: "64px",
                fontWeight: 700,
              }}
            >
              👏
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                lineHeight: "32px",
                fontWeight: 900,
                textAlign: "center",
                m: theme.spacing(2, 0, 0, 0),
              }}
            >
              유하 회원가입을
              <br />
              진심으로 환영합니다!
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                textAlign: "center",
                m: theme.spacing(1, 0, 2, 0),
              }}
            >
              지금 유하에서 유튜버 제안하시면
              <br />
              프로모션 혜택 블라블라
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: "100%", p: theme.spacing(2, 12) }}
          >
            <Button
              size="lg"
              backgroundColor={youhaBlue[50]}
              color={youhaBlue[500]}
              sx={{
                width: 120,
              }}
              onClick={onClickNext}
            >
              다음에요!
            </Button>
            <Box sx={{ flex: 1 }}>
              <Button size="lg" fullWidth onClick={onClickProposal}>
                유하 전용 제안 알아보기
              </Button>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  textAlign: "center",
                  color: youhaGrey[700],
                  m: theme.spacing(1, 0, 0, 0),
                }}
              >
                원하신다면 언제든 가능합니다!
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            zIndex: 0,
            width: 800,
            height: 800,
            transform: "translateY(-50%)",
          }}
        >
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="lotties/firework01.json"
            style={{
              width: "100%",
              height: "100%",
            }}
          ></lottie-player>
        </Box>
      </Box>
    </Dialog>
  );
}
