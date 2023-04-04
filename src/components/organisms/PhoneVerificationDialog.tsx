import { Box, Dialog, Stack } from "@mui/material";
import _ from "lodash";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Button from "../atoms/Button";
import PageHeader from "./PageHeader";
import Input from "../atoms/Input";
import { isPhone } from "../../utils";
import { useTimer } from "use-timer";

export const blockInvalidChar = (e: any) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

export default function PhoneVerificationDialog({
  open,
  setOpen,
  phoneVerified,
  setPhoneVerified,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  phoneVerified: boolean;
  setPhoneVerified: Dispatch<SetStateAction<boolean>>;
}) {
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [codeValue, setCodeValue] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [codeError, setCodeError] = useState<boolean>(false);
  const [phoneHelperText, setPhoneHelperText] = useState<string>("");
  const [codeHelperText, setCodeHelperText] = useState<string>("");
  const [codeShow, setCodeShow] = useState<boolean>(false);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 179,
    timerType: "DECREMENTAL",
  });
  const timeFormat = (time: number) => {
    const m = Math.floor(time / 60).toString();
    let s = (time % 60).toString();
    if (s.length === 1) s = `0${s}`;
    return `${m}:${s}`;
  };
  const onChangePhoneValue = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneError(false);
    const value = event.target.value;
    if (value.length > 13) return;
    setPhoneValue(value);
  };
  const onChangeCodeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCodeError(false);
    const value = event.target.value;
    if (value.length > 6) return;
    setCodeValue(value);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClickPhone = () => {
    if (!isPhone(phoneValue)) {
      setPhoneError(true);
      setPhoneHelperText("휴대폰 번호 형식에 맞지 않습니다.");
      return;
    }
    // if ("이미 가입된 회원일 경우") {
    //   setPhoneError(true);
    //   setPhoneHelperText("이미 가입된 회원입니다");
    //   return;
    // }
    if (!codeShow) {
      setPhoneError(false);
      setCodeShow(true);
      start();
    } else {
      setCodeError(false);
      reset();
      start();
    }
  };
  const onCilckConfirm = () => {
    if (codeValue !== "000000") {
      setCodeError(true);
      setCodeHelperText("인증번호가 맞지 않습니다.");
      return;
    } 
    setPhoneVerified(true)
    setOpen(false)
  };
  useEffect(() => {
    reset();
    setCodeShow(false);
    setPhoneError(false);
    setCodeError(false);
    setPhoneValue("");
    setCodeValue("");
  }, [open]);
  useEffect(() => {
    if (time === 0) {
      pause();
      setCodeError(true);
      setCodeHelperText("인증시간이 초과되었습니다.");
    }
  }, [time]);
  useEffect(() => {
    if (phoneValue.length === 11) {
      setPhoneValue(phoneValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    } else if (phoneValue.length === 13) {
      setPhoneValue(
        phoneValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phoneValue]);
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
        <PageHeader onClose={onClose} title="휴대폰 인증" />
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            p: theme.spacing(2),
          }}
        >
          <Input
            label="휴대폰 번호"
            inputValue={phoneValue}
            onChange={onChangePhoneValue}
            placeholder="-없이 입력"
            onKeyDown={blockInvalidChar}
            error={phoneError}
            helperText={phoneError && phoneHelperText}
          >
            <Button
              disabled={codeShow && time !== 0}
              backgroundColor={youhaGrey[900]}
              sx={{
                width: 84,
                m: theme.spacing(0, 0, 0, 1),
              }}
              onClick={onClickPhone}
            >
              {!codeShow ? "전송" : "재전송"}
            </Button>
          </Input>
          {codeShow && (
            <Input
              label="인증번호"
              inputValue={codeValue}
              onChange={onChangeCodeValue}
              placeholder="문자로 전송된 6자리 숫자"
              onKeyDown={blockInvalidChar}
              error={codeError}
              helperText={codeError && codeHelperText}
              timer={timeFormat(time)}
            />
          )}
        </Stack>
        <Stack
          spacing={1}
          sx={{
            p: theme.spacing(2),
          }}
        >
          <Button
            disabled={!codeShow || codeValue.length !== 6 || time <= 0}
            size="lg"
            backgroundColor={youhaGrey[900]}
            fullWidth
            onClick={onCilckConfirm}
          >
            휴대폰 인증하기
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
