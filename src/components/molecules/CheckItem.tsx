import { Box, ButtonBase, Typography } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Checkbox from "../atoms/Checkbox";

export default function CheckItem({
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
    <Box sx={{ width: "100%" }}>
      <ButtonBase
        sx={{
          p: theme.spacing(1, 0),
          "&:hover .MuiTypography-root": {
            opacity: 0.7,
          },
        }}
        disableRipple
        onClick={onClick}
      >
        <Checkbox focused={focused} />
        {emoji && (
          <Box
            sx={{
              width: 20,
              textAlign: "center",
              m: theme.spacing(0, 1, 0, 0),
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "20px",
                color: youhaGrey[900],
              }}
            >
              {emoji}
            </Typography>
          </Box>
        )}
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[900],
            opacity: unFocused ? 0.4 : 1,
          }}
        >
          {title}
        </Typography>
      </ButtonBase>
    </Box>
  );
}
