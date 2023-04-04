import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../../components/atoms/Button";
import Container from "../../components/atoms/Container";
import Input, { InputLabel } from "../../components/atoms/Input";
import PageHeader from "../../components/organisms/PageHeader";
import {
  firstLoginDialogRecoilState,
  loginRecoilState,
} from "../../constants/recoils";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import { comma } from "../../utils";
import SelectBox from "../../components/atoms/SelectBox";
import { userTypes } from "../../constants";
import PhoneVerificationDialog from "../../components/organisms/PhoneVerificationDialog";
import { testCreators } from "../../data";

export default function Page() {
  const router = useRouter();
  const { url } = router.query;
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [firstLoginDialog, setFirstLoginDialog] = useRecoilState(
    firstLoginDialogRecoilState
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const onClickLogo = () => {
    router.push("/");
  };
  const onClose = () => {
    router.back();
  };
  const [userTypeValue, setUserTypeValue] = useState<string>("advertiser");
  const [advertiserTypeValue, setAdvertiserTypeValue] = useState<string>(
    userTypes[0].types[0].value
  );
  const [creatorTypeValue, setCreatorTypeValue] = useState<string>(
    userTypes[1].types[0].value
  );
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [companyNameValue, setCompanyNameValue] = useState<string>("");
  const [roleNameValue, setRoleNameValue] = useState<string>("");

  const onChangeLastNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLastNameValue(value);
  };
  const onChangeFirsttNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFirstNameValue(value);
  };
  const onChangeCompanyNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCompanyNameValue(value);
  };
  const onChangeRoleNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoleNameValue(value);
  };

  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [channelVerified, setChannelVerfiied] = useState<boolean>(false);

  const onClickPhoneVerificationDialog = () => {
    setDialogOpen(true);
  };
  const onClickChannelVerification = () => {
    setChannelVerfiied(true);
  };
  const passable =
    phoneVerified &&
    (userTypeValue === "advertiser"
      ? lastNameValue !== "" &&
        firstNameValue !== "" &&
        companyNameValue !== "" &&
        roleNameValue !== ""
      : creatorTypeValue === "유튜버"
      ? lastNameValue !== "" && firstNameValue !== "" && channelVerified
      : lastNameValue !== "" &&
        firstNameValue !== "" &&
        companyNameValue !== "" &&
        roleNameValue !== "");
  const onClickConfirm = () => {
    setLogin(true);
    if (typeof url === "string" && url !== "") {
      router.replace(`${url}`);
    } else {
      router.replace("/");
    }
    setFirstLoginDialog({ open: true });
  };
  return (
    <>
      <PageHeader
        iconName="chevron-left"
        onClose={onClose}
        title={""}
        sx={{
          position: "sticky",
          top: 0,
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
            minHeight: "100vh",
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
                {userTypes.map((item, index) => {
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
                inputValue={lastNameValue}
                onChange={onChangeLastNameValue}
                essential
              />
              <Input
                label="이름"
                inputValue={firstNameValue}
                onChange={onChangeFirsttNameValue}
                essential
              />
            </Stack>
            {userTypeValue === "advertiser" ? (
              <SelectBox
                essential
                label="회사 구분"
                list={userTypes[0].types}
                value={advertiserTypeValue}
                setValue={setAdvertiserTypeValue}
              />
            ) : (
              <SelectBox
                essential
                label="회원 구분"
                list={userTypes[1].types}
                value={creatorTypeValue}
                setValue={setCreatorTypeValue}
              />
            )}
            {userTypeValue === "creator" && creatorTypeValue === "유튜버" && (
              <Box>
                <InputLabel>
                  채널 인증<span>*</span>
                </InputLabel>
                <Button
                  fullWidth
                  backgroundColor={youhaGrey[900]}
                  borderColor={youhaGrey[200]}
                  type="outlined"
                  onClick={onClickChannelVerification}
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
                  {channelVerified ? "다시 인증하기" : "유튜브 채널 인증하기"}
                </Button>
                {channelVerified && (
                  <Stack
                    sx={{
                      p: theme.spacing(2, 0),
                    }}
                  >
                    {testCreators.slice(0, 3).map((item, index) => {
                      return <Youtuber key={index} item={item} />;
                    })}
                  </Stack>
                )}
              </Box>
            )}
            {(userTypeValue === "advertiser" || creatorTypeValue === "MCN") && (
              <>
                <Input
                  label="회사명"
                  inputValue={companyNameValue}
                  onChange={onChangeCompanyNameValue}
                  essential
                />
                <Input
                  label="직책"
                  inputValue={roleNameValue}
                  onChange={onChangeRoleNameValue}
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
                onClick={onClickPhoneVerificationDialog}
                disabled={phoneVerified}
                sx={{
                  boxShadow: `${youhaBlue[500]} 0px 0px 0px 1px inset !important`,
                  color: `${youhaBlue[500]} !important`,
                }}
              >
                {phoneVerified ? "인증 완료" : "휴대폰 인증하기"}
              </Button>
            </Box>
          </Stack>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: youhaGrey[500],
              textAlign: "center",
            }}
          >
            위 내용이 허위로 기재된 것으로 드러날 경우,
            <br />
            유하 회원약관에 근거해 계정이 정지될 수 있습니다.
          </Typography>
          <Stack
            spacing={2}
            sx={{ width: "100%", p: theme.spacing(2, 0, 10, 0) }}
          >
            <Button
              size="lg"
              fullWidth
              backgroundColor={youhaGrey[900]}
              onClick={onClickConfirm}
              disabled={!passable}
            >
              유하 시작하기
            </Button>
          </Stack>
        </Box>
      </Container>
      <PhoneVerificationDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        phoneVerified={phoneVerified}
        setPhoneVerified={setPhoneVerified}
      />
    </>
  );
}

function Youtuber({ item }: { item: any }) {
  const { thumbnail, title, subscriberCount } = item;
  return (
    <Box
      sx={{
        p: theme.spacing(1, 0),
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 40,
          height: 40,
          overflow: "hidden",
          borderRadius: 1,
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
        }}
      >
        <img src={thumbnail} />
      </Box>
      <Box
        sx={{
          p: theme.spacing(0, 0, 0, 1.5),
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            color: youhaGrey[600],
          }}
        >
          구독자 {comma(subscriberCount)}명
        </Typography>
      </Box>
    </Box>
  );
}
