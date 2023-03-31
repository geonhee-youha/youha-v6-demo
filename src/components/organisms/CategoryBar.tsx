import { Box, Typography } from "@mui/material";
import { categoryList } from "../../constants";
import { theme } from "../../themes/theme";
import CheckItem from "../molecules/CheckItem";

export default function CategoryBar({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string) => void;
}) {
  return (
    <Box
      sx={{
        width: 240,
        "@media(max-width: 480px)": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          p: theme.spacing(2, 0),
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            lineHeight: "28px",
            fontWeight: "700",
          }}
        >
          카테고리
        </Typography>
      </Box>
      {categoryList.map((item, index) => {
        const { value: itemValue } = item;
        const focused = value.includes(itemValue);
        const onClick = () => {
          onChange(itemValue);
        };
        return itemValue === "" ? null : (
          <CheckItem
            key={index}
            focused={focused}
            item={item}
            onClick={onClick}
          />
        );
      })}
    </Box>
  );
}
