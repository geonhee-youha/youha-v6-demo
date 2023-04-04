import _ from "lodash";
import { Box, ButtonBase, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import FilterPanel from "./FilterPanel";
import FilterSection, { FilterSectionProps } from "./FilterSection";
import youhaGrey from "../../constants/youhaGrey";

export type FilterItemProps = {
  focused?: boolean;
  title: string;
  filterSections: FilterSectionProps[];
};
export default function FilterItem({
  index,
  opens,
  setOpens,
  item,
}: {
  index: number;
  opens: boolean[];
  setOpens: Dispatch<SetStateAction<boolean[]>>;
  item: FilterItemProps;
}) {
  const { focused, title, filterSections } = item;
  const ref = useRef<any>(null);
  const open = opens[index];
  const color = open || focused ? youhaBlue[500] : youhaGrey[900];
  const onClick = () => {
    setOpens((prev) => {
      let newPrev = _.cloneDeep(prev);
      let target = newPrev[index];
      if (target === false) {
        for (let i = 0; i < newPrev.length; i++) {
          if (i === index) {
            newPrev[i] = true;
          } else {
            newPrev[i] = false;
          }
        }
      } else {
        for (let i = 0; i < newPrev.length; i++) {
          newPrev[i] = false;
        }
      }
      return newPrev;
    });
  };
  return (
    <Box ref={ref} sx={{ position: "relative" }}>
      <ButtonBase
        sx={{
          alignItems: "center",
          boxShadow: `${
            open ? youhaBlue[500] : youhaGrey[200]
          } 0px 0px 0px 1px`,
          borderRadius: 0.5,
          p: theme.spacing(1.25, 2),
          m: theme.spacing(0, 1, 0, 0),
          transition: "none",
          "&:hover": {
            "& *": {
              opacity: open ? 1 : 0.4,
            },
          },
        }}
        disableRipple
        onClick={onClick}
      >
        <Typography
          sx={{
            position: "relative",
            "& span": {
              position: "absolute",
              top: 0,
              right: -6,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: youhaBlue[500],
            },
            fontSize: 14,
            lineHeight: "20px",
            color: color,
            fontWeight: focused ? "700" : "500",
          }}
        >
          {title}
          {/* {focused && <span />} */}
        </Typography>
        <Icon
          name="angle-down"
          prefix={focused ? "fas" : "far"}
          size={16}
          color={color}
          sx={{
            m: theme.spacing(0, -1, 0, 1),
            transform: `rotate(${open ? "180deg" : "0"})`,
          }}
        />
      </ButtonBase>
      <FilterPanel open={open} title={title}>
        {filterSections.map((item, index) => {
          return <FilterSection key={index} item={item} />;
        })}
      </FilterPanel>
    </Box>
  );
}
