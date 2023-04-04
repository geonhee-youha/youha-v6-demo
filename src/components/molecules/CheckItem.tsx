import { Box, ButtonBase, Typography } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Checkbox from "../atoms/Checkbox";

export default function CheckItem({
  color = youhaBlue[500],
  fullWidth,
  focused,
  unFocused,
  item,
  onClick,
  children,
}: {
  color?: string;
  fullWidth?: boolean;
  focused?: boolean;
  unFocused?: boolean;
  item: {
    emoji?: string;
    title: string | React.ReactNode;
    value: string;
  };
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}) {
  const { emoji, title } = item;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: fullWidth ? "100%" : "initial",
          p: theme.spacing(1, 0),
          "&:hover .Checkbox.Label": {
            opacity: 0.7,
          },
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Checkbox focused={focused} color={color} />
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
              className='Checkbox Label'
            >
              {emoji}
            </Typography>
          </Box>
        )}
        <Typography
          sx={{
            flex: 1,
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[900],
            opacity: unFocused ? 0.4 : 1,
            p: theme.spacing(0, 1, 0, 0),
          }}
          className='Checkbox Label'
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}
