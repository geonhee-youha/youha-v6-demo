import _ from "lodash";
import {
  alpha,
  Box,
  ButtonBase,
  Chip,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import { theme } from "../../themes/theme";
import { categories } from "../../constants/categories";
import { grey } from "@mui/material/colors";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../../components/atoms/Button";

const tabs = [
  { title: "유튜버", value: "youtuber" },
  { title: "동영상", value: "video" },
  { title: "쇼츠", value: "shorts" },
];

const sorts = [
  { title: "구독자 순", value: "subscribers" },
  { title: "예상 광고단가 순", value: "price" },
  { title: "평균 조회수 순", value: "views" },
];

const subscribersGenders = [
  { title: "남성", value: "male" },
  { title: "여성", value: "female" },
];

const subscribersAges = [
  { title: "10대", value: "10" },
  { title: "20~30대", value: "20" },
  { title: "40~50대", value: "40" },
  { title: "60대 이상", value: "60" },
];

export default function Page() {
  const router = useRouter();
  const { type, categories: categoryOrigin } = router.query;
  const queryCategories =
    typeof categoryOrigin === "string" ? categoryOrigin.split(",") : [];
  const [value, setValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const onSearchClick = () => {
    if (value === "") return;
    router.push(`/search?value=${value}`);
  };
  const [channelFilterOpen, setChannelFilterOpen] = useState<boolean>(false);
  const [targetFilterOpen, setTargetFilterOpen] = useState<boolean>(false);
  const [contentsFilterOpen, setContentsFilterOpen] = useState<boolean>(false);
  const [etcFilterOpen, setEtcFilterOpen] = useState<boolean>(false);
  const [subscribersMinValue, setSubscribersMinValue] = useState<string>("");
  const onSubscribersMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSubscribersMinValue(value);
  };
  const [subscribersMaxValue, setSubscribersMaxValue] = useState<string>("");
  const onSubscribersMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSubscribersMaxValue(value);
  };
  const onClickSubscribersReset = () => {
    setSubscribersMinValue("");
    setSubscribersMaxValue("");
  };
  const [priceMinValue, setPriceMinValue] = useState<string>("");
  const onPriceMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPriceMinValue(value);
  };
  const [priceMaxValue, setPriceMaxValue] = useState<string>("");
  const onPriceMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPriceMaxValue(value);
  };
  const onClickPriceReset = () => {
    setPriceMinValue("");
    setPriceMaxValue("");
  };
  const channelFilterFocused =
    (subscribersMinValue !== "" && subscribersMaxValue !== "") ||
    (priceMinValue !== "" && priceMaxValue !== "");
  const [subscribersGender, setSubscribersGender] = useState<string>("");
  const onClickSubscribersGenderReset = () => {
    setSubscribersGender("");
  };
  const [subscribersAge, setSubscribersAge] = useState<string>("");
  const onClickSubscribersAgeReset = () => {
    setSubscribersAge("");
  };
  const targetFilterFocused =
    subscribersGender !== "" || subscribersAge !== "";

  const [sort, setSort] = useState<string>("subscribers");
  useEffect(() => {
    if (channelFilterOpen) {
      setTargetFilterOpen(false);
      setContentsFilterOpen(false);
      setEtcFilterOpen(false);
    }
    if (targetFilterOpen) {
      setChannelFilterOpen(false);
      setContentsFilterOpen(false);
      setEtcFilterOpen(false);
    }
    if (contentsFilterOpen) {
      setChannelFilterOpen(false);
      setTargetFilterOpen(false);
      setEtcFilterOpen(false);
    }
    if (etcFilterOpen) {
      setChannelFilterOpen(false);
      setTargetFilterOpen(false);
      setContentsFilterOpen(false);
    }
  }, [channelFilterOpen, targetFilterOpen, contentsFilterOpen, etcFilterOpen]);
  return (
    <Container>
      <Box
        sx={{
          p: theme.spacing(2, 0),
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
            {tabs.map((item, index) => {
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
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                카테고리
              </Typography>
            </Box>
            {categories.map((item, index) => {
              const router = useRouter();
              const { emoji, title, value } = item;
              const focused = queryCategories.includes(value);
              const onClick = () => {
                const newQueryCategories = focused
                  ? queryCategories.filter((el) => el !== value)
                  : [...queryCategories, value];
                console.log(newQueryCategories);

                router.push(
                  `/search?${
                    type !== undefined ? "type=youtuber&" : `type=${type}&`
                  }categories=${newQueryCategories.map((el, index) => {
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
                      border: `1px solid ${
                        focused ? youhaBlue[500] : grey[300]
                      }`,
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
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            구독자수
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickSubscribersReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          채널의 구독자 수입니다.
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          p: theme.spacing(2, 0),
                        }}
                      >
                        <InputBase
                          value={subscribersMinValue}
                          onChange={onSubscribersMinChange}
                          placeholder="최소"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                        <InputBase
                          value={subscribersMaxValue}
                          onChange={onSubscribersMaxChange}
                          placeholder="최대"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            예상 광고단가
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickPriceReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          채널의 예상 광고단가입니다.
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          p: theme.spacing(1, 0),
                        }}
                      >
                        <InputBase
                          value={priceMinValue}
                          onChange={onPriceMinChange}
                          placeholder="최소"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                        <InputBase
                          value={priceMaxValue}
                          onChange={onPriceMaxChange}
                          placeholder="최대"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                      </Stack>
                    </Box>
                  </Stack>
                </FilterItem>
                <FilterItem
                  title="시청자 필터"
                  focused={targetFilterFocused}
                  open={targetFilterOpen}
                  setOpen={setTargetFilterOpen}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            시청자 성별
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickSubscribersGenderReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          주 시청 성별을 선택하세요.
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          p: theme.spacing(2, 0, 1, 0),
                        }}
                      >
                        {subscribersGenders.map((item, index) => {
                          const { title, value } = item;
                          const focused = subscribersGender === value;
                          const onClick = () => {
                            setSubscribersGender(focused ? "" : value);
                          };
                          return (
                            <ButtonBase
                              key={index}
                              sx={{
                                p: theme.spacing(1, 2),
                                backgroundColor: focused
                                  ? youhaBlue[50]
                                  : grey[100],
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
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            시청자 연령대
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickSubscribersAgeReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          주 시청 연령대를 선택하세요.
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          p: theme.spacing(2, 0, 1, 0),
                        }}
                      >
                        {subscribersAges.map((item, index) => {
                          const { title, value } = item;
                          const focused = subscribersGender === value;
                          const onClick = () => {
                            setSubscribersGender(focused ? "" : value);
                          };
                          return (
                            <ButtonBase
                            key={index}
                              sx={{
                                p: theme.spacing(1, 2),
                                backgroundColor: focused
                                  ? youhaBlue[50]
                                  : grey[100],
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
                  </Stack>
                </FilterItem>
                <FilterItem
                  title="콘텐츠 필터"
                  open={contentsFilterOpen}
                  setOpen={setContentsFilterOpen}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            평균 조회수
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickSubscribersReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          채널 내 광고영상의 평균 조회수입니다.
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          p: theme.spacing(2, 0),
                        }}
                      >
                        <InputBase
                          value={subscribersMinValue}
                          onChange={onSubscribersMinChange}
                          placeholder="최소"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                        <InputBase
                          value={subscribersMaxValue}
                          onChange={onSubscribersMaxChange}
                          placeholder="최대"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            예상 광고단가
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickPriceReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          채널의 예상 광고단가입니다.
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          p: theme.spacing(1, 0),
                        }}
                      >
                        <InputBase
                          value={priceMinValue}
                          onChange={onPriceMinChange}
                          placeholder="최소"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                        <InputBase
                          value={priceMaxValue}
                          onChange={onPriceMaxChange}
                          placeholder="최대"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                      </Stack>
                    </Box>
                  </Stack>
                </FilterItem>
                <FilterItem
                  title="기타"
                  open={etcFilterOpen}
                  setOpen={setEtcFilterOpen}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            구독자수
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickSubscribersReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          채널의 구독자 수입니다.
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          p: theme.spacing(2, 0),
                        }}
                      >
                        <InputBase
                          value={subscribersMinValue}
                          onChange={onSubscribersMinChange}
                          placeholder="최소"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                        <InputBase
                          value={subscribersMaxValue}
                          onChange={onSubscribersMaxChange}
                          placeholder="최대"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        p: theme.spacing(0),
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                          }}
                        >
                          <Typography
                            sx={{
                              flex: 1,
                              fontSize: 20,
                              lineHeight: "32px",
                              fontWeight: "700",
                            }}
                          >
                            예상 광고단가
                          </Typography>
                          <IconButton
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              "&:hover": {
                                "& svg": {
                                  opacity: 0.4,
                                },
                              },
                            }}
                            disableRipple
                            onClick={onClickPriceReset}
                          >
                            <Icon name="undo" size={20} color={grey[600]} />
                          </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            lineHeight: "20px",
                            color: grey[600],
                          }}
                        >
                          채널의 예상 광고단가입니다.
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{
                          p: theme.spacing(1, 0),
                        }}
                      >
                        <InputBase
                          value={priceMinValue}
                          onChange={onPriceMinChange}
                          placeholder="최소"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                        <InputBase
                          value={priceMaxValue}
                          onChange={onPriceMaxChange}
                          placeholder="최대"
                          sx={{
                            flex: 1,
                            height: 40,
                            borderRadius: 1,
                            p: theme.spacing(0, 2, 0, 2),
                            backgroundColor: grey[100],
                            transition: `all 0.35s ease`,
                            "&:hover": {
                              boxShadow: `${grey[300]} 0px 0px 0px 1px inset`,
                            },
                            "&.Mui-focused": {
                              boxShadow: `${grey[300]} 0px 0px 0px 0px inset`,
                              backgroundColor: grey[200],
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
                      </Stack>
                    </Box>
                  </Stack>
                </FilterItem>
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
          {sorts[_.findIndex(sorts, (el) => el.value === sort)].title}
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
        {sorts.map((item, index) => {
          const { title, value } = item;
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
  function Panel({
    open,
    children,
  }: {
    open: boolean;
    children?: React.ReactNode;
  }) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 64,
          left: 0,
          width: 416,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          overflow: "auto",
          p: theme.spacing(2),
          border: `1px solid ${grey[300]}`,
          borderRadius: 0.5,
          backgroundColor: "#ffffff",
        }}
      >
        {children}
      </Box>
    );
  }
  return (
    <Box ref={ref}>
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
      <Panel open={open}>{children}</Panel>
    </Box>
  );
}
