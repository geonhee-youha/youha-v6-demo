import _ from "lodash";
import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import youhaGrey from "../../constants/youhaGrey";

export default function SortItem({
  sortList,
  sortValue,
  setSortValue,
}: {
  sortList: any[];
  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
}) {
  const ref = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const onClick = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (ref && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  return (
    <Box ref={ref} sx={{ position: "relative", zIndex: 99 }}>
      <ButtonBase
        sx={{
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.4,
          },
          transition: "none !important",
        }}
        disableRipple
        onClick={onClick}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaGrey[900],
            "@media(max-width: 480px)": {
              fontSize: 12,
              lineHeight: "16px",
            },
          }}
        >
          {sortList[_.findIndex(sortList, (el) => el.value === sortValue)].title}
        </Typography>
        <Icon
          name="angle-down"
          prefix="far"
          size={16}
          color={youhaGrey[900]}
          sx={{
            m: theme.spacing(0, 0, 0, 0.5),
            transform: `rotate(${open ? "180deg" : "0"})`,
            "@media(max-width: 480px)": {
              fontSize: `6px !important`,
              m: theme.spacing(0, 0, 0, 0.25),
            },
          }}
        />
      </ButtonBase>
      <Box
        sx={{
          position: "absolute",
          top: 32,
          right: 0,
          width: 160,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          overflow: "auto",
          p: theme.spacing(1, 0),
          border: `1px solid ${youhaGrey[200]}`,
          borderRadius: 0.5,
          zIndex: 99,
          backgroundColor: `#ffffff`,
        }}
      >
        {sortList.map((item, index) => {
          const { title, value } = item;
          const focused = sortValue === value;
          const onClick = () => {
            setSortValue(value);
            setOpen(false);
          };
          return (
            <ButtonBase
              key={index}
              sx={{
                display: "flex",
                width: "auto",
                p: theme.spacing(1, 2),
                "&:hover": {
                  backgroundColor: alpha(youhaBlue[500], 0.08),
                },
              }}
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
        })}
      </Box>
    </Box>
  );
}
