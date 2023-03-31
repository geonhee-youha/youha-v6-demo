import { Box, ButtonBase, Typography } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";

export default function RadioItem({
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
        width: "100%",
        p: theme.spacing(1, 0),
        "&:hover .MuiTypography-root": {
          opacity: 0.4,
        },
        "@media(max-width: 480px)": {
          display: "none",
        },
      }}
      disableRipple
      onClick={onClick}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          p: theme.spacing(0.5),
          border: `1px solid ${youhaGrey[200]}`,
          m: theme.spacing(0, 1, 0, 0),
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: focused ? youhaBlue[500] : "transparent",
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          color: youhaGrey[900],
        }}
      >
        {title}
      </Typography>
    </ButtonBase>
  );
}
