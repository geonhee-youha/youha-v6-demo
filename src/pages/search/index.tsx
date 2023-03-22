import _ from "lodash";
import {
  alpha,
  Box,
  ButtonBase,
  Drawer,
  IconButton,
  InputBase,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import { theme } from "../../themes/theme";
import { grey, pink } from "@mui/material/colors";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../../components/atoms/Button";
import { numberToKorean } from "../../utils";
import {
  categoryList,
  channelFormList,
  filterObject,
  FilterProps,
  mcnList,
  recentUploadDateList,
  sortList,
  targetAgeList,
  targetGenderList,
  tabList,
} from "../../constants";
import Toolbar from "../../components/atoms/Toolbar";
import YoutuberItem from "../../components/molecules/YoutuberItem";
import { testCreators } from "../../data";

function valuetext(value: number) {
  return `${value}%`;
}

export default function Page() {
  const router = useRouter();
  const {
    type,
    categories: categoryOrigin,
    value: searchValueOrigin,
  } = router.query;
  const searchValue =
    typeof searchValueOrigin === "string" ? searchValueOrigin : "";
  const categories =
    typeof categoryOrigin === "string" ? categoryOrigin.split(",") : [];
  const [value, setValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  const onClickSearch = () => {
    if (value === "") return;
    router.push(`/search?value=${value}`);
  };
  const [mcnValue, setMcnValue] = useState<string>("");
  const onChangeMcnInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMcnValue(value);
  };
  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);
  //필터 오픈
  const [channelFilterOpen, setChannelFilterOpen] = useState<boolean>(false);
  const [targetFilterOpen, setTargetFilterOpen] = useState<boolean>(false);
  const [contentsFilterOpen, setContentsFilterOpen] = useState<boolean>(false);
  const [mcnFilterOpen, setMcnFilterOpen] = useState<boolean>(false);
  //웹 필터
  const [filter, setFilter] = useState<FilterProps>(filterObject);
  const [filterTemp, setFilterTemp] = useState<FilterProps>(filterObject);
  const onChangeCategories = (value: string) => {
    const focused = filter.categories.includes(value);
    const newCategories = focused
      ? filter.categories.filter((el) => el !== value)
      : [...filter.categories, value];
    const newFilter = {
      ...filter,
      categories: newCategories,
    };
    router.push(
      `/search?${
        type !== undefined ? "type=youtuber&" : `type=${type}&`
      }categories=${newCategories.map((el, index) => {
        return el;
      })}`
    );
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeChannelSubscribers = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filter,
      channel: {
        ...filter.channel,
        subscribers: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeChannelPrice = (event: Event, newValue: number | number[]) => {
    const newFilter = {
      ...filter,
      channel: {
        ...filter.channel,
        price: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeChannelForm = (newValue: string) => {
    const newFilter = {
      ...filter,
      channel: {
        ...filter.channel,
        form: newValue,
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeTargetGender = (newValue: string) => {
    const newFilter = {
      ...filter,
      target: {
        ...filter.target,
        gender: newValue,
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeTargetAge = (newValue: string) => {
    const newFilter = {
      ...filter,
      target: {
        ...filter.target,
        age: newValue,
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeTargetKoreanRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filter,
      target: {
        ...filter.target,
        koreanRatio: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeContentsEverageViews = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filter,
      contents: {
        ...filter.contents,
        everageViews: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeContentsCommentRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filter,
      contents: {
        ...filter.contents,
        commentRatio: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeContentsLikeRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filter,
      contents: {
        ...filter.contents,
        likeRatio: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeContentsRecentUploadDate = (newValue: string) => {
    const newFilter = {
      ...filter,
      contents: {
        ...filter.contents,
        recentUploadDate: newValue,
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeContentsUploadFrequency = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filter,
      contents: {
        ...filter.contents,
        uploadFrequency: newValue as number[],
      },
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const onChangeMcns = (newValue: string[]) => {
    const newFilter = {
      ...filter,
      mcns: newValue,
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  const channelFilterFocused =
    filter.channel.subscribers[0] !== 0 ||
    filter.channel.subscribers[1] !== 5000000 ||
    filter.channel.price[0] !== 0 ||
    filter.channel.price[1] !== 100000000 ||
    filter.channel.form !== "";
  const targetFilterFocused =
    filter.target.gender !== "" ||
    filter.target.age !== "" ||
    filter.target.koreanRatio[0] !== 0 ||
    filter.target.koreanRatio[1] !== 100;
  const contentsFilterFocused =
    filter.contents.everageViews[0] !== 0 ||
    filter.contents.everageViews[1] !== 10000000 ||
    filter.contents.commentRatio[0] !== 0 ||
    filter.contents.commentRatio[1] !== 100 ||
    filter.contents.likeRatio[0] !== 0 ||
    filter.contents.likeRatio[1] !== 100 ||
    filter.contents.recentUploadDate !== "" ||
    filter.contents.uploadFrequency[0] !== 0 ||
    filter.contents.uploadFrequency[1] !== 100;
  const mcnFilterFocused = filter.mcns[0] !== "";
  const onClickReset = () => {
    const newFilter = {
      ...filterObject,
      categories: filter.categories,
    };
    setFilter(newFilter);
    setFilterTemp(newFilter);
  };
  //모바일 필터
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const onClickFilter = () => {
    setFilterOpen(true);
    setFilterTemp(filter);
  };
  const onCloseFilter = () => {
    setFilterOpen(false);
  };
  const onClickFilterConfirm = () => {
    router.push(
      `/search?${
        type !== undefined ? "type=youtuber&" : `type=${type}&`
      }categories=${filterTemp.categories.map((el, index) => {
        return el;
      })}`
    );
    setFilterOpen(false);
    setFilter(filterTemp);
  };
  const onChangeCategoriesResetTemp = () => {
    const newFilter = {
      ...filterTemp,
      categories: [],
    };
    setFilterTemp(newFilter);
  };
  const onChangeCategoriesTemp = (value: string) => {
    const focused = filterTemp.categories.includes(value);
    const newCategories = focused
      ? filterTemp.categories.filter((el) => el !== value)
      : [...filterTemp.categories, value];
    const newFilter = {
      ...filterTemp,
      categories: newCategories,
    };
    setFilterTemp(newFilter);
  };
  const onChangeChannelSubscribersTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      channel: {
        ...filterTemp.channel,
        subscribers: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeChannelPriceTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      channel: {
        ...filterTemp.channel,
        price: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeChannelFormTemp = (newValue: string) => {
    const newFilter = {
      ...filterTemp,
      channel: {
        ...filterTemp.channel,
        form: newValue,
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeTargetGenderTemp = (newValue: string) => {
    const newFilter = {
      ...filterTemp,
      target: {
        ...filterTemp.target,
        gender: newValue,
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeTargetAgeTemp = (newValue: string) => {
    const newFilter = {
      ...filterTemp,
      target: {
        ...filterTemp.target,
        age: newValue,
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeTargetKoreanRatioTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      target: {
        ...filterTemp.target,
        koreanRatio: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeContentsEverageViewsTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      contents: {
        ...filterTemp.contents,
        everageViews: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeContentsCommentRatioTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      contents: {
        ...filterTemp.contents,
        commentRatio: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeContentsLikeRatioTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      contents: {
        ...filterTemp.contents,
        likeRatio: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeContentsRecentUploadDateTemp = (newValue: string) => {
    const newFilter = {
      ...filterTemp,
      contents: {
        ...filterTemp.contents,
        recentUploadDate: newValue,
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeContentsUploadFrequencyTemp = (
    event: Event,
    newValue: number | number[]
  ) => {
    const newFilter = {
      ...filterTemp,
      contents: {
        ...filterTemp.contents,
        uploadFrequency: newValue as number[],
      },
    };
    setFilterTemp(newFilter);
  };
  const onChangeMcnsTemp = (newValue: string[]) => {
    const newFilter = {
      ...filterTemp,
      mcns: newValue,
    };
    setFilterTemp(newFilter);
  };
  const onClickResetTemp = () => {
    setFilter(filterObject);
    setFilterTemp(filterObject);
  };
  const filterFocused =
    !(
      filter.categories.length === 0 ||
      (filter.categories.length !== 0 && filter.categories[0] === "")
    ) ||
    filter.channel.subscribers[0] !== 0 ||
    filter.channel.subscribers[1] !== 5000000 ||
    filter.channel.price[0] !== 0 ||
    filter.channel.price[1] !== 100000000 ||
    filter.channel.form !== "" ||
    filter.target.gender !== "" ||
    filter.target.age !== "" ||
    filter.target.koreanRatio[0] !== 0 ||
    filter.target.koreanRatio[1] !== 100 ||
    filter.contents.everageViews[0] !== 0 ||
    filter.contents.everageViews[1] !== 10000000 ||
    filter.contents.commentRatio[0] !== 0 ||
    filter.contents.commentRatio[1] !== 100 ||
    filter.contents.likeRatio[0] !== 0 ||
    filter.contents.likeRatio[1] !== 100 ||
    filter.contents.recentUploadDate !== "" ||
    filter.contents.uploadFrequency[0] !== 0 ||
    filter.contents.uploadFrequency[1] !== 100 ||
    filter.mcns[0] !== "";
  // 정렬
  const [sort, setSort] = useState<string>("subscribers");
  useEffect(() => {
    if (channelFilterOpen) {
      setTargetFilterOpen(false);
      setContentsFilterOpen(false);
      setMcnFilterOpen(false);
    }
    if (targetFilterOpen) {
      setChannelFilterOpen(false);
      setContentsFilterOpen(false);
      setMcnFilterOpen(false);
    }
    if (contentsFilterOpen) {
      setChannelFilterOpen(false);
      setTargetFilterOpen(false);
      setMcnFilterOpen(false);
    }
    if (mcnFilterOpen) {
      setChannelFilterOpen(false);
      setTargetFilterOpen(false);
      setContentsFilterOpen(false);
    }
    setMcnValue("");
  }, [channelFilterOpen, targetFilterOpen, contentsFilterOpen, mcnFilterOpen]);
  const onClickPrice = () => {
    router.push("/");
  };
  const youtuberIds = testCreators.flatMap((el) => el.id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const equals = (a: string[], b: string[]) => {
    if (a.length === b.length && a.every((v, i) => v === b[i])) return true;
  };
  const selected = equals(youtuberIds.sort(), selectedIds.sort());
  const onClickSelect = () => {
    setSelectedIds(selected ? [] : youtuberIds);
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            p: theme.spacing(2, 0, 10, 0),
            "@media(max-width: 480px)": {
              p: theme.spacing(0, 0, 10, 0),
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: theme.spacing(2, 0),
              "@media(max-width: 480px)": {
                width: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                "@media(max-width: 480px)": {
                  flex: "initial",
                  width: "100%",
                },
              }}
            >
              <Typography
                sx={{
                  width: 240,
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                  "@media(max-width: 480px)": {
                    width: "auto",
                    fontSize: 18,
                    lineHeight: "28px",
                  },
                }}
              >
                유하 통합검색
              </Typography>
              <Box
                sx={{
                  width: `2px`,
                  height: `12px`,
                  backgroundColor: grey[300],
                  m: theme.spacing(0, 2, 0, 2),
                  display: "none",
                  "@media(max-width: 480px)": {
                    display: "flex",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {tabList.map((item, index) => {
                  const { title, value } = item;
                  const focused = type === value;
                  const onClick = () => {
                    router.push(
                      `/search?type=${value}&categories=${categoryOrigin}`
                    );
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        m: theme.spacing(0, 1.5, 0, 0),
                        "&:hover *": {
                          color: grey[900],
                        },
                        "@media(max-width: 480px)": {
                          m: theme.spacing(0, 1, 0, 0),
                          "& .MuiTypography-root": {
                            fontSize: 18,
                            lineHeight: "28px",
                          },
                        },
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 20,
                          lineHeight: "32px",
                          fontWeight: "700",
                          color: focused ? grey[900] : grey[400],
                        }}
                      >
                        {title}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                position: "relative",
                "@media(max-width: 480px)": {
                  display: "none",
                },
              }}
            >
              <InputBase
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                sx={{
                  width: 172,
                  height: 40,
                  p: theme.spacing(0, 6, 0, 2),
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                  "&:hover": {
                    boxShadow: `${grey[500]} 0px 0px 0px 1px inset`,
                  },
                  "&.Mui-focused": {
                    boxShadow: `${grey[700]} 0px 0px 0px 1px inset`,
                    "& input": {
                      fontSize: 14,
                      "&::placeholder": {
                        color: grey[700],
                      },
                    },
                  },
                  "& input": {
                    fontSize: 14,
                    "&::placeholder": {
                      color: grey[500],
                      opacity: 1,
                    },
                  },
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 4,
                  transform: "translateY(-50%)",
                }}
                onClick={onClickSearch}
              >
                <Icon name="search" size={20} color={grey[500]} />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
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
                const router = useRouter();
                const { emoji, title, value } = item;
                const focused = categories.includes(value);
                const onClick = () => {
                  onChangeCategories(value);
                };
                return (
                  <ButtonBase
                    key={index}
                    sx={{
                      width: "100%",
                      p: theme.spacing(1, 0),
                      "&:hover .MuiTypography-root": {
                        opacity: 0.4,
                      },
                    }}
                    disableRipple
                    onClick={onClick}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: 0.5,
                        boxShadow: `${
                          focused ? youhaBlue[500] : grey[300]
                        } 0px 0px 0px 1px`,
                        m: theme.spacing(0, 1, 0, 0),
                        backgroundColor: focused
                          ? youhaBlue[500]
                          : "transparent",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="Checkbox"
                    >
                      <Icon
                        name="check"
                        color="#ffffff"
                        prefix="fas"
                        size={16}
                        sx={{
                          opacity: focused ? 1 : 0,
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 20,
                        textAlign: "center",
                        m: theme.spacing(0, 1, 0, 0),
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                          lineHeight: "20px",
                          color: grey[900],
                        }}
                      >
                        {emoji}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        color: grey[900],
                      }}
                    >
                      {title}
                    </Typography>
                  </ButtonBase>
                );
              })}
            </Box>
            <Box
              sx={{
                flex: 1,
                width: 1200 - 240,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  p: theme.spacing(2, 0),
                  "@media(max-width: 480px)": {
                    p: theme.spacing(1, 0),
                  },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "@media(max-width: 480px)": {
                        display: "none",
                      },
                    }}
                  >
                    <FilterItem
                      title="채널 필터"
                      focused={channelFilterFocused}
                      open={channelFilterOpen}
                      setOpen={setChannelFilterOpen}
                    >
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                              m: theme.spacing(0, 1, 0, 0),
                            }}
                          >
                            구독자수
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`${numberToKorean(filter.channel.subscribers[0])}${
                              filter.channel.subscribers[0] === 0 ? "" : "명"
                            }`}{" "}
                            ~{" "}
                            {filter.channel.subscribers[1] === 5000000
                              ? "무제한"
                              : `${numberToKorean(
                                  filter.channel.subscribers[1]
                                )}명`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.channel.subscribers}
                              onChange={onChangeChannelSubscribers}
                              max={5000000}
                              step={50000}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                250만
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                무제한
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                              m: theme.spacing(0, 1, 0, 0),
                            }}
                          >
                            예상 광고단가
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`${numberToKorean(filter.channel.price[0])}${
                              filter.channel.price[0] === 0 ? "" : "원"
                            }`}{" "}
                            ~{" "}
                            {filter.channel.price[1] === 100000000
                              ? "무제한"
                              : `${numberToKorean(filter.channel.price[1])}원`}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            m: theme.spacing(0.5, 0, 1, 0),
                            fontSize: 14,
                            lineHeight: "16px",
                            color: grey[600],
                          }}
                        >
                          해당 단가는 예상 단가입니다.
                        </Typography>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.channel.price}
                              onChange={onChangeChannelPrice}
                              max={100000000}
                              step={1000000}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                5,000만
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                무제한
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <ButtonBase
                          sx={{
                            m: theme.spacing(2, 0, 0, 0),
                          }}
                          disableRipple
                          onClick={onClickPrice}
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "16px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`진짜 채널 단가가 궁금하시다면`}
                          </Typography>
                          <Icon
                            size={16}
                            name="chevron-right"
                            color={youhaBlue[500]}
                            sx={{
                              m: theme.spacing(0, 0, 0, 0.5),
                            }}
                          />
                        </ButtonBase>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                fontSize: 18,
                                lineHeight: "28px",
                                fontWeight: "700",
                              }}
                            >
                              채널 타입
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              m: theme.spacing(0.5, 0, 1, 0),
                              fontSize: 14,
                              lineHeight: "16px",
                              color: grey[600],
                            }}
                          >
                            어떤 영상 타입을 업로드하는 채널인지 여부입니다.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: theme.spacing(1, 0, 0, 0),
                          }}
                        >
                          {channelFormList.map((item, index) => {
                            const { title, value } = item;
                            const focused = filter.channel.form === value;
                            const onClick = () => {
                              onChangeChannelForm(value);
                            };
                            return (
                              <ButtonBase
                                key={index}
                                sx={{
                                  width: "100%",
                                  p: theme.spacing(1, 0),
                                  "&:hover .MuiTypography-root": {
                                    opacity: 0.4,
                                  },
                                }}
                                disableRipple
                                onClick={onClick}
                              >
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    p: theme.spacing(0.5),
                                    border: `1px solid ${grey[300]}`,
                                    m: theme.spacing(0, 1, 0, 0),
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      backgroundColor: focused
                                        ? youhaBlue[500]
                                        : "transparent",
                                    }}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    lineHeight: "20px",
                                    color: grey[900],
                                  }}
                                >
                                  {title}
                                </Typography>
                              </ButtonBase>
                            );
                          })}
                        </Box>
                      </Box>
                    </FilterItem>
                    <FilterItem
                      title="시청자 필터"
                      focused={targetFilterFocused}
                      open={targetFilterOpen}
                      setOpen={setTargetFilterOpen}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          p: theme.spacing(2),
                          borderRight: `1px solid ${grey[300]}`,
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            주 시청자 성별
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: theme.spacing(1, 0, 0, 0),
                          }}
                        >
                          {targetGenderList.map((item, index) => {
                            const { title, value } = item;
                            const focused = filter.target.gender === value;
                            const onClick = () => {
                              onChangeTargetGender(value);
                            };
                            return (
                              <ButtonBase
                                key={index}
                                sx={{
                                  width: "100%",
                                  p: theme.spacing(1, 0),
                                  "&:hover .MuiTypography-root": {
                                    opacity: 0.4,
                                  },
                                }}
                                disableRipple
                                onClick={onClick}
                              >
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    p: theme.spacing(0.5),
                                    border: `1px solid ${grey[300]}`,
                                    m: theme.spacing(0, 1, 0, 0),
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      backgroundColor: focused
                                        ? youhaBlue[500]
                                        : "transparent",
                                    }}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    lineHeight: "20px",
                                    color: grey[900],
                                  }}
                                >
                                  {title}
                                </Typography>
                              </ButtonBase>
                            );
                          })}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            주 시청자 연령대
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: theme.spacing(1, 0, 0, 0),
                          }}
                        >
                          {targetAgeList.map((item, index) => {
                            const { title, value } = item;
                            const focused = filter.target.age === value;
                            const onClick = () => {
                              onChangeTargetAge(value);
                            };
                            return (
                              <ButtonBase
                                key={index}
                                sx={{
                                  width: "100%",
                                  p: theme.spacing(1, 0),
                                  "&:hover .MuiTypography-root": {
                                    opacity: 0.4,
                                  },
                                }}
                                disableRipple
                                onClick={onClick}
                              >
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    p: theme.spacing(0.5),
                                    border: `1px solid ${grey[300]}`,
                                    m: theme.spacing(0, 1, 0, 0),
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      backgroundColor: focused
                                        ? youhaBlue[500]
                                        : "transparent",
                                    }}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    lineHeight: "20px",
                                    color: grey[900],
                                  }}
                                >
                                  {title}
                                </Typography>
                              </ButtonBase>
                            );
                          })}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            한국 시청자 비율
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {filter.target.koreanRatio[0]}
                            {filter.target.koreanRatio[0] === 0
                              ? ""
                              : "%"} ~ {filter.target.koreanRatio[1]}%
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.target.koreanRatio}
                              onChange={onChangeTargetKoreanRatio}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                50%
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                100%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </FilterItem>
                    <FilterItem
                      title="콘텐츠 필터"
                      focused={contentsFilterFocused}
                      open={contentsFilterOpen}
                      setOpen={setContentsFilterOpen}
                    >
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            평균 조회수
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`${numberToKorean(
                              filter.contents.everageViews[0]
                            )}${
                              filter.contents.everageViews[0] === 0 ? "" : "회"
                            }`}{" "}
                            ~{" "}
                            {filter.contents.everageViews[1] === 10000000
                              ? "무제한"
                              : `${numberToKorean(
                                  filter.contents.everageViews[1]
                                )}회`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.contents.everageViews}
                              onChange={onChangeContentsEverageViews}
                              max={10000000}
                              step={1000000}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                500만
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                무제한
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            댓글 작성율
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`${filter.contents.commentRatio[0]}${
                              filter.contents.commentRatio[0] === 0 ? "" : "%"
                            }`}{" "}
                            ~{" "}
                            {`${numberToKorean(
                              filter.contents.commentRatio[1]
                            )}%`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.contents.commentRatio}
                              onChange={onChangeContentsCommentRatio}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                50%
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                무제한
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            콘텐츠 호감도
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`${filter.contents.likeRatio[0]}${
                              filter.contents.likeRatio[0] === 0 ? "" : "%"
                            }`}{" "}
                            ~{" "}
                            {`${numberToKorean(filter.contents.likeRatio[1])}%`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.contents.likeRatio}
                              onChange={onChangeContentsLikeRatio}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                50%
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                무제한
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            최근 업로드 날짜
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: theme.spacing(1, 0, 0, 0),
                          }}
                        >
                          {recentUploadDateList.map((item, index) => {
                            const { title, value } = item;
                            const focused =
                              filter.contents.recentUploadDate === value;
                            const onClick = () => {
                              onChangeContentsRecentUploadDate(value);
                            };
                            return (
                              <ButtonBase
                                key={index}
                                sx={{
                                  width: "100%",
                                  p: theme.spacing(1, 0),
                                  "&:hover .MuiTypography-root": {
                                    opacity: 0.4,
                                  },
                                }}
                                disableRipple
                                onClick={onClick}
                              >
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    p: theme.spacing(0.5),
                                    border: `1px solid ${grey[300]}`,
                                    m: theme.spacing(0, 1, 0, 0),
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      backgroundColor: focused
                                        ? youhaBlue[500]
                                        : "transparent",
                                    }}
                                  />
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: 14,
                                    lineHeight: "20px",
                                    color: grey[900],
                                  }}
                                >
                                  {title}
                                </Typography>
                              </ButtonBase>
                            );
                          })}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 18,
                              lineHeight: "28px",
                              fontWeight: "700",
                            }}
                          >
                            주간 업로드 빈도
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              lineHeight: "28px",
                              color: youhaBlue[500],
                            }}
                          >
                            {`${filter.contents.uploadFrequency[0] / 10}${
                              filter.contents.uploadFrequency[0] === 0
                                ? ""
                                : "회"
                            }`}{" "}
                            ~{" "}
                            {filter.contents.uploadFrequency[1] === 100
                              ? "무제한"
                              : `${filter.contents.uploadFrequency[1] / 10}회`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            m: theme.spacing(2, -0.5, 0, -0.5),
                          }}
                        >
                          <Box
                            sx={{
                              height: 20,
                              p: theme.spacing(0, 2, 0, 2),
                            }}
                          >
                            <Slider
                              getAriaValueText={valuetext}
                              valueLabelFormat={valuetext}
                              value={filter.contents.uploadFrequency}
                              onChange={onChangeContentsUploadFrequency}
                              max={100}
                              sx={{
                                height: 20,
                                position: "relative",
                                m: `0 !important`,
                                p: `${theme.spacing(0, 0, 0, 0)} !important`,
                                "& .MuiSlider-rail": {
                                  opacity: 1,
                                  // backgroundColor: youhaBlue[500],
                                  backgroundColor: grey[200],
                                  height: 4,
                                },
                                "& .MuiSlider-track": {
                                  height: 4,
                                  // backgroundColor: grey[200],
                                  border: "none",
                                },
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                  backgroundColor: "#ffffff",
                                  boxShadow: `none !important`,
                                  zIndex: 99,
                                },
                                "& .MuiSlider-thumb::before": {
                                  boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                                },
                                "& .MuiSlider-valueLabel": {
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  fontWeight: "700",
                                  fontFamily: `LINESeedKR`,
                                  p: theme.spacing(0.5, 1),
                                  backgroundColor: grey[900],
                                  "& *": {
                                    background: "transparent",
                                  },
                                },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              position: "relative",
                              height: 28,
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                0
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                5회
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `1px`,
                                  height: `6px`,
                                  backgroundColor: grey[400],
                                  m: theme.spacing(0, 0, 0.5, 0),
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  lineHeight: "16px",
                                  color: grey[500],
                                }}
                              >
                                무제한
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </FilterItem>
                    <FilterItem
                      title="MCN 필터"
                      focused={mcnFilterFocused}
                      open={mcnFilterOpen}
                      setOpen={setMcnFilterOpen}
                    >
                      <Box
                        sx={{
                          p: theme.spacing(2),
                        }}
                        className="FilterSection"
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-end",
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                fontSize: 18,
                                lineHeight: "28px",
                                fontWeight: "700",
                              }}
                            >
                              소속 MCN
                            </Typography>
                            <Box
                              sx={{
                                position: "relative",
                              }}
                            >
                              <InputBase
                                value={mcnValue}
                                onChange={onChangeMcnInput}
                                placeholder="찾으시는 MCN 이름을 입력하세요."
                                sx={{
                                  width: 280,
                                  height: 32,
                                  p: theme.spacing(0, 5, 0, 2),
                                  borderRadius: 1,
                                  display: "flex",
                                  alignItems: "center",
                                  boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                                  "&:hover": {
                                    boxShadow: `${grey[500]} 0px 0px 0px 1px inset`,
                                  },
                                  "&.Mui-focused": {
                                    boxShadow: `${grey[700]} 0px 0px 0px 1px inset`,
                                    "& input": {
                                      fontSize: 14,
                                      "&::placeholder": {
                                        color: grey[700],
                                      },
                                    },
                                  },
                                  "& input": {
                                    fontSize: `12px !important`,
                                    "&::placeholder": {
                                      color: grey[500],
                                      opacity: 1,
                                    },
                                  },
                                }}
                              />
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  top: "50%",
                                  right: 0,
                                  transform: "translateY(-50%)",
                                }}
                                onClick={onClickSearch}
                              >
                                <Icon
                                  name="search"
                                  size={16}
                                  color={grey[500]}
                                />
                              </IconButton>
                            </Box>
                          </Box>
                          <Typography
                            sx={{
                              m: theme.spacing(0.5, 0, 1, 0),
                              fontSize: 14,
                              lineHeight: "16px",
                              color: grey[600],
                            }}
                          >
                            선택한 MCN 소속의 유튜버만 보여집니다.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: theme.spacing(1, 0, 0, 0),
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gridAutoRows: "1fr",
                            gridTemplateRows: "auto auto",
                          }}
                        >
                          {mcnList.map((item, index) => {
                            const { title, value } = item;
                            const focused = filter.mcns.includes(value);
                            const notSearched =
                              mcnValue !== "" && !title.includes(mcnValue);
                            const onClick = () => {
                              let newMcns = _.cloneDeep(filter.mcns);
                              if (value === "") {
                                newMcns = [""];
                              } else {
                                newMcns = _.filter(newMcns, (el) => el !== "");
                                if (focused) {
                                  newMcns = _.filter(
                                    newMcns,
                                    (el) => el !== value
                                  );
                                } else {
                                  newMcns = [...newMcns, value];
                                }
                              }
                              onChangeMcns(newMcns);
                            };
                            return (
                              <Box key={index}>
                                <ButtonBase
                                  sx={{
                                    width: "auto",
                                    p: theme.spacing(1, 0),
                                    "&:hover .MuiTypography-root": {
                                      opacity: 0.4,
                                    },
                                  }}
                                  disableRipple
                                  onClick={onClick}
                                >
                                  <Box
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: 0.5,
                                      boxShadow: `${
                                        focused ? youhaBlue[500] : grey[300]
                                      } 0px 0px 0px 1px`,
                                      m: theme.spacing(0, 1, 0, 0),
                                      backgroundColor: focused
                                        ? youhaBlue[500]
                                        : "transparent",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                    className="Checkbox"
                                  >
                                    <Icon
                                      name="check"
                                      color="#ffffff"
                                      prefix="fas"
                                      size={16}
                                      sx={{
                                        opacity: focused ? 1 : 0,
                                      }}
                                    />
                                  </Box>
                                  <Typography
                                    sx={{
                                      fontSize: 14,
                                      lineHeight: "20px",
                                      color: grey[900],
                                      opacity: notSearched ? 0.4 : 1,
                                    }}
                                  >
                                    {mcnValue !== "" &&
                                    title.includes(mcnValue) ? (
                                      <>
                                        {title.split(mcnValue)[0]}
                                        <span style={{ color: pink[500] }}>
                                          {mcnValue}
                                        </span>
                                        {title.split(mcnValue)[1]}
                                      </>
                                    ) : (
                                      title
                                    )}
                                  </Typography>
                                </ButtonBase>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </FilterItem>
                    <ButtonBase
                      sx={{
                        p: theme.spacing(0, 1),
                        borderRadius: "50%",
                        "&:hover": {
                          "& svg": {
                            opacity: 0.4,
                          },
                        },
                      }}
                      disableRipple
                      onClick={onClickReset}
                    >
                      <Icon name="trash-alt" size={20} color={grey[500]} />
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: grey[500],
                          m: theme.spacing(0, 0, 0, 0.5),
                        }}
                      >
                        필터 초기화
                      </Typography>
                    </ButtonBase>
                  </Box>
                  <ButtonBase
                    sx={{
                      alignItems: "center",
                      boxShadow: `${grey[900]} 0px 0px 0px 1px`,
                      borderRadius: 0.5,
                      p: theme.spacing(1, 2),
                      m: theme.spacing(0, 1, 0, 0),
                      display: "none",
                      "@media(max-width: 480px)": {
                        display: "flex",
                      },
                    }}
                    onClick={onClickFilter}
                  >
                    <Icon
                      name="sliders"
                      prefix={filterFocused ? "fas" : "far"}
                      size={16}
                      color={grey[900]}
                      sx={{
                        m: theme.spacing(0, 1, 0, -1),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeight: "20px",
                        color: grey[900],
                        fontWeight: filterFocused ? "700" : "400",
                      }}
                    >
                      필터
                    </Typography>
                  </ButtonBase>
                </Box>
                <Button>선택한 채널 광고 제안하기</Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: theme.spacing(2, 0),
                }}
              >
                <ButtonBase
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: 0.5,
                    boxShadow: `${
                      selected ? youhaBlue[500] : grey[300]
                    } 0px 0px 0px 1px`,
                    m: theme.spacing(0, 1, 0, 0),
                    backgroundColor: selected ? youhaBlue[500] : "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={onClickSelect}
                  className="Checkbox"
                >
                  <Icon
                    name="check"
                    color="#ffffff"
                    prefix="fas"
                    size={16}
                    sx={{
                      opacity: selected ? 1 : 0,
                    }}
                  />
                </ButtonBase>
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    lineHeight: "20px",
                  }}
                >
                  총 95,837개의 결과
                </Typography>
                <SortItem sort={sort} setSort={setSort} />
              </Box>
              <Stack spacing={2} className="Youtubers">
                {testCreators.map((item, index) => {
                  return (
                    <YoutuberItem
                      key={index}
                      index={index}
                      item={item}
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
      <Drawer anchor="bottom" open={filterOpen} onClose={onCloseFilter}>
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
          <Toolbar
            sx={{
              position: "relative",
              p: theme.spacing(0, 0.5),
              borderBottom: `1px solid ${grey[300]}`,
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
                fontSize: 18,
                lineHeight: "28px",
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
              onClick={onClickResetTemp}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: grey[700],
                }}
              >
                초기화
              </Typography>
            </ButtonBase>
          </Toolbar>
          <Box
            sx={{
              flex: 1,
              backgroundColor: grey[100],
              p: theme.spacing(0, 0, 12, 0),
              "& > .FilterSection": {
                backgroundColor: "#ffffff",
                borderBottom: `1px solid ${grey[300]}`,
                m: theme.spacing(0, 0, 2, 0),
              },
            }}
          >
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
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
                  <Typography
                    sx={{
                      m: theme.spacing(0, 0, 0, 1),
                      fontSize: 14,
                      lineHeight: "28px",
                      color: grey[600],
                    }}
                  >
                    중복선택 가능
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: theme.spacing(2, 0, -1, 0),
                }}
              >
                <ButtonBase
                  sx={{
                    p: theme.spacing(1, 2),
                    backgroundColor:
                      filterTemp.categories.length === 0 ||
                      (filterTemp.categories.length !== 0 &&
                        filterTemp.categories[0] === "")
                        ? youhaBlue[50]
                        : grey[100],
                    borderRadius: 2,
                    "&:hover": {
                      boxShadow: `${
                        filterTemp.categories.length === 0 ||
                        (filterTemp.categories.length !== 0 &&
                          filterTemp.categories[0] === "")
                          ? youhaBlue[500]
                          : grey[300]
                      } 0px 0px 0px 1px inset`,
                    },
                    m: theme.spacing(0, 1, 1, 0),
                  }}
                  disableRipple
                  onClick={onChangeCategoriesResetTemp}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      color:
                        filterTemp.categories.length === 0 ||
                        (filterTemp.categories.length !== 0 &&
                          filterTemp.categories[0] === "")
                          ? youhaBlue[500]
                          : grey[900],
                    }}
                  >
                    전체
                  </Typography>
                </ButtonBase>
                {categoryList.map((item, index) => {
                  const router = useRouter();
                  const { emoji, title, value } = item;
                  const focused = filterTemp.categories.includes(value);
                  const onClick = () => {
                    onChangeCategoriesTemp(value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        p: theme.spacing(1, 2),
                        backgroundColor: focused ? youhaBlue[50] : grey[100],
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: `${
                            focused ? youhaBlue[500] : grey[300]
                          } 0px 0px 0px 1px inset`,
                        },
                        m: theme.spacing(0, 1, 1, 0),
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: focused ? youhaBlue[500] : grey[900],
                        }}
                      >
                        {title}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                    m: theme.spacing(0, 1, 0, 0),
                  }}
                >
                  구독자수
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {`${numberToKorean(filterTemp.channel.subscribers[0])}${
                    filterTemp.channel.subscribers[0] === 0 ? "" : "명"
                  }`}{" "}
                  ~{" "}
                  {filterTemp.channel.subscribers[1] === 5000000
                    ? "무제한"
                    : `${numberToKorean(filterTemp.channel.subscribers[1])}명`}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.channel.subscribers}
                    onChange={onChangeChannelSubscribersTemp}
                    max={5000000}
                    step={50000}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      250만
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      무제한
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                    m: theme.spacing(0, 1, 0, 0),
                  }}
                >
                  예상 광고단가
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {`${numberToKorean(filterTemp.channel.price[0])}${
                    filterTemp.channel.price[0] === 0 ? "" : "원"
                  }`}{" "}
                  ~{" "}
                  {filterTemp.channel.price[1] === 100000000
                    ? "무제한"
                    : `${numberToKorean(filterTemp.channel.price[1])}원`}
                </Typography>
              </Box>
              <Typography
                sx={{
                  m: theme.spacing(0.5, 0, 1, 0),
                  fontSize: 14,
                  lineHeight: "16px",
                  color: grey[600],
                }}
              >
                해당 단가는 예상 단가입니다.
              </Typography>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.channel.price}
                    onChange={onChangeChannelPriceTemp}
                    max={100000000}
                    step={1000000}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      5,000만
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      무제한
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <ButtonBase
                sx={{
                  m: theme.spacing(2, 0, 0, 0),
                }}
                disableRipple
                onClick={onClickPrice}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "16px",
                    color: youhaBlue[500],
                  }}
                >
                  {`진짜 채널 단가가 궁금하시다면`}
                </Typography>
                <Icon
                  size={16}
                  name="chevron-right"
                  color={youhaBlue[500]}
                  sx={{
                    m: theme.spacing(0, 0, 0, 0.5),
                  }}
                />
              </ButtonBase>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: 18,
                      lineHeight: "28px",
                      fontWeight: "700",
                    }}
                  >
                    채널 타입
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    m: theme.spacing(0.5, 0, 1, 0),
                    fontSize: 14,
                    lineHeight: "16px",
                    color: grey[600],
                  }}
                >
                  어떤 영상 타입을 업로드하는 채널인지 여부입니다.
                </Typography>
              </Box>
              <Box
                sx={{
                  p: theme.spacing(1, 0, 0, 0),
                }}
              >
                {channelFormList.map((item, index) => {
                  const { title, value } = item;
                  const focused = filterTemp.channel.form === value;
                  const onClick = () => {
                    onChangeChannelFormTemp(value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        p: theme.spacing(1, 2),
                        backgroundColor: focused ? youhaBlue[50] : grey[100],
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: `${
                            focused ? youhaBlue[500] : grey[300]
                          } 0px 0px 0px 1px inset`,
                        },
                        m: theme.spacing(0, 1, 1, 0),
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: focused ? youhaBlue[500] : grey[900],
                        }}
                      >
                        {title}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: theme.spacing(2),
                borderRight: `1px solid ${grey[300]}`,
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  주 시청자 성별
                </Typography>
              </Box>
              <Box
                sx={{
                  p: theme.spacing(1, 0, 0, 0),
                }}
              >
                {targetGenderList.map((item, index) => {
                  const { title, value } = item;
                  const focused = filterTemp.target.gender === value;
                  const onClick = () => {
                    onChangeTargetGenderTemp(value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        p: theme.spacing(1, 2),
                        backgroundColor: focused ? youhaBlue[50] : grey[100],
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: `${
                            focused ? youhaBlue[500] : grey[300]
                          } 0px 0px 0px 1px inset`,
                        },
                        m: theme.spacing(0, 1, 1, 0),
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: focused ? youhaBlue[500] : grey[900],
                        }}
                      >
                        {title}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                flex: 1,
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  주 시청자 연령대
                </Typography>
              </Box>
              <Box
                sx={{
                  p: theme.spacing(1, 0, 0, 0),
                }}
              >
                {targetAgeList.map((item, index) => {
                  const { title, value } = item;
                  const focused = filterTemp.target.age === value;
                  const onClick = () => {
                    onChangeTargetAgeTemp(value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        p: theme.spacing(1, 2),
                        backgroundColor: focused ? youhaBlue[50] : grey[100],
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: `${
                            focused ? youhaBlue[500] : grey[300]
                          } 0px 0px 0px 1px inset`,
                        },
                        m: theme.spacing(0, 1, 1, 0),
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: focused ? youhaBlue[500] : grey[900],
                        }}
                      >
                        {title}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  한국 시청자 비율
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {filterTemp.target.koreanRatio[0]}
                  {filterTemp.target.koreanRatio[0] === 0 ? "" : "%"} ~{" "}
                  {filterTemp.target.koreanRatio[1]}%
                </Typography>
              </Box>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.target.koreanRatio}
                    onChange={onChangeTargetKoreanRatioTemp}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      50%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      100%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  평균 조회수
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {`${numberToKorean(filterTemp.contents.everageViews[0])}${
                    filterTemp.contents.everageViews[0] === 0 ? "" : "회"
                  }`}{" "}
                  ~{" "}
                  {filterTemp.contents.everageViews[1] === 10000000
                    ? "무제한"
                    : `${numberToKorean(
                        filterTemp.contents.everageViews[1]
                      )}회`}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.contents.everageViews}
                    onChange={onChangeContentsEverageViewsTemp}
                    max={10000000}
                    step={1000000}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      500만
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      무제한
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  댓글 작성율
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {`${filterTemp.contents.commentRatio[0]}${
                    filterTemp.contents.commentRatio[0] === 0 ? "" : "%"
                  }`}{" "}
                  ~ {`${numberToKorean(filterTemp.contents.commentRatio[1])}%`}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.contents.commentRatio}
                    onChange={onChangeContentsCommentRatioTemp}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      50%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      무제한
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  콘텐츠 호감도
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {`${filterTemp.contents.likeRatio[0]}${
                    filterTemp.contents.likeRatio[0] === 0 ? "" : "%"
                  }`}{" "}
                  ~ {`${numberToKorean(filterTemp.contents.likeRatio[1])}%`}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.contents.likeRatio}
                    onChange={onChangeContentsLikeRatioTemp}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      50%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      무제한
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  최근 업로드 날짜
                </Typography>
              </Box>
              <Box
                sx={{
                  p: theme.spacing(1, 0, 0, 0),
                }}
              >
                {recentUploadDateList.map((item, index) => {
                  const { title, value } = item;
                  const focused =
                    filterTemp.contents.recentUploadDate === value;
                  const onClick = () => {
                    onChangeContentsRecentUploadDateTemp(value);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        p: theme.spacing(1, 2),
                        backgroundColor: focused ? youhaBlue[50] : grey[100],
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: `${
                            focused ? youhaBlue[500] : grey[300]
                          } 0px 0px 0px 1px inset`,
                        },
                        m: theme.spacing(0, 1, 1, 0),
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: focused ? youhaBlue[500] : grey[900],
                        }}
                      >
                        {title}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: "700",
                  }}
                >
                  주간 업로드 빈도
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "28px",
                    color: youhaBlue[500],
                  }}
                >
                  {`${filterTemp.contents.uploadFrequency[0] / 10}${
                    filterTemp.contents.uploadFrequency[0] === 0 ? "" : "회"
                  }`}{" "}
                  ~{" "}
                  {filterTemp.contents.uploadFrequency[1] === 100
                    ? "무제한"
                    : `${filterTemp.contents.uploadFrequency[1] / 10}회`}
                </Typography>
              </Box>
              <Box
                sx={{
                  m: theme.spacing(2, -0.5, 0, -0.5),
                }}
              >
                <Box
                  sx={{
                    height: 20,
                    p: theme.spacing(0, 2, 0, 2),
                  }}
                >
                  <Slider
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    value={filterTemp.contents.uploadFrequency}
                    onChange={onChangeContentsUploadFrequencyTemp}
                    max={100}
                    sx={{
                      height: 20,
                      position: "relative",
                      m: `0 !important`,
                      p: `${theme.spacing(0, 0, 0, 0)} !important`,
                      "& .MuiSlider-rail": {
                        opacity: 1,
                        // backgroundColor: youhaBlue[500],
                        backgroundColor: grey[200],
                        height: 4,
                      },
                      "& .MuiSlider-track": {
                        height: 4,
                        // backgroundColor: grey[200],
                        border: "none",
                      },
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#ffffff",
                        boxShadow: `none !important`,
                        zIndex: 99,
                      },
                      "& .MuiSlider-thumb::before": {
                        boxShadow: `0px 3px 4px -2px rgb(0 0 0 / 20%), 0px 2px 6px 0px rgb(0 0 0 / 14%), 0px 1px 9px 0px rgb(0 0 0 / 12%)`,
                      },
                      "& .MuiSlider-valueLabel": {
                        fontSize: 12,
                        lineHeight: "16px",
                        fontWeight: "700",
                        fontFamily: `LINESeedKR`,
                        p: theme.spacing(0.5, 1),
                        backgroundColor: grey[900],
                        "& *": {
                          background: "transparent",
                        },
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    height: 28,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      0
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      5회
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                    }}
                  >
                    <Box
                      sx={{
                        width: `1px`,
                        height: `6px`,
                        backgroundColor: grey[400],
                        m: theme.spacing(0, 0, 0.5, 0),
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: "16px",
                        color: grey[500],
                      }}
                    >
                      무제한
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: theme.spacing(2),
              }}
              className="FilterSection"
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: 18,
                      lineHeight: "28px",
                      fontWeight: "700",
                    }}
                  >
                    소속 MCN
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    m: theme.spacing(0.5, 0, 1, 0),
                    fontSize: 14,
                    lineHeight: "16px",
                    color: grey[600],
                  }}
                >
                  선택한 MCN 소속의 유튜버만 보여집니다.
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  p: theme.spacing(1, 0, 1, 0),
                  position: "relative",
                }}
              >
                <InputBase
                  value={mcnValue}
                  onChange={onChangeMcnInput}
                  placeholder="찾으시는 MCN 이름을 입력하세요."
                  sx={{
                    height: 40,
                    p: theme.spacing(0, 5, 0, 2),
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                    "&:hover": {
                      boxShadow: `${grey[500]} 0px 0px 0px 1px inset`,
                    },
                    "&.Mui-focused": {
                      boxShadow: `${grey[700]} 0px 0px 0px 1px inset`,
                      "& input": {
                        fontSize: 14,
                        "&::placeholder": {
                          color: grey[700],
                        },
                      },
                    },
                    "& input": {
                      fontSize: 14,
                      "&::placeholder": {
                        color: grey[500],
                        opacity: 1,
                      },
                    },
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                  }}
                  onClick={onClickSearch}
                >
                  <Icon name="search" size={20} color={grey[500]} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  p: theme.spacing(1, 0, 0, 0),
                }}
              >
                {mcnList.map((item, index) => {
                  const { title, value } = item;
                  const focused = filterTemp.mcns.includes(value);
                  const notSearched =
                    mcnValue !== "" && !title.includes(mcnValue);
                  const onClick = () => {
                    let newMcns = _.cloneDeep(filterTemp.mcns);
                    if (value === "") {
                      newMcns = [""];
                    } else {
                      newMcns = _.filter(newMcns, (el) => el !== "");
                      if (focused) {
                        newMcns = _.filter(newMcns, (el) => el !== value);
                      } else {
                        newMcns = [...newMcns, value];
                      }
                    }
                    onChangeMcnsTemp(newMcns);
                  };
                  return (
                    <ButtonBase
                      key={index}
                      sx={{
                        p: theme.spacing(1, 2),
                        backgroundColor: focused ? youhaBlue[50] : grey[100],
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: `${
                            focused ? youhaBlue[500] : grey[300]
                          } 0px 0px 0px 1px inset`,
                        },
                        m: theme.spacing(0, 1, 1, 0),
                        opacity: notSearched ? 0.4 : 1,
                      }}
                      disableRipple
                      onClick={onClick}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "20px",
                          color: focused ? youhaBlue[500] : grey[900],
                        }}
                      >
                        {mcnValue !== "" && title.includes(mcnValue) ? (
                          <>
                            {title.split(mcnValue)[0]}
                            <span style={{ color: pink[500] }}>{mcnValue}</span>
                            {title.split(mcnValue)[1]}
                          </>
                        ) : (
                          title
                        )}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
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
    </>
  );
}

