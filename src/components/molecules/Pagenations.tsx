import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";

export default function Pagenations({
  per = 10,
  page,
  list,
  setPage,
}: {
  per: number;
  page: number;
  list: any[];
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const maxPageIndex = Math.floor(list.length / per);
  const pageIndex = Math.floor(page / 7);
  const chunk = ({ data = [], size = 1 }: { data: any[]; size: number }) => {
    const arr = [];
    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  };
  const pageList = chunk({
    data: Array.from({ length: maxPageIndex + 1 }, (_, i) => i + 1),
    size: 7,
  });
  const onClickPrev = () => {
    const newValue = page - 7 <= 0 ? 0 : page - 7;
    setPage(newValue);
  };
  const onClickNext = () => {
    const newValue = page + 7 >= maxPageIndex ? maxPageIndex : page + 7;
    setPage(newValue);
  };
  return (
    <Box
      sx={{
        width: "50vw",
        overflowX: "scroll",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: theme.spacing(2, 0, 0, 0),
          "@media(max-width: 480px)": {
            minWidth: 384,
            p: theme.spacing(2),
          },
        }}
      >
        {pageIndex !== 0 && (
          <ButtonBase
            sx={{
              width: 32,
              height: 32,
              borderRadius: 0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: youhaGrey[50],
            }}
            disableRipple
            onClick={onClickPrev}
          >
            <Icon name="chevron-left" color={youhaGrey[400]} size={12} />
          </ButtonBase>
        )}
        {pageList[pageIndex].map((item, index) => {
          const focused = page === item - 1;
          const onClick = () => {
            setPage(item - 1);
          };
          return (
            <ButtonBase
              key={index}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 0.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? youhaGrey[900] : youhaGrey[50],
                transition: "none !important",
              }}
              disableRipple
              onClick={onClick}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  color: focused ? `#ffffff` : youhaGrey[500],
                }}
              >
                {item}
              </Typography>
            </ButtonBase>
          );
        })}
        {pageIndex !== pageList.length - 1 && (
          <ButtonBase
            sx={{
              width: 32,
              height: 32,
              borderRadius: 0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: youhaGrey[50],
            }}
            disableRipple
            onClick={onClickNext}
          >
            <Icon name="chevron-right" color={youhaGrey[500]} size={16} />
          </ButtonBase>
        )}
      </Stack>
    </Box>
  );
}
