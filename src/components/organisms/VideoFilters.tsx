import _ from "lodash";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { numberToKorean } from "../../utils";
import {
  categoryList,
  FilterValueProps,
  uploadDateList,
} from "../../constants";
import FilterItem, {
  FilterItemProps,
} from "../../components/molecules/FilterItem";
import FilterSection, {
  FilterSectionProps,
} from "../../components/molecules/FilterSection";
import { Box, Stack } from "@mui/material";

export default function VideoFilters({
  categoriesValue,
  filterValue,
  setFilterValue,
  setFilterTempValue,
  setCategoriesValue,
  setCategoriesTempValue,
  mobile,
}: {
  categoriesValue: string[];
  filterValue: FilterValueProps;
  setFilterValue: Dispatch<SetStateAction<FilterValueProps>>;
  setFilterTempValue: Dispatch<SetStateAction<FilterValueProps>>;
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
  mobile?: boolean;
}) {
  const ref = useRef<any>(null);
  const [opens, setOpens] = useState<boolean[]>([false, false, false, false]);
  const router = useRouter();
  const onChangeCategories = (value: string) => {
    const focused = categoriesValue.includes(value);
    const newValue = focused
      ? categoriesValue.filter((el) => el !== value)
      : [...categoriesValue, value];
    if (!mobile) setCategoriesValue(newValue);
    setCategoriesTempValue(newValue);
  };
  const onChangeContentsViews = (event: Event, newValue: number | number[]) => {
    if (filterValue.video) {
      const newFilter: FilterValueProps = {
        ...filterValue,
        video: {
          ...filterValue.video,
          views: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeContentsUploadDate = (newValue: string) => {
    if (filterValue.video) {
      const newFilter = {
        ...filterValue,
        video: {
          ...filterValue.video,
          uploadDate: newValue,
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const filterFocused =
    filterValue.video?.views[0] !== 0 ||
    filterValue.video?.views[1] !== 10000000 ||
    filterValue.video?.uploadDate !== "";
  const categoryFilter: FilterSectionProps = {
    type: "array",
    title: "카테고리",
    subtitle: "중복선택 가능",
    value: categoriesValue,
    onChangeValue: onChangeCategories,
    list: categoryList,
  };
  const filters: FilterItemProps[] = [
    {
      title: "동영상 필터",
      focused: filterFocused,
      filterSections: [
        {
          type: "slider",
          title: "조회수",
          valueText: filterValue.video && (
            <>
              {`${numberToKorean(filterValue.video.views[0])}${
                filterValue.video.views[0] === 0 ? "" : "회"
              }`}{" "}
              ~{" "}
              {filterValue.video.views[1] === 10000000
                ? "무제한"
                : `${numberToKorean(filterValue.video.views[1])}회`}
            </>
          ),
          value: filterValue.video ? filterValue.video.views : "",
          onChangeSlider: onChangeContentsViews,
          valueTexts: [0, "500만", "무제한"],
          max: 10000000,
          step: 50000,
        },
        {
          type: "radio",
          title: "업로드 날짜",
          value: filterValue.video ? filterValue.video.uploadDate : "",
          onChangeValue: onChangeContentsUploadDate,
          list: uploadDateList,
        },
      ],
    },
  ];
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (ref && !ref.current.contains(event.target)) {
      setOpens((prev) => {
        let newPrev = _.cloneDeep(prev);
        for (let i = 0; i < newPrev.length; i++) {
          newPrev[i] = false;
        }
        return newPrev;
      });
    }
  };
  return mobile ? (
    <Box ref={ref}>
      <FilterSection item={categoryFilter} mobile />
      {filters
        .flatMap((el) => el.filterSections)
        .map((item, index) => (
          <FilterSection key={index} item={item} mobile={mobile} />
        ))}
    </Box>
  ) : (
    <Stack direction="row" ref={ref}>
      {filters.map((item, index) => {
        return (
          <FilterItem
            key={index}
            index={index}
            item={item}
            opens={opens}
            setOpens={setOpens}
          />
        );
      })}
    </Stack>
  );
}