function SortItem({
  sort,
  setSort,
}: {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}) {
  const ref = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const color = open ? youhaBlue[500] : grey[900];
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
        }}
        disableRipple
        onClick={onClick}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: grey[900],
          }}
        >
          {sortList[_.findIndex(sortList, (el) => el.value === sort)].title}
        </Typography>
        <Icon
          name="angle-down"
          prefix="far"
          size={16}
          color={grey[900]}
          sx={{
            m: theme.spacing(0, 0, 0, 0.5),
            transform: `rotate(${open ? "180deg" : "0"})`,
          }}
        />
      </ButtonBase>
      <Box
        sx={{
          position: "absolute",
          top: 32,
          right: 0,
          width: 172,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          overflow: "auto",
          p: theme.spacing(1, 0),
          border: `1px solid ${grey[300]}`,
          borderRadius: 0.5,
          zIndex: 99,
          backgroundColor: `#ffffff`,
        }}
      >
        {sortList.map((item, index) => {
          const { title, value } = item;
          const focused = sort === value;
          const onClick = () => {
            setSort(value);
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
                  backgroundColor: alpha("#2F59CC", 0.08),
                },
              }}
              onClick={onClick}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  color: focused ? youhaBlue[500] : grey[900],
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

function FilterItem({
  focused,
  title,
  open,
  setOpen,
  children,
}: {
  focused?: boolean;
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}) {
  const ref = useRef<any>(null);
  const color = open ? youhaBlue[500] : grey[900];
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
    <Box ref={ref} sx={{ position: "relative" }}>
      <ButtonBase
        sx={{
          alignItems: "center",
          boxShadow: `${open ? youhaBlue[500] : grey[300]} 0px 0px 0px 1px`,
          borderRadius: 0.5,
          p: theme.spacing(1, 2),
          m: theme.spacing(0, 1, 0, 0),
        }}
        onClick={onClick}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: color,
            fontWeight: focused ? "700" : "400",
          }}
        >
          {title}
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
      <Panel open={open} title={title}>
        {children}
      </Panel>
    </Box>
  );
}

function Panel({
  open,
  title,
  children,
}: {
  open: boolean;
  title: string;
  children?: React.ReactNode;
}) {
  const mcnFilter = title === "MCN 필터";
  return (
    <Box
      sx={{
        position: "absolute",
        top: 48,
        left: mcnFilter ? "initial" : 0,
        right: mcnFilter ? -516 : "initial",
        width: mcnFilter ? 976 : 360,
        display: open ? "flex" : "none",
        boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
        flexDirection: "column",
        overflow: "auto",
        border: `1px solid ${grey[300]}`,
        borderRadius: 0.5,
        backgroundColor: "#ffffff",
        zIndex: 99,
        "& > .FilterSection:not(:nth-child(1))": {
          borderTop: `1px solid ${grey[300]}`,
        },
      }}
    >
      {children}
    </Box>
  );
}
