import _ from "lodash";
import { Box, ButtonBase, Drawer, IconButton, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import Icon from "../../components/atoms/Icon";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../../components/atoms/Button";
import {
  youtuberFilterValueDefaultProps,
  YoutuberFilterValueProps,
} from "../../constants";
import Toolbar from "../../components/atoms/Toolbar";
import YoutuberFilters from "../../components/organisms/YoutuberFilters";
import youhaGrey from "../../constants/youhaGrey";

export default function YoutuberFilterDrawer({
  open,
  setOpen,
  categoriesTempValue,
  filterTempValue,
  setFilterValue,
  setFilterTempValue,
  setCategoriesValue,
  setCategoriesTempValue,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoriesTempValue: string[];
  filterTempValue: YoutuberFilterValueProps;
  setFilterValue: Dispatch<SetStateAction<YoutuberFilterValueProps>>;
  setFilterTempValue: Dispatch<SetStateAction<YoutuberFilterValueProps>>;
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
}) {
  const onCloseFilter = () => {
    setOpen(false);
  };
  const onClickReset = () => {
    setFilterValue(youtuberFilterValueDefaultProps);
    setFilterTempValue(youtuberFilterValueDefaultProps);
    setCategoriesValue([""]);
    setCategoriesTempValue([""]);
  };
  const onClickFilterConfirm = () => {
    setOpen(false);
    setFilterValue(filterTempValue);
  };
  return (
    <Drawer anchor="bottom" open={open} onClose={onCloseFilter}>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Toolbar
          sx={{
            position: "relative",
            p: theme.spacing(1, 0.5),
            borderBottom: `1px solid ${youhaGrey[200]}`,
            justifyContent: "space-between",
          }}
        >
          <IconButton disableRipple onClick={onCloseFilter}>
            <Icon name="xmark" />
          </IconButton>
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 16,
              lineHeight: "24px",
              fontWeight: "700",
            }}
          >
            필터
          </Typography>
          <ButtonBase
            sx={{
              p: theme.spacing(0, 1.5),
            }}
            disableRipple
            onClick={onClickReset}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[700],
              }}
            >
              초기화
            </Typography>
          </ButtonBase>
        </Toolbar>
        <Box
          sx={{
            flex: 1,
            // backgroundColor: youhaGrey[100],
            p: theme.spacing(0, 0, 16, 0),
            "& .FilterSection:not(:last-of-type)": {
              backgroundColor: "#ffffff",
              borderBottom: `1px solid ${youhaGrey[200]}`,
              // m: theme.spacing(0, 0, 2, 0),
            },
            overflowY: "auto",
          }}
        >
          <YoutuberFilters
            categoriesValue={categoriesTempValue}
            filterValue={filterTempValue}
            setFilterValue={setFilterValue}
            setFilterTempValue={setFilterTempValue}
            setCategoriesValue={setCategoriesValue}
            setCategoriesTempValue={setCategoriesTempValue}
            mobile
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            backgroundColor: `#ffffff`,
            p: theme.spacing(2),
            boxShadow: `rgba(0, 0, 0, 0.12) -8px 0px 16px 0px`,
          }}
        >
          <Button size="lg" fullWidth onClick={onClickFilterConfirm}>
            적용하기
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
