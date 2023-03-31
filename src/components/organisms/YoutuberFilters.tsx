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
  hasShortsList,
  FilterValueProps,
  mcnList,
  targetAgeList,
  targetGenderList,
} from "../../constants";
import FilterItem, {
  FilterItemProps,
} from "../../components/molecules/FilterItem";
import FilterSection, {
  FilterSectionProps,
} from "../../components/molecules/FilterSection";
import { Box, Stack } from "@mui/material";

export default function YoutuberFilters({
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
  const onChangeChannelSubscribers = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.channel) {
      const newFilter = {
        ...filterValue,
        channel: {
          ...filterValue.channel,
          subscribers: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeChannelPrice = (event: Event, newValue: number | number[]) => {
    if (filterValue.channel) {
      const newFilter = {
        ...filterValue,
        channel: {
          ...filterValue.channel,
          price: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeHasShorts = (newValue: string) => {
    if (filterValue.channel) {
      const newFilter = {
        ...filterValue,
        channel: {
          ...filterValue.channel,
          form: newValue,
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeTargetGender = (newValue: string) => {
    if (filterValue.target) {
      const newFilter = {
        ...filterValue,
        target: {
          ...filterValue.target,
          gender: newValue,
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeTargetAge = (newValue: string) => {
    if (filterValue.target) {
      const newFilter = {
        ...filterValue,
        target: {
          ...filterValue.target,
          age: newValue,
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeTargetKoreanRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.target) {
      const newFilter = {
        ...filterValue,
        target: {
          ...filterValue.target,
          koreanRatio: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeContentsEverageViews = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.contents) {
      const newFilter = {
        ...filterValue,
        contents: {
          ...filterValue.contents,
          everageViews: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeContentsCommentRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.contents) {
      const newFilter = {
        ...filterValue,
        contents: {
          ...filterValue.contents,
          commentRatio: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeContentsLikeRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.contents) {
      const newFilter = {
        ...filterValue,
        contents: {
          ...filterValue.contents,
          likeRatio: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeContentsRecentUploadDate = (newValue: string) => {
    if (filterValue.contents) {
      const newFilter = {
        ...filterValue,
        contents: {
          ...filterValue.contents,
          recentUploadDate: newValue,
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeContentsUploadFrequency = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (filterValue.contents) {
      const newFilter = {
        ...filterValue,
        contents: {
          ...filterValue.contents,
          uploadFrequency: newValue as number[],
        },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const onChangeCategories = (value: string) => {
    const focused = categoriesValue.includes(value);
    const newValue = focused
      ? categoriesValue.filter((el) => el !== value)
      : [...categoriesValue, value];
    if (!mobile) setCategoriesValue(newValue);
    setCategoriesTempValue(newValue);
  };
  const onChangeMcns = (value: string) => {
    if (filterValue.mcns) {
      const focused = filterValue.mcns.mcns.includes(value);
      const newValue = focused
        ? filterValue.mcns.mcns.filter((el) => el !== value)
        : [...filterValue.mcns.mcns, value];
      const newFilter = {
        ...filterValue,
        mcns: { mcns: value === "" ? [] : newValue },
      };
      if (!mobile) setFilterValue(newFilter);
      setFilterTempValue(newFilter);
    }
  };
  const channelFilterFocused =
    filterValue.channel?.subscribers[0] !== 0 ||
    filterValue.channel?.subscribers[1] !== 5000000 ||
    filterValue.channel?.price[0] !== 0 ||
    filterValue.channel?.price[1] !== 100000000 ||
    filterValue.channel?.shorts !== "";
  const targetFilterFocused =
    filterValue.target?.gender !== "" ||
    filterValue.target?.age !== "" ||
    filterValue.target?.koreanRatio[0] !== 0 ||
    filterValue.target?.koreanRatio[1] !== 100;
  const contentsFilterFocused =
    filterValue.contents?.everageViews[0] !== 0 ||
    filterValue.contents?.everageViews[1] !== 10000000 ||
    filterValue.contents?.commentRatio[0] !== 0 ||
    filterValue.contents?.commentRatio[1] !== 100 ||
    filterValue.contents?.likeRatio[0] !== 0 ||
    filterValue.contents?.likeRatio[1] !== 100 ||
    filterValue.contents?.recentUploadDate !== "" ||
    filterValue.contents?.uploadFrequency[0] !== 0 ||
    filterValue.contents?.uploadFrequency[1] !== 100;
  const mcnFilterFocused = filterValue.mcns?.mcns[0] !== "";
  const onClickPrice = () => {
    router.push("/");
  };
  const categoryFilter: FilterSectionProps = {
    type: "array",
    title: "카테고리",
    subtitle: "중복선택 가능",
    value: categoriesValue,
    onChangeValue: onChangeCategories,
    list: categoryList,
  };
  const youtuberFilters: FilterItemProps[] = [
    {
      title: "채널 필터",
      focused: channelFilterFocused,
      filterSections: [
        {
          type: "slider",
          title: "구독자수",
          valueText: filterValue.channel && (
            <>
              {`${numberToKorean(filterValue.channel.subscribers[0])}${
                filterValue.channel.subscribers[0] === 0 ? "" : "명"
              }`}{" "}
              ~{" "}
              {filterValue.channel.subscribers[1] === 5000000
                ? "무제한"
                : `${numberToKorean(filterValue.channel.subscribers[1])}명`}
            </>
          ),
          value: filterValue.channel ? filterValue.channel.subscribers : "",
          onChangeSlider: onChangeChannelSubscribers,
          max: 5000000,
          step: 50000,
          valueTexts: [0, "250만", "무제한"],
        },
        {
          type: "slider",
          title: "예상 광고단가",
          description: "해당 단가는 예상 단가입니다.",
          valueText: filterValue.channel && (
            <>
              {`${numberToKorean(filterValue.channel.price[0])}${
                filterValue.channel.price[0] === 0 ? "" : "원"
              }`}{" "}
              ~{" "}
              {filterValue.channel.price[1] === 100000000
                ? "무제한"
                : `${numberToKorean(filterValue.channel.price[1])}원`}
            </>
          ),
          value: filterValue.channel ? filterValue.channel.price : "",
          onChangeSlider: onChangeChannelPrice,
          max: 100000000,
          step: 500000,
          valueTexts: [0, "5,000만", "무제한"],
          link: {
            title: "진짜 채널 단가가 궁금하시다면",
            onClick: onClickPrice,
          },
        },
        {
          type: "radio",
          title: "쇼츠 보유",
          description: "쇼츠를 보유한 채널만 표시됩니다.",
          value: filterValue.channel ? filterValue.channel.shorts : "",
          onChangeValue: onChangeHasShorts,
          list: hasShortsList,
        },
      ],
    },
    {
      title: "시청자 필터",
      focused: targetFilterFocused,
      filterSections: [
        {
          type: "radio",
          title: "주 시청자 성별",
          value: filterValue.target ? filterValue.target.gender : "",
          onChangeValue: onChangeTargetGender,
          list: targetGenderList,
        },
        {
          type: "radio",
          title: "주 시청자 연령",
          value: filterValue.target ? filterValue.target.age : "",
          onChangeValue: onChangeTargetAge,
          list: targetAgeList,
        },
        {
          type: "slider",
          title: "국내 시청자 비율",
          valueText: filterValue.target && (
            <>
              {filterValue.target.koreanRatio[0]}
              {filterValue.target.koreanRatio[0] === 0 ? "" : "%"} ~{" "}
              {filterValue.target.koreanRatio[1]}%
            </>
          ),
          value: filterValue.target ? filterValue.target.koreanRatio : "",
          onChangeSlider: onChangeTargetKoreanRatio,
          valueTexts: [0, "50%", "100%"],
        },
      ],
    },
    {
      title: "콘텐츠 필터",
      focused: contentsFilterFocused,
      filterSections: [
        {
          type: "slider",
          title: "광고영상 평균 조회수",
          description: "최근 10개의 광고영상들의 평균 조회수입니다.",
          valueText: filterValue.contents && (
            <>
              {`${numberToKorean(filterValue.contents.everageViews[0])}${
                filterValue.contents.everageViews[0] === 0 ? "" : "회"
              }`}{" "}
              ~{" "}
              {filterValue.contents.everageViews[1] === 10000000
                ? "무제한"
                : `${numberToKorean(filterValue.contents.everageViews[1])}회`}
            </>
          ),
          value: filterValue.contents ? filterValue.contents.everageViews : "",
          onChangeSlider: onChangeContentsEverageViews,
          valueTexts: [0, "500만", "무제한"],
          max: 10000000,
          step: 50000,
        },
        {
          type: "slider",
          title: "댓글 작성율",
          valueText: filterValue.contents && (
            <>
              {`${filterValue.contents.commentRatio[0]}${
                filterValue.contents.commentRatio[0] === 0 ? "" : "%"
              }`}{" "}
              ~ {`${numberToKorean(filterValue.contents.commentRatio[1])}%`}
            </>
          ),
          value: filterValue.contents ? filterValue.contents.commentRatio : "",
          onChangeSlider: onChangeContentsCommentRatio,
          valueTexts: [0, "50%", "100%"],
        },
        {
          type: "slider",
          title: "콘텐츠 호감도",
          valueText: filterValue.contents && (
            <>
              {`${filterValue.contents.likeRatio[0]}${
                filterValue.contents.likeRatio[0] === 0 ? "" : "%"
              }`}{" "}
              ~ {`${numberToKorean(filterValue.contents.likeRatio[1])}%`}
            </>
          ),
          value: filterValue.contents ? filterValue.contents.likeRatio : "",
          onChangeSlider: onChangeContentsLikeRatio,
          valueTexts: [0, "50%", "100%"],
        },
        {
          type: "radio",
          title: "최근 업로드 날짜",
          value: filterValue.contents
            ? filterValue.contents.recentUploadDate
            : "",
          onChangeValue: onChangeContentsRecentUploadDate,
          list: targetAgeList,
        },
        {
          type: "slider",
          title: "주간 업로드 빈도",
          valueText: filterValue.contents && (
            <>
              {`${filterValue.contents.uploadFrequency[0] / 10}${
                filterValue.contents.uploadFrequency[0] === 0 ? "" : "회"
              }`}{" "}
              ~{" "}
              {filterValue.contents.uploadFrequency[1] === 100
                ? "무제한"
                : `${filterValue.contents.uploadFrequency[1] / 10}회`}
            </>
          ),
          value: filterValue.contents
            ? filterValue.contents.uploadFrequency
            : "",
          onChangeSlider: onChangeContentsUploadFrequency,
          valueTexts: [0, "5회", "무제한"],
        },
      ],
    },
    {
      title: "MCN 필터",
      focused: mcnFilterFocused,
      filterSections: [
        {
          type: "array",
          title: "소속 MCN",
          description: "선택한 MCN 소속의 유튜버만 보여집니다.",
          value: filterValue.mcns ? filterValue.mcns.mcns : "",
          onChangeValue: onChangeMcns,
          list: mcnList,
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
      {youtuberFilters
        .flatMap((el) => el.filterSections)
        .map((item, index) => (
          <FilterSection key={index} item={item} mobile={mobile} />
        ))}
    </Box>
  ) : (
    <Stack direction="row" ref={ref}>
      {youtuberFilters.map((item, index) => {
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
