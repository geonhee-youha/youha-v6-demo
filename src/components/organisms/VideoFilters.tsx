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
  shorts,
}: {
  categoriesValue: string[];
  filterValue: FilterValueProps;
  setFilterValue: Dispatch<SetStateAction<FilterValueProps>>;
  setFilterTempValue: Dispatch<SetStateAction<FilterValueProps>>;
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
  mobile?: boolean;
  shorts?: boolean;
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
  const onChangeVideoViews = (event: Event, newValue: number | number[]) => {
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
  const onChangeVideoUploadDate = (newValue: string) => {
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
  const onChangeVideoLikes = (event: Event, newValue: number | number[]) => {
    if (filterValue.video) {
      const newFilter: FilterValueProps = {
        ...filterValue,
        video: {
          ...filterValue.video,
          likes: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeVideoComments = (event: Event, newValue: number | number[]) => {
    if (filterValue.video) {
      const newFilter: FilterValueProps = {
        ...filterValue,
        video: {
          ...filterValue.video,
          comments: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeDetailViewsPerSubscribers = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.detail) {
      const newFilter: FilterValueProps = {
        ...filterValue,
        detail: {
          ...filterValue.detail,
          viewsPerSubscribers: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeDetailLikesPerViews = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.detail) {
      const newFilter: FilterValueProps = {
        ...filterValue,
        detail: {
          ...filterValue.detail,
          likesPerViews: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeDetailCommentsPerViews = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.detail) {
      const newFilter: FilterValueProps = {
        ...filterValue,
        detail: {
          ...filterValue.detail,
          commentsPerViews: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const videoFocused =
    filterValue.video?.uploadDate !== "" ||
    filterValue.video?.views[0] !== 0 ||
    filterValue.video?.views[1] !== 10000000 ||
    filterValue.video?.likes[0] !== 0 ||
    filterValue.video?.likes[1] !== 1000 ||
    filterValue.video?.comments[0] !== 0 ||
    filterValue.video?.comments[1] !== 1000;
  const detailFocused =
    filterValue.detail?.viewsPerSubscribers[0] !== 0 ||
    filterValue.detail?.viewsPerSubscribers[1] !== 100 ||
    filterValue.detail?.likesPerViews[0] !== 0 ||
    filterValue.detail?.likesPerViews[1] !== 100 ||
    filterValue.detail?.commentsPerViews[0] !== 0 ||
    filterValue.detail?.commentsPerViews[1] !== 100;
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
      title: `${shorts ? `쇼츠` : `동영상`} 필터`,
      focused: videoFocused,
      filterSections: [
        {
          type: "radio",
          title: "업로드 날짜",
          value: filterValue.video ? filterValue.video.uploadDate : "",
          onChangeValue: onChangeVideoUploadDate,
          list: uploadDateList,
        },
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
          onChangeSlider: onChangeVideoViews,
          valueTexts: [0, "500만", "무제한"],
          max: 10000000,
          step: 50000,
        },
        {
          type: "slider",
          title: "좋아요 수",
          valueText: filterValue.video && (
            <>
              {`${numberToKorean(filterValue.video.likes[0])}${
                filterValue.video.likes[0] === 0 ? "" : "회"
              }`}{" "}
              ~{" "}
              {filterValue.video.likes[1] === 1000
                ? "무제한"
                : `${numberToKorean(filterValue.video.likes[1])}회`}
            </>
          ),
          value: filterValue.video ? filterValue.video.likes : "",
          onChangeSlider: onChangeVideoLikes,
          valueTexts: [0, "500", "무제한"],
          max: 1000,
          step: 10,
        },
        {
          type: "slider",
          title: "댓글 수",
          valueText: filterValue.video && (
            <>
              {`${numberToKorean(filterValue.video.comments[0])}${
                filterValue.video.comments[0] === 0 ? "" : "회"
              }`}{" "}
              ~{" "}
              {filterValue.video.comments[1] === 1000
                ? "무제한"
                : `${numberToKorean(filterValue.video.comments[1])}회`}
            </>
          ),
          value: filterValue.video ? filterValue.video.comments : "",
          onChangeSlider: onChangeVideoComments,
          valueTexts: [0, "500", "무제한"],
          max: 1000,
          step: 10,
        },
      ],
    },
    {
      title: `상세 필터`,
      focused: detailFocused,
      filterSections: [
        {
          type: "slider",
          title: "구독자 대비 조회수",
          valueText: filterValue.detail && (
            <>
              {filterValue.detail.viewsPerSubscribers[0]}
              {filterValue.detail.viewsPerSubscribers[0] === 0
                ? ""
                : "%"} ~ {filterValue.detail.viewsPerSubscribers[1]}%
            </>
          ),
          value: filterValue.detail
            ? filterValue.detail.viewsPerSubscribers
            : "",
          onChangeSlider: onChangeDetailViewsPerSubscribers,
          valueTexts: [0, "50%", "100%"],
        },
        {
          type: "slider",
          title: "조회수 대비 좋아요",
          valueText: filterValue.detail && (
            <>
              {filterValue.detail.likesPerViews[0]}
              {filterValue.detail.likesPerViews[0] === 0 ? "" : "%"} ~{" "}
              {filterValue.detail.likesPerViews[1]}%
            </>
          ),
          value: filterValue.detail ? filterValue.detail.likesPerViews : "",
          onChangeSlider: onChangeDetailLikesPerViews,
          valueTexts: [0, "50%", "100%"],
        },
        {
          type: "slider",
          title: "조회수 대비 댓글",
          valueText: filterValue.detail && (
            <>
              {filterValue.detail.commentsPerViews[0]}
              {filterValue.detail.commentsPerViews[0] === 0 ? "" : "%"} ~{" "}
              {filterValue.detail.commentsPerViews[1]}%
            </>
          ),
          value: filterValue.detail ? filterValue.detail.commentsPerViews : "",
          onChangeSlider: onChangeDetailCommentsPerViews,
          valueTexts: [0, "50%", "100%"],
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
