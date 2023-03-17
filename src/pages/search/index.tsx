import _ from "lodash";
import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  Slider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
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
  channelTypeList,
  mcnList,
  recentUploadDateList,
  sortList,
  subscribersAgeList,
  subscribersGenderList,
  tabList,
} from "../../constants";

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
      onSearchClick();
    }
  };
  const onSearchClick = () => {
    if (value === "") return;
    router.push(`/search?value=${value}`);
  };
  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);
  const [channelFilterOpen, setChannelFilterOpen] = useState<boolean>(false);
  const [targetFilterOpen, setTargetFilterOpen] = useState<boolean>(false);
  const [contentsFilterOpen, setContentsFilterOpen] = useState<boolean>(false);
  const [mcnFilterOpen, setMcnFilterOpen] = useState<boolean>(false);

  //채널 필터
  const [subscribers, setSubscribers] = useState<number[]>([0, 5000000]);
  const onSubscribersChange = (event: Event, newValue: number | number[]) => {
    setSubscribers(newValue as number[]);
  };
  const [price, setPrice] = useState<number[]>([0, 100000000]);
  const onpriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const [channelType, setChannelType] = useState<string>("");
  const channelFilterFocused =
    subscribers[0] !== 0 ||
    subscribers[1] !== 5000000 ||
    price[0] !== 0 ||
    price[1] !== 100000000 ||
    channelType !== "";

  //시청자 필터
  const [subscribersGender, setSubscribersGender] = useState<string>("");
  const [subscribersAge, setSubscribersAge] = useState<string>("");
  const [subscribersKoreanRatio, setSubscribersKoreanRatio] = useState<
    number[]
  >([0, 100]);
  const onChangeSubscriberKoreanRatio = (
    event: Event,
    newValue: number | number[]
  ) => {
    setSubscribersKoreanRatio(newValue as number[]);
  };
  const targetFilterFocused =
    subscribersGender !== "" ||
    subscribersAge !== "" ||
    subscribersKoreanRatio[0] !== 0 ||
    subscribersKoreanRatio[1] !== 100;

  //콘텐츠 필터
  const [everageViews, setEverageViews] = useState<number[]>([0, 10000000]);
  const onChangeEverageViews = (event: Event, newValue: number | number[]) => {
    setEverageViews(newValue as number[]);
  };
  const [commentRatio, setCommentRatio] = useState<number[]>([0, 100]);
  const onChangeCommentRatio = (event: Event, newValue: number | number[]) => {
    setCommentRatio(newValue as number[]);
  };
  const [likeRatio, setLikeRatio] = useState<number[]>([0, 100]);
  const onChangeLikeRatio = (event: Event, newValue: number | number[]) => {
    setLikeRatio(newValue as number[]);
  };
  const [recentUploadDate, setRecentUploadDate] = useState<string>("");
  const [uploadFrequency, setUploadFrequency] = useState<number[]>([0, 100]);
  const onChangeUploadFrequency = (
    event: Event,
    newValue: number | number[]
  ) => {
    setUploadFrequency(newValue as number[]);
  };
  const contentsFilterFocused =
    everageViews[0] !== 0 ||
    everageViews[1] !== 10000000 ||
    commentRatio[0] !== 0 ||
    commentRatio[1] !== 100 ||
    likeRatio[0] !== 0 ||
    likeRatio[1] !== 100 ||
    recentUploadDate !== "" ||
    uploadFrequency[0] !== 0 ||
    uploadFrequency[1] !== 100;

  //MCN 필터
  const [mcns, setMcns] = useState<string[]>([""]);
  const mcnFilterFocused = mcns[0] !== "";

  //필터 초기화
  const onClickReset = () => {
    //채널 필터
    setSubscribers([0, 5000000]);
    setPrice([0, 100000000]);
    setChannelType("");
    //시청자 필터
    setSubscribersGender("");
    setSubscribersAge("");
    setSubscribersKoreanRatio([0, 100]);
    //콘텐츠 필터
    setCommentRatio([0, 100]);
    setLikeRatio([0, 100]);
    setRecentUploadDate("");
    setUploadFrequency([0, 100]);
    //MCN 필터
    setMcns([""]);
  };

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
  }, [channelFilterOpen, targetFilterOpen, contentsFilterOpen, mcnFilterOpen]);
  return (
    <Container>
      <Box
        sx={{
          p: theme.spacing(2, 0, 10, 0),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: theme.spacing(2, 0),
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                width: 240,
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
              }}
            >
              유하 통합검색
            </Typography>
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
          <Box
            sx={{
              position: "relative",
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
              onClick={onSearchClick}
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
                const newCategories = focused
                  ? categories.filter((el) => el !== value)
                  : [...categories, value];
                router.push(
                  `/search?${
                    type !== undefined ? "type=youtuber&" : `type=${type}&`
                  }categories=${newCategories.map((el, index) => {
                    return el;
                  })}`
                );
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
                      backgroundColor: focused ? youhaBlue[500] : "transparent",
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
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                p: theme.spacing(2, 0),
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
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
                        {`${numberToKorean(subscribers[0])}${
                          subscribers[0] === 0 ? "" : "명"
                        }`}{" "}
                        ~{" "}
                        {subscribers[1] === 5000000
                          ? "무제한"
                          : `${numberToKorean(subscribers[1])}명`}
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
                          value={subscribers}
                          onChange={onSubscribersChange}
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
                        광고단가
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: "28px",
                          color: youhaBlue[500],
                        }}
                      >
                        {`${numberToKorean(price[0])}${
                          price[0] === 0 ? "" : "원"
                        }`}{" "}
                        ~{" "}
                        {price[1] === 100000000
                          ? "무제한"
                          : `${numberToKorean(price[1])}원`}
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
                          value={price}
                          onChange={onpriceChange}
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
                      {channelTypeList.map((item, index) => {
                        const { title, value } = item;
                        const focused = channelType === value;
                        const onClick = () => {
                          setChannelType(value);
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
                      {subscribersGenderList.map((item, index) => {
                        const { title, value } = item;
                        const focused = subscribersGender === value;
                        const onClick = () => {
                          setSubscribersGender(value);
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
                      {subscribersAgeList.map((item, index) => {
                        const { title, value } = item;
                        const focused = subscribersAge === value;
                        const onClick = () => {
                          setSubscribersAge(value);
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
                        {subscribersKoreanRatio[0]}
                        {subscribersKoreanRatio[0] === 0 ? "" : "%"} ~{" "}
                        {subscribersKoreanRatio[1]}%
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
                          value={subscribersKoreanRatio}
                          onChange={onChangeSubscriberKoreanRatio}
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
                        {`${numberToKorean(everageViews[0])}${
                          everageViews[0] === 0 ? "" : "회"
                        }`}{" "}
                        ~{" "}
                        {everageViews[1] === 10000000
                          ? "무제한"
                          : `${numberToKorean(everageViews[1])}회`}
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
                          value={everageViews}
                          onChange={onChangeEverageViews}
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
                        {`${commentRatio[0]}${
                          commentRatio[0] === 0 ? "" : "%"
                        }`}{" "}
                        ~ {`${numberToKorean(commentRatio[1])}%`}
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
                          value={commentRatio}
                          onChange={onChangeCommentRatio}
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
                        {`${likeRatio[0]}${likeRatio[0] === 0 ? "" : "%"}`} ~{" "}
                        {`${numberToKorean(likeRatio[1])}%`}
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
                          value={likeRatio}
                          onChange={onChangeLikeRatio}
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
                        const focused = subscribersGender === value;
                        const onClick = () => {
                          setRecentUploadDate(value);
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
                        {`${uploadFrequency[0] / 10}${
                          uploadFrequency[0] === 0 ? "" : "회"
                        }`}{" "}
                        ~{" "}
                        {uploadFrequency[1] === 100
                          ? "무제한"
                          : `${uploadFrequency[1] / 10}회`}
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
                          value={uploadFrequency}
                          onChange={onChangeUploadFrequency}
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
                      </Box>
                      <Typography
                        sx={{
                          m: theme.spacing(0.5, 0, 1, 0),
                          fontSize: 14,
                          lineHeight: "16px",
                          color: grey[600],
                        }}
                      >
                        선택한 MCN 소속의 유튜버만 검색됩니다.
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
                        const focused = mcns.includes(value);
                        const onClick = () => {
                          let newMcns = _.cloneDeep(mcns);
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
                          setMcns(newMcns);
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
              <Button>선택한 채널 광고 제안하기</Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: theme.spacing(2, 0),
              }}
            >
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
          </Box>
        </Box>
      </Box>
    </Container>
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
    <Box ref={ref} sx={{ position: "relative" }}>
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
