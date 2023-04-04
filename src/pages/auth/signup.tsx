import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import Container from "../../components/atoms/Container";
import Icon from "../../components/atoms/Icon";
import Input from "../../components/atoms/Input";
import PageHeader from "../../components/organisms/PageHeader";
import TermsDialog from "../../components/organisms/TermsDialog";
import { loginRecoilState } from "../../constants/recoils";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { isEmail, isPassword } from "../../utils";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const onClickLogo = () => {
    router.push("/");
  };
  const onClose = () => {
    router.back();
  };
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);
  const [terms, setTerms] = useState<boolean[]>([false, false, false]);
  const [termsError, setTermsError] = useState<boolean>(false);
  const agreed = terms[0] === true && terms[1] === true;
  const onChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    const value = event.target.value;
    setEmailValue(value);
  };
  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    const value = event.target.value;
    setPasswordValue(value);
  };
  const onChangePasswordConfirmValue = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmError(false);
    const value = event.target.value;
    setPasswordConfirmValue(value);
  };
  const onClickTerms = () => {
    setTermsError(false);
    setTerms(
      _.filter(terms, (el) => el === true).length === 3
        ? [false, false, false]
        : [true, true, true]
    );
  };
  const onClickTermsDialog = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogOpen(true);
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
    if (!isEmail(emailValue)) return setEmailError(true);
    if (!isPassword(passwordValue)) return setPasswordError(true);
    if (passwordValue !== passwordConfirmValue)
      return setPasswordConfirmError(true);
    if (!agreed) return setTermsError(true);
    if (typeof url === "string" && url !== "") {
      router.push(`/auth/detail?url=${url}`);
    } else {
      router.push(`/auth/detail`);
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
              error={emailError}
              placeholder="example@youha.info"
              helperText={emailError && "이메일 형식이 올바르지 않습니다."}
            />
            <Input
              label="비밀번호"
              inputValue={passwordValue}
              onChange={onChangePasswordValue}
              type="password"
              error={passwordError}
              placeholder="영문, 숫자 포함 6자"
              helperText={passwordError && "비밀번호 형식이 올바르지 않습니다."}
            />
            <Input
              label="비밀번호 확인"
              inputValue={passwordConfirmValue}
              onChange={onChangePasswordConfirmValue}
              type="password"
              error={passwordConfirmError}
              placeholder="영문, 숫자 포함 6자"
              helperText={
                passwordConfirmError && "위와 비밀번호가 일치하지 않습니다."
              }
            />
          </Stack>
          <Box
            sx={{
              flexDirection: "column",
              width: "100%",
              p: theme.spacing(2, 0, 2, 0),
            }}
          >
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                width: "100%",
                cursor: "pointer",
                "& *": {
                  cursor: "pointer",
                },
                "&:hover .Label": {
                  opacity: 0.7,
                },
              }}
              onClick={onClickTerms}
            >
              <Icon
                prefix={agreed ? "fas" : "far"}
                name="check-circle"
                size={20}
                color={agreed ? youhaBlue[500] : youhaGrey[900]}
              />
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    color: youhaGrey[900],
                  }}
                  className="Label"
                >
                  유하 가입 약관에 모두 동의합니다.
                </Typography>
              </Box>
              <ButtonBase
                sx={{
                  alignItems: "center",
                }}
                disableRipple
                onClick={onClickTermsDialog}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: youhaGrey[400],
                    textDecoration: "underline",
                  }}
                >
                  확인하기
                </Typography>
              </ButtonBase>
            </Stack>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                color: youhaGrey[600],
                m: theme.spacing(1, 0, 0, 0),
              }}
            >
              서비스 이용약관(필수), 개인정보 수집동의(필수), 마케팅
              수신동의(선택)
            </Typography>
            {termsError && (
              <Box
                sx={{
                  m: theme.spacing(1, 0, 0, 0),
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Icon
                  size={14}
                  name="exclamation-circle"
                  color={red[500]}
                  sx={{
                    m: theme.spacing(0.125, 0.5, 0, 0),
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: red[500],
                  }}
                >
                  약관에 동의하셔야 가입이 가능합니다.
                </Typography>
              </Box>
            )}
          </Box>
          <Stack
            spacing={2}
            sx={{ width: "100%", p: theme.spacing(2, 0, 10, 0) }}
          >
            <Button
              size="lg"
              fullWidth
              backgroundColor={youhaGrey[900]}
              onClick={onClickConfirm}
            >
              이메일로 회원가입
            </Button>
            <Stack
              direction={"row"}
              alignItems="center"
              spacing={1}
              sx={{
                p: theme.spacing(2, 0),
              }}
            >
              <Box
                sx={{ flex: 1, height: `1px`, backgroundColor: youhaGrey[200] }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: youhaGrey[700],
                }}
              >
                또는
              </Typography>
              <Box
                sx={{ flex: 1, height: `1px`, backgroundColor: youhaGrey[200] }}
              />
            </Stack>
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
        </Box>
      </Container>
      <TermsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        terms={terms}
        setTerms={setTerms}
      />
    </>
  );
}
