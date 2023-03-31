import {  ButtonBase, Typography } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";

export default function ChipItem({
  focused,
  unFocused,
  item,
  onClick,
}: {
  focused?: boolean;
  unFocused?: boolean;
  item: {
    emoji?: string;
    title: string | React.ReactNode;
    value: string;
  };
  onClick?: (e: any) => void;
}) {
  const { emoji, title } = item;
  return (
    <ButtonBase
      sx={{
        p: theme.spacing(1, 2),
        backgroundColor: focused ? youhaBlue[50] : youhaGrey[50],
        borderRadius: 2,
        "&:hover": {
          boxShadow: `${
            focused ? youhaBlue[500] : youhaGrey[200]
          } 0px 0px 0px 1px inset`,
        },
        m: theme.spacing(0, 1, 1, 0),
        display: "none",
        "@media(max-width: 480px)": {
          display: "flex",
        },
        opacity: unFocused ? 0.4 : 1,
      }}
      disableRipple
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          color: focused ? youhaBlue[500] : youhaGrey[900],
        }}
      >
        {title}
      </Typography>
    </ButtonBase>
  );
}
