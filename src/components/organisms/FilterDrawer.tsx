import _ from "lodash";
import { Box, ButtonBase, Drawer, IconButton, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../atoms/Button";
import {
  youtuberFilterValueDefaultProps,
  FilterValueProps,
} from "../../constants";
import Toolbar from "../atoms/Toolbar";
import YoutuberFilters from "./YoutuberFilters";
import youhaGrey from "../../constants/youhaGrey";
import VideoFilters from "./VideoFilters";
import PageHeader from "./PageHeader";

export default function FilterDrawer({
  query,
  open,
  setOpen,
  categoriesTempValue,
  filterTempValue,
  setFilterValue,
  setFilterTempValue,
  setCategoriesValue,
  setCategoriesTempValue,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  categoriesTempValue: string[];
  filterTempValue: FilterValueProps;
  setFilterValue: Dispatch<SetStateAction<FilterValueProps>>;
  setFilterTempValue: Dispatch<SetStateAction<FilterValueProps>>;
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
}) {
  const { type } = query;
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
          minHeight: "100vh",
        }}
      >
        <PageHeader
          onClose={onCloseFilter}
          title={`${
            type === "youtuber"
              ? "유튜버"
              : type === "video"
              ? "동영상"
              : "쇼츠"
          } 필터`}
        >
          {" "}
          <ButtonBase
            sx={{
              p: theme.spacing(0, 1.5),
            }}
            disableRipple
            onClick={onClickReset}
          >
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                color: youhaGrey[700],
              }}
            >
              초기화
            </Typography>
          </ButtonBase>
        </PageHeader>
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(0, 0, 16, 0),
            "& .FilterSection:not(:last-of-type)": {
              backgroundColor: "#ffffff",
              borderBottom: `1px solid ${youhaGrey[200]}`,
            },
            overflowY: "auto",
          }}
        >
          {type === "youtuber" ? (
            <YoutuberFilters
              categoriesValue={categoriesTempValue}
              filterValue={filterTempValue}
              setFilterValue={setFilterValue}
              setFilterTempValue={setFilterTempValue}
              setCategoriesValue={setCategoriesValue}
              setCategoriesTempValue={setCategoriesTempValue}
              mobile
            />
          ) : type === "video" ? (
            <VideoFilters
              categoriesValue={categoriesTempValue}
              filterValue={filterTempValue}
              setFilterValue={setFilterValue}
              setFilterTempValue={setFilterTempValue}
              setCategoriesValue={setCategoriesValue}
              setCategoriesTempValue={setCategoriesTempValue}
              mobile
            />
          ) : (
            <VideoFilters
              categoriesValue={categoriesTempValue}
              filterValue={filterTempValue}
              setFilterValue={setFilterValue}
              setFilterTempValue={setFilterTempValue}
              setCategoriesValue={setCategoriesValue}
              setCategoriesTempValue={setCategoriesTempValue}
              mobile
              shorts
            />
          )}
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
