import { Box, SxProps } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "./Icon";

export default function Checkbox({
  focused,
  onClick,
  size,
  sx,
}: {
  focused?: boolean;
  onClick?: (e: any) => void;
  size?: string;
  sx?: SxProps;
}) {
  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: 0.5,
        boxShadow: `${
          focused ? youhaBlue[500] : youhaGrey[200]
        } 0px 0px 0px 1px`,
        m: theme.spacing(0, 1, 0, 0),
        backgroundColor: focused ? youhaBlue[500] : "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "none !important",
        "&.sm": {
          width: 16,
          height: 16,
          borderRadius: 0.25,
        },
        cursor: 'pointer',
        ...sx,
      }}
      onClick={onClick}
      className={size}
    >
      <Icon
        name="check"
        color="#ffffff"
        prefix="fas"
        size={16}
        sx={{
          opacity: focused ? 1 : 0,
          transition: "none !important",
          "&.sm": {
            fontSize: `6px !important`,
          },
        }}
        className={size}
      />
    </Box>
  );
}
