import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import _ from "lodash";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import Container from "../../components/atoms/Container";
import Icon from "../../components/atoms/Icon";
import Input, { InputLabel } from "../../components/atoms/Input";
import PageHeader from "../../components/organisms/PageHeader";
import TermsDialog from "../../components/organisms/TermsDialog";
import { loginRecoilState } from "../../constants/recoils";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { isEmail, isPassword } from "../../utils";

export const userType = [
  {
    emoji: "🏢",
    title: "광고주",
    value: "advertiser",
    description: <>광고 의뢰 및 유튜버 찾기가 필요하시다면?</>,
  },
  {
    emoji: "🎙️",
    title: "인플루언서",
    value: "influencer",
    description: <>광고 수주 및 선정산 서비스 등이 필요하시다면?</>,
  },
];

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
  const [userTypeValue, setUserTypeValue] = useState<string>("advertiser");
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
          <Box
            sx={{
              width: "100%",
              m: theme.spacing(0, 0, 2, 0),
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                lineHeight: "36px",
                fontWeight: 700,
              }}
            >
              회원정보 입력하기
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[400],
              }}
            >
              회원정보를 입력하시고, 유하 이용을 시작하세요!
            </Typography>
          </Box>
          <Stack
            spacing={2}
            sx={{ width: "100%", p: theme.spacing(4, 0, 4, 0) }}
          >
            <Box>
              <InputLabel>
                회원타입 선택<span>*</span>
              </InputLabel>
              <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                {userType.map((item, index) => {
                  const { emoji, title, value, description } = item;
                  const focused = value === userTypeValue;
                  const onClick = () => {
                    setUserTypeValue(value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        flex: 1,
                        borderRadius: 1,
                        border: `1px solid ${
                          focused ? youhaBlue[500] : youhaGrey[200]
                        }`,
                        p: 2,
                        overflow: "hidden",
                        boxShadow: `rgb(0 0 0 / 4%) 0px 2px 8px`,
                        "&:hover": {
                          boxShadow: `rgb(0 0 0 / 8%) 0px 4px 20px`,
                          "& *": {
                            opacity: 0.7,
                          },
                        },
                        "@media(max-width: 480px)": {
                          "&:hover": {
                            boxShadow: `none`,
                            "& *": {
                              opacity: 1,
                            },
                          },
                        },
                        transition: "none",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 32,
                          m: theme.spacing(0, 0, 1, 0),
                        }}
                      >
                        {emoji}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 16,
                          lineHeight: "24px",
                          fontWeight: 700,
                          m: theme.spacing(0, 0, 1, 0),
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          lineHeight: "16px",
                          textAlign: "center",
                          color: youhaGrey[400],
                        }}
                      >
                        {description}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Stack>
            </Box>
            <Stack direction="row" spacing={1}>
              <Input
                label="성"
                inputValue={passwordValue}
                onChange={onChangePasswordValue}
                error={passwordError}
                helperText={
                  passwordError && "비밀번호 형식이 올바르지 않습니다."
                }
                essential
              />
              <Input
                label="이름"
                inputValue={passwordConfirmValue}
                onChange={onChangePasswordConfirmValue}
                error={passwordConfirmError}
                helperText={
                  passwordConfirmError && "위와 비밀번호가 일치하지 않습니다."
                }
                essential
              />
            </Stack>
            {userTypeValue === "advertiser" && (
              <>
                <Input
                  label="회사명"
                  inputValue={passwordValue}
                  onChange={onChangePasswordValue}
                  error={passwordError}
                  helperText={
                    passwordError && "비밀번호 형식이 올바르지 않습니다."
                  }
                  essential
                />
                <Input
                  label="직책"
                  inputValue={passwordConfirmValue}
                  onChange={onChangePasswordConfirmValue}
                  error={passwordConfirmError}
                  helperText={
                    passwordConfirmError && "위와 비밀번호가 일치하지 않습니다."
                  }
                  essential
                />
              </>
            )}
            <Box>
              <InputLabel>
                휴대폰 인증<span>*</span>
              </InputLabel>
              <Button
                fullWidth
                type="outlined"
                backgroundColor={youhaGrey[500]}
                color={youhaGrey[900]}
              >
                휴대폰 인증하기
              </Button>
            </Box>
            {userTypeValue === "influencer" && (
              <Box>
                <InputLabel>
                  채널 인증<span>*</span>
                </InputLabel>
                <Button
                  fullWidth
                  backgroundColor={youhaGrey[900]}
                  borderColor={youhaGrey[200]}
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
                  유튜브 채널 인증하기
                </Button>
              </Box>
            )}
          </Stack>
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
              유하 시작하기
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
