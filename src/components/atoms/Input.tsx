import { Box, IconButton, InputBase, SxProps, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "./Icon";

export default function Input({
  error,
  helperText,
  type,
  maxLength,
  multiline,
  essential,
  searchIcon,
  size,
  placeholder,
  inputValue,
  onChange,
  onKeyPress,
  onKeyDown,
  onClickSearch,
  label,
  sx,
  children,
  timer,
}: {
  error?: boolean;
  helperText?: React.ReactNode;
  type?: string;
  maxLength?: number;
  multiline?: boolean;
  essential?: boolean;
  searchIcon?: boolean;
  size?: string;
  placeholder?: string;
  inputValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  onKeyDown?:
    | KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onClickSearch?: (e: any) => void;
  label?: React.ReactNode;
  sx?: SxProps;
  children?: React.ReactNode;
  timer?: string;
}) {
  const [inputType, setInputType] = useState<string | undefined>(undefined);
  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (maxLength && value.length > maxLength) return;
    onChange(event);
  };
  const onClickEye = () => {
    setInputType(inputType === "password" ? undefined : "password");
  };
  useEffect(() => {
    setInputType(type);
  }, [type]);
  return (
    <Box
      sx={{
        position: "relative",
        ...sx,
      }}
    >
      {label && (
        <InputLabel>
          {label}
          {essential && <span>*</span>}
        </InputLabel>
      )}
      <Box
        sx={{
          position: "relative",
          display: "flex",
        }}
      >
        <InputBase
          type={inputType}
          value={inputValue}
          onChange={onChangeValue}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          multiline={multiline}
          maxRows={3}
          sx={{
            width: "100%",
            height: multiline ? "auto" : size === "sm" ? 32 : 40,
            minHeight: multiline
              ? size === "sm"
                ? 32 * 2
                : 40 * 2
              : "initial",
            p: multiline
              ? theme.spacing(
                  size === "small" ? 1 : 1.25,
                  8,
                  size === "small" ? 1 : 1.25,
                  2
                )
              : theme.spacing(0, 5, 0, 2),
            borderRadius: 0.5,
            display: "flex",
            alignItems: multiline ? "flex-start" : "center",
            boxShadow: `${
              error ? red[500] : youhaGrey[200]
            } 0px 0px 0px 1px inset`,
            "&:hover": {
              boxShadow: `${
                error ? red[500] : youhaGrey[400]
              } 0px 0px 0px 1px inset`,
            },
            "&.Mui-focused": {
              boxShadow: `${
                error ? red[500] : youhaGrey[600]
              } 0px 0px 0px 1px inset`,
              "& input": {
                "&::placeholder": {
                  color: youhaGrey[700],
                },
              },
              "& textarea": {
                "&::placeholder": {
                  color: youhaGrey[700],
                },
              },
            },
            "& input": {
              fontSize: size === "sm" ? 12 : 14,
              lineHeight: size === "sm" ? "16px" : "20px",
              "&::placeholder": {
                color: youhaGrey[500],
                opacity: 1,
              },
            },
            "& textarea": {
              fontSize: size === "sm" ? 12 : 14,
              lineHeight: size === "sm" ? "16px" : "20px",
              "&::placeholder": {
                color: youhaGrey[500],
                opacity: 1,
              },
            },
          }}
        />
        {searchIcon && (
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: size === "sm" ? 32 : 40,
              height: size === "sm" ? 32 : 40,
            }}
            disableRipple
            onClick={onClickSearch}
          >
            <Icon
              name="search"
              size={size === "sm" ? 14 : 18}
              color={youhaGrey[900]}
            />
          </IconButton>
        )}
        {type === "password" && (
          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: size === "sm" ? 32 : 40,
              height: size === "sm" ? 32 : 40,
            }}
            disableRipple
            onClick={onClickEye}
          >
            <Icon
              name={inputType === "password" ? "eye" : "eye-slash"}
              size={size === "sm" ? 14 : 18}
              color={youhaGrey[500]}
            />
          </IconButton>
        )}
        {(maxLength || timer) && (
          <Typography
            sx={{
              position: "absolute",
              right: 12,
              bottom: 8,
              fontSize: 12,
              lineHeight: "16px",
              color: timer
                ? Number(timer.replace(':', '')) < 5
                  ? red[500]
                  : youhaBlue[500]
                : youhaGrey[500],
              "& span": {
                color: youhaGrey[900],
              },
            }}
          >
            {timer ? (
              timer
            ) : (
              <>
                <span>{inputValue.length}</span>/{maxLength}
              </>
            )}
          </Typography>
        )}
        {children}
      </Box>
      {helperText && (
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
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: 14,
        lineHeight: "20px",
        fontWeight: 700,
        m: theme.spacing(0, 0, 1, 0),
        "& span": {
          color: youhaBlue[500],
          m: theme.spacing(0, 0, 0, 0.5),
        },
      }}
    >
      {children}
    </Typography>
  );
}
