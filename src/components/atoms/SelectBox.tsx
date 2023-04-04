import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel } from "./Input";
import { Dispatch, SetStateAction } from "react";
import { theme } from "../../themes/theme";
import { red } from "@mui/material/colors";
import youhaGrey from "../../constants/youhaGrey";
import { alpha } from "@mui/material";
import youhaBlue from "../../constants/youhaBlue";

export default function SelectBox({
  error,
  size = "md",
  label,
  essential,
  list,
  value,
  setValue,
}: {
  error?: boolean;
  size?: string;
  label?: string;
  essential?: boolean;
  list: { value: string; title: string }[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const onChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {label && (
          <InputLabel>
            {label}
            {essential && <span>*</span>}
          </InputLabel>
        )}
        <Select
          value={value}
          onChange={onChange}
          sx={{
            "& .MuiSelect-select": {
              border: `none !important`,
              width: "100%",
              height: `${size === "sm" ? 32 : 40}px !important`,
              p: theme.spacing(0, 5, 0, 2),
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              boxShadow: `${
                error ? red[500] : youhaGrey[200]
              } 0px 0px 0px 1px inset`,
              "&:hover": {
                boxShadow: `${
                  error ? red[500] : youhaGrey[400]
                } 0px 0px 0px 1px inset`,
              },
              fontSize: `14px !important`,
            },
            "& .Mui-focused": {
              boxShadow: `${
                error ? red[500] : youhaGrey[600]
              } 0px 0px 0px 1px inset !important`,
            },
            "& input": {
              fontSize: `14px !important`,
              lineHeight: "20px",
            },
            "& svg": {
              color: youhaGrey[300],
            },
            "& fieldset": {
              display: "none",
            },
          }}
        >
          {list.map((item, index) => {
            const { value, title } = item;
            return (
              <MenuItem
                key={index}
                value={value}
                sx={{
                  minHeight: 'initial',
                  height: 'auto',
                  p: theme.spacing(1, 2),
                  "&:hover": {
                    backgroundColor: alpha(youhaBlue[500], 0.08),
                  },
                }}
              >
                {title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
