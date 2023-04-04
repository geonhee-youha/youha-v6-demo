import { Box, ButtonBase, Dialog, Stack, Typography } from "@mui/material";
import _ from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Button from "../atoms/Button";
import Checkbox from "../atoms/Checkbox";
import CheckItem from "../molecules/CheckItem";
import PageHeader from "./PageHeader";

export default function TermsDialog({
  open,
  setOpen,
  terms,
  setTerms,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  terms: boolean[];
  setTerms: Dispatch<SetStateAction<boolean[]>>;
}) {
  const [tempTerms, setTempTerms] = useState<boolean[]>([false, false, false]);
  const focused = tempTerms[0] && tempTerms[1];
  const onClose = () => {
    setOpen(false);
  };
  const onClickCheckItem = (index: number) => {
    const focused = tempTerms[index];
    setTempTerms((prev) => {
      let newPrev = _.cloneDeep(prev);
      newPrev[index] = focused ? false : true;
      return newPrev;
    });
  };
  const onClickTermsItem = (e: any, index: number) => {};
  const onClickAll = () => {
    setTempTerms((prev) => {
      const focused = prev[0] && prev[1];
      const newValue = focused ? [false, false, false] : [true, true, true];
      return newValue;
    });
  };
  const onCilckConfirm = () => {
    onClose();
    setTerms(tempTerms);
  };
  useEffect(() => {
    setTempTerms(terms);
  }, [terms]);
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
          display: "flex",
          flexDirection: "column",
          width: 360,
          "@media(max-width: 480px)": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <PageHeader onClose={onClose} title="유하 가입약관" />
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(1, 2),
            height: 200,
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              p: theme.spacing(1, 0),
            }}
          >
            <ButtonBase
              sx={{
                width: "100%",
                p: theme.spacing(0, 0, 2, 0),
                borderBottom: `1px solid ${youhaGrey[200]}`,
              }}
              disableRipple
              onClick={onClickAll}
            >
              <Checkbox size="lg" focused={focused} color={youhaGrey[900]} />
              <Typography
                sx={{
                  fontSize: 16,
                  lineHeight: "24px",
                  color: youhaGrey[900],
                  fontWeight: 500,
                }}
              >
                전체 선택
              </Typography>
            </ButtonBase>
            <Stack
              sx={{
                width: "100%",
                p: theme.spacing(1, 0),
              }}
            >
              <CheckItem
                fullWidth
                focused={tempTerms[0]}
                item={{
                  value: "",
                  title: "[필수] 유하 통합서비스약관",
                }}
                onClick={() => onClickCheckItem(0)}
                color={youhaGrey[900]}
              >
                <ButtonBase
                  sx={{
                    alignItems: "center",
                  }}
                  disableRipple
                  onClick={(e: any) => onClickTermsItem(e, 0)}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: "16px",
                      color: youhaGrey[400],
                      textDecoration: "underline",
                    }}
                  >
                    보기
                  </Typography>
                </ButtonBase>
              </CheckItem>
              <CheckItem
                fullWidth
                focused={tempTerms[1]}
                item={{
                  value: "",
                  title: "[필수] 개인정보 수집 및 이용 동의",
                }}
                onClick={() => onClickCheckItem(1)}
                color={youhaGrey[900]}
              >
                <ButtonBase
                  sx={{
                    alignItems: "center",
                  }}
                  disableRipple
                  onClick={(e: any) => onClickTermsItem(e, 1)}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: "16px",
                      color: youhaGrey[400],
                      textDecoration: "underline",
                    }}
                  >
                    보기
                  </Typography>
                </ButtonBase>
              </CheckItem>
              <CheckItem
                focused={tempTerms[2]}
                item={{
                  value: "",
                  title: "[필수] 마케팅 정보 수신",
                }}
                onClick={() => onClickCheckItem(2)}
                color={youhaGrey[900]}
              />
            </Stack>
          </Box>
        </Box>
        <Stack
          spacing={1}
          sx={{
            p: theme.spacing(2),
          }}
        >
          <Button
            size="lg"
            backgroundColor={youhaGrey[900]}
            fullWidth
            onClick={onCilckConfirm}
          >
            적용하기
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
