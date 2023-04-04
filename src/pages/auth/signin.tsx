import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import Checkbox from "../../components/atoms/Checkbox";
import Container from "../../components/atoms/Container";
import Input from "../../components/atoms/Input";
import PageHeader from "../../components/organisms/PageHeader";
import {
  firstLoginDialogRecoilState,
  loginRecoilState,
} from "../../constants/recoils";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { isPassword } from "../../utils";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [firstLoginDialog, setFirstLoginDialog] = useRecoilState(
    firstLoginDialogRecoilState
  );
  const [logined, setLogined] = useState<boolean>(false);
  const onClickLogo = () => {
    router.push("/");
  };
  const onClose = () => {
    router.back();
  };
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const onChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const value = event.target.value;
    setEmailValue(value);
  };
  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const value = event.target.value;
    setPasswordValue(value);
  };
  const onClickLogined = () => {
    setLogined(!logined);
  };
  const onClickSignup = () => {
    if (typeof url === "string" && url !== "") {
      router.push(`/auth/signup?url=${url}`);
    } else {
      router.push(`/auth/signup`);
    }
  };
  const onClickGoogleLogin = () => {
    window.alert(
      "실제로는 데이터 받아온 이후, 1.이미 회원가입 되어 있으면 로그인으로 이동 2.회원가입은 되었는데 필수정보 입력이 안되어 있으면 필수정보 입력으로 이동 3.회원가입 안되어 있으면 회원등록 후 필수정보 입력으로 이동"
    );
    // if (typeof url === "string" && url !== "") {
    //   router.push(`/auth/detail?url=${url}`);
    // } else {
    //   router.push(`/auth/detail`);
    // }
  };
  const onClickConfirm = () => {
    if (emailValue === "" || !isPassword(passwordValue)) {
      setError(true);
    } else {
      setLogin(true);
      if (typeof url === "string" && url !== "") {
        router.replace(url);
      } else {
        router.back();
      }
      setFirstLoginDialog({ open: true }); //첫 로그인일 경우에만
    }
  };
  return (
    <>
      <PageHeader
        iconName="chevron-left"
        onClose={onClose}
        title={""}
        sx={{
          display: "none",
          "@media(max-width: 480px)": {
            display: "flex",
          },
        }}
      />
      <Container
        sx={{
          minWidth: 400,
          maxWidth: 400,
          "@media(max-width: 480px)": {
            minWidth: "initial",
            maxWidth: "initial",
          },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            p: theme.spacing(2, 0, 2, 0),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "@media(max-width: 480px)": {
              p: theme.spacing(4, 0, 0, 0),
              m: theme.spacing(0, -2, 0, -2),
              height: "auto",
              justifyContent: "flex-start",
            },
            "& > img": {
              width: "auto",
              height: 32,
              m: theme.spacing(0, 0, 6, 0),
              cursor: "pointer",
            },
          }}
        >
          <img src="/logos/logo.png" onClick={onClickLogo} />
          <Stack
            spacing={2}
            sx={{ width: "100%", p: theme.spacing(2, 0, 2, 0) }}
          >
            <Input
              label="이메일"
              inputValue={emailValue}
              onChange={onChangeEmailValue}
              error={error}
            />
            <Input
              label="비밀번호"
              inputValue={passwordValue}
              onChange={onChangePasswordValue}
              type="password"
              error={error}
              helperText={
                error && (
                  <>
                    가입되지 않은 계정이거나, 이메일 또는 비밀번호가
                    <br />
                    일치하지 않습니다.
                  </>
                )
              }
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", p: theme.spacing(2, 0, 2, 0) }}
          >
            <ButtonBase
              sx={{
                alignItems: "center",
              }}
              disableRipple
              onClick={onClickLogined}
            >
              <Checkbox focused={logined} size="sm" />
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[900],
                }}
              >
                로그인 유지
              </Typography>
            </ButtonBase>
            <ButtonBase
              sx={{
                alignItems: "center",
              }}
              disableRipple
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[900],
                }}
              >
                비밀번호 찾기
              </Typography>
            </ButtonBase>
          </Stack>
          <Stack
            spacing={2}
            sx={{ width: "100%", p: theme.spacing(2, 0, 2, 0) }}
          >
            <Button
              size="lg"
              fullWidth
              backgroundColor={youhaGrey[900]}
              onClick={onClickConfirm}
            >
              이메일로 로그인
            </Button>
            <Button
              size="lg"
              fullWidth
              backgroundColor={youhaGrey[900]}
              borderColor={youhaGrey[200]}
              onClick={onClickGoogleLogin}
              type="outlined"
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 2,
                  "& img": {
                    width: 20,
                    height: 20,
                  },
                }}
              >
                <img src="/logos/google.png" />
              </Box>
              구글 계정으로 시작하기
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ width: "100%", p: theme.spacing(2, 0, 10, 0) }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[900],
              }}
            >
              아직 유하 회원이 아니시라면?
            </Typography>
            <ButtonBase
              sx={{
                alignItems: "center",
              }}
              disableRipple
              onClick={onClickSignup}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: youhaGrey[900],
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
              >
                이메일로 회원가입
              </Typography>
            </ButtonBase>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
