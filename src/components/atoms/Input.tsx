import { Box, IconButton, InputBase, SxProps } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "./Icon";

export default function Input({
  size,
  placeholder,
  searchValue,
  onChange,
  onKeyPress,
  onClickSearch,
  sx,
}: {
  size?: string;
  placeholder?: string;
  searchValue: string;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  onClickSearch?: (e: any) => void;
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <InputBase
          value={searchValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          sx={{
            width: "100%",
            height: size === "sm" ? 32 : 40,
            p: theme.spacing(0, 5, 0, 2),
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            boxShadow: `${youhaGrey[200]} 0px 0px 0px 1px inset`,
            "&:hover": {
              boxShadow: `${youhaGrey[400]} 0px 0px 0px 1px inset`,
            },
            "&.Mui-focused": {
              boxShadow: `${youhaGrey[600]} 0px 0px 0px 1px inset`,
              "& input": {
                "&::placeholder": {
                  color: youhaGrey[700],
                },
              },
            },
            "& input": {
              fontSize: size === "sm" ? 12 : 14,
              "&::placeholder": {
                color: youhaGrey[500],
                opacity: 1,
              },
            },
          }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: size === "sm" ? 32 : 40,
            height: size === "sm" ? 32 : 40,
          }}
          onClick={onClickSearch}
        >
          <Icon
            name="search"
            size={size === "sm" ? 14 : 18}
            color={youhaGrey[900]}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
