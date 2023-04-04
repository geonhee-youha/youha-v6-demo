import _ from "lodash";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
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
  useState,
} from "react";
import Button from "../../components/atoms/Button";
import {
  youtuberFilterValueDefaultProps,
  youtuberSortList,
  tabList,
  videoSortList,
  FilterValueProps,
  videoFilterValueDefaultProps,
} from "../../constants";
import YoutuberItem from "../../components/molecules/YoutuberItem";
import { testCreators, testVideos } from "../../data";
import Pagenations from "../../components/molecules/Pagenations";
import SortItem from "../../components/molecules/SortItem";
import Checkbox from "../../components/atoms/Checkbox";
import Input from "../../components/atoms/Input";
import YoutuberFilters from "../../components/organisms/YoutuberFilters";
import FilterDrawer from "../../components/organisms/FilterDrawer";
import CategoryBar from "../../components/organisms/CategoryBar";
import VideoItem from "../../components/molecules/VideoItem";
import youhaGrey from "../../constants/youhaGrey";
import VideoFilters from "../../components/organisms/VideoFilters";

function equals(a: string[], b: string[]) {
  if (a.length === b.length && a.every((v, i) => v === b[i])) return true;
}

export default function Page() {
  const router = useRouter();
  const {
    type: typeOrigin,
    categories: categoryOrigin,
    search: inputValueOrigin,
    forceCategory,
  } = router.query;
  const query = {
    type:
      typeOrigin && typeof typeOrigin === "string" && typeOrigin !== "undefined"
        ? typeOrigin
        : "youtuber",
    search: typeof inputValueOrigin === "string" ? inputValueOrigin : "",
    categories:
      typeof categoryOrigin === "string" ? categoryOrigin.split(",") : [],
  };
  const [youtuberCategoriesValue, setYoutuberCategoriesValue] = useState<
    string[]
  >([]);
  const [youtuberCategoriesTempValue, setYoutuberCategoriesTempValue] =
    useState<string[]>([]);
  const [videoCategoriesValue, setVideoCategoriesValue] = useState<string[]>(
    []
  );
  const [videoCategoriesTempValue, setVideoCategoriesTempValue] = useState<
    string[]
  >([]);
  const [shortsCategoriesValue, setShortsCategoriesValue] = useState<string[]>(
    []
  );
  const [shortsCategoriesTempValue, setShortsCategoriesTempValue] = useState<
    string[]
  >([]);
  const type = query.type;
  const categoriesValue =
    type === "youtuber"
      ? youtuberCategoriesValue
      : type === "video"
      ? videoCategoriesValue
      : shortsCategoriesValue;
  const categoriesTempValue =
    type === "youtuber"
      ? youtuberCategoriesTempValue
      : type === "video"
      ? videoCategoriesTempValue
      : shortsCategoriesTempValue;
  const setCategoriesValue =
    type === "youtuber"
      ? setYoutuberCategoriesValue
      : type === "video"
      ? setVideoCategoriesValue
      : setShortsCategoriesValue;
  const setCategoriesTempValue =
    type === "youtuber"
      ? setYoutuberCategoriesTempValue
      : type === "video"
      ? setVideoCategoriesTempValue
      : setShortsCategoriesTempValue;
  console.log(forceCategory);

  useEffect(() => {
    if (typeof forceCategory === "string" && forceCategory !== "") {
      setCategoriesValue([forceCategory]);
      router.replace(
        `/search?${`type=${query.type}&`}categories=${forceCategory}
      )}`
      );
    }
  }, [forceCategory]);
  return (
    <>
      <Container>
        <Box
          sx={{
            p: theme.spacing(2, 0, 10, 0),
            "@media(max-width: 480px)": {
              p: theme.spacing(0, 0, 10, 0),
              m: theme.spacing(0, -2, 0, -2),
            },
          }}
        >
          <Header
            query={query}
            youtuberCategoriesValue={youtuberCategoriesValue}
            videoCategoriesValue={videoCategoriesValue}
            shortsCategoriesValue={shortsCategoriesValue}
          />
          <Main
            query={query}
            categoriesValue={categoriesValue}
            categoriesTempValue={categoriesTempValue}
            setCategoriesValue={setCategoriesValue}
            setCategoriesTempValue={setCategoriesTempValue}
          />
        </Box>
      </Container>
    </>
  );
}

function Header({
  query,
  youtuberCategoriesValue,
  videoCategoriesValue,
  shortsCategoriesValue,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  youtuberCategoriesValue: string[];
  videoCategoriesValue: string[];
  shortsCategoriesValue: string[];
}) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const onClickSearch = () => {
    if (inputValue === "") return;
    router.push(`/search?value=${inputValue}`);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  useEffect(() => {
    setInputValue(query.search);
  }, [query]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: theme.spacing(2, 0),
        "@media(max-width: 480px)": {
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          p: theme.spacing(2, 2),
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
            fontSize: 22,
            lineHeight: "38px",
            fontWeight: 700,
            "@media(max-width: 480px)": {
              width: "auto",
              fontSize: 16,
              lineHeight: "24px",
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
            m: theme.spacing(0, 1.5, 0, 1.5),
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
            const focused = query.type === value;
            const onClick = () => {
              const categoriesValue =
                value === "youtuber"
                  ? youtuberCategoriesValue
                  : value === "video"
                  ? videoCategoriesValue
                  : shortsCategoriesValue;
              router.push(
                `/search?${`type=${value}&`}categories=${categoriesValue.map(
                  (el, index) => {
                    return el;
                  }
                )}`
              );
            };
            return (
              <ButtonBase
                key={index}
                sx={{
                  m: theme.spacing(0, 2, 0, 0),
                  "&:hover *": {
                    color: youhaGrey[700],
                  },
                  "@media(max-width: 480px)": {
                    m: theme.spacing(0, 1.5, 0, 0),
                  },
                }}
                disableRipple
                onClick={onClick}
              >
                <Typography
                  sx={{
                    fontSize: 22,
                    lineHeight: "38px",
                    fontWeight: 700,
                    color: focused ? youhaGrey[900] : youhaGrey[300],
                    "@media(max-width: 480px)": {
                      fontSize: 16,
                      lineHeight: "24px",
                    },
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
          "@media(max-width: 480px)": {
            display: "none",
          },
        }}
      >
        <Input
          inputValue={inputValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onClickSearch={onClickSearch}
          sx={{
            width: 200,
          }}
          searchIcon
        />
      </Box>
    </Box>
  );
}

function Main({
  query,
  categoriesValue,
  categoriesTempValue,
  setCategoriesValue,
  setCategoriesTempValue,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  categoriesValue: string[];
  categoriesTempValue: string[];
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
}) {
  const router = useRouter();
  const onChangeCategories = (value: string) => {
    const focused = categoriesValue.includes(value);
    const newValue = focused
      ? categoriesValue.filter((el) => el !== value)
      : [...categoriesValue, value];
    router.push(
      `/search?${
        query.type === undefined ? "type=youtuber&" : `type=${query.type}&`
      }categories=${newValue.map((el, index) => {
        return el;
      })}`
    );
    setCategoriesValue(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <CategoryBar value={categoriesValue} onChange={onChangeCategories} />
      <Contents
        query={query}
        categoriesValue={categoriesValue}
        setCategoriesValue={setCategoriesValue}
        categoriesTempValue={categoriesTempValue}
        setCategoriesTempValue={setCategoriesTempValue}
      />
    </Box>
  );
}

function Contents({
  query,
  categoriesValue,
  categoriesTempValue,
  setCategoriesValue,
  setCategoriesTempValue,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  categoriesValue: string[];
  categoriesTempValue: string[];
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
}) {
  const { type } = query;
  const [youtuberFilterValue, setYoutuberFilterValue] =
    useState<FilterValueProps>(youtuberFilterValueDefaultProps);
  const [youtuberFilterTempValue, setYoutuberFilterTempValue] =
    useState<FilterValueProps>(youtuberFilterValueDefaultProps);
  const [videoFilterValue, setVideoFilterValue] = useState<FilterValueProps>(
    videoFilterValueDefaultProps
  );
  const [videoFilterTempValue, setVideoFilterTempValue] =
    useState<FilterValueProps>(videoFilterValueDefaultProps);
  const [shortsFilterValue, setShortsFilterValue] = useState<FilterValueProps>(
    videoFilterValueDefaultProps
  );
  const [shortsFilterTempValue, setShortsFilterTempValue] =
    useState<FilterValueProps>(videoFilterValueDefaultProps);
  const [youtuberSortValue, setYoutuberSortValue] = useState<string>(
    youtuberSortList[0].value
  );
  const [videoSortValue, setVideoSortValue] = useState<string>(
    videoSortList[0].value
  );
  const [shortsSortValue, setShortsSortValue] = useState<string>(
    videoSortList[0].value
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const creatorListOrigin = [
    ...testCreators,
    ...testCreators,
    ...testCreators,
    ...testCreators,
    ...testCreators,
    ...testCreators,
    ...testCreators.slice(0, 3),
  ];
  const per = type === "youtuber" ? 10 : type === "video" ? 9 : 8;
  const youtuberIds = creatorListOrigin.flatMap((el) => el.id);
  const videoList = testVideos.slice(page * 9, (page + 1) * 9);
  const shortsList = testVideos.slice(page * 8, (page + 1) * 8);
  const creatorList = creatorListOrigin.slice(page * 10, (page + 1) * 10);
  const list =
    type === "youtuber"
      ? creatorList
      : type === "video"
      ? videoList
      : shortsList;
  const sortList =
    type === "youtuber"
      ? youtuberSortList
      : type === "video"
      ? videoSortList
      : videoSortList;
  const sortValue =
    type === "youtuber"
      ? youtuberSortValue
      : type === "video"
      ? videoSortValue
      : shortsSortValue;
  const setSortValue =
    type === "youtuber"
      ? setYoutuberSortValue
      : type === "video"
      ? setVideoSortValue
      : setShortsSortValue;
  const filterValue =
    type === "youtuber"
      ? youtuberFilterValue
      : type === "video"
      ? videoFilterValue
      : shortsFilterValue;
  const filterTempValue =
    type === "youtuber"
      ? youtuberFilterTempValue
      : type === "video"
      ? videoFilterTempValue
      : shortsFilterTempValue;
  const setFilterValue =
    type === "youtuber"
      ? setYoutuberFilterValue
      : type === "video"
      ? setVideoFilterValue
      : setShortsFilterValue;
  const setFilterTempValue =
    type === "youtuber"
      ? setYoutuberFilterTempValue
      : type === "video"
      ? setVideoFilterTempValue
      : setShortsFilterTempValue;
  return (
    <Box
      sx={{
        flex: 1,
        width: 1200 - 240,
        "@media(max-width: 480px)": {
          width: "auto",
        },
      }}
    >
      <FilterBar
        query={query}
        categoriesValue={categoriesValue}
        categoriesTempValue={categoriesTempValue}
        setCategoriesValue={setCategoriesValue}
        setCategoriesTempValue={setCategoriesTempValue}
        filterValue={filterValue}
        filterTempValue={filterTempValue}
        setFilterValue={setFilterValue}
        setFilterTempValue={setFilterTempValue}
      />
      <SortBar
        query={query}
        listIds={youtuberIds}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        sortList={sortList}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <List
        query={query}
        list={list}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      <Pagenations
        per={per}
        page={page}
        list={creatorListOrigin}
        setPage={setPage}
      />
    </Box>
  );
}

function FilterBar({
  query,
  categoriesValue,
  categoriesTempValue,
  setCategoriesValue,
  setCategoriesTempValue,
  filterValue,
  filterTempValue,
  setFilterValue,
  setFilterTempValue,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  categoriesValue: string[];
  categoriesTempValue: string[];
  setCategoriesValue: Dispatch<SetStateAction<string[]>>;
  setCategoriesTempValue: Dispatch<SetStateAction<string[]>>;
  filterValue: FilterValueProps | FilterValueProps;
  filterTempValue: FilterValueProps | FilterValueProps;
  setFilterValue: any;
  setFilterTempValue: any;
}) {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const onClickReset = () => {
    setFilterValue(youtuberFilterValueDefaultProps);
    setFilterTempValue(youtuberFilterValueDefaultProps);
  };
  const onClickFilter = () => {
    setFilterDrawerOpen(true);
    setFilterTempValue(filterValue);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          p: theme.spacing(2, 0),
          "@media(max-width: 480px)": {
            p: theme.spacing(0, 2, 2, 2),
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
            {query.type === "youtuber" ? (
              <YoutuberFilters
                categoriesValue={categoriesValue}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                setFilterTempValue={setFilterTempValue}
                setCategoriesValue={setCategoriesValue}
                setCategoriesTempValue={setCategoriesTempValue}
              />
            ) : query.type === "video" ? (
              <VideoFilters
                categoriesValue={categoriesValue}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                setFilterTempValue={setFilterTempValue}
                setCategoriesValue={setCategoriesValue}
                setCategoriesTempValue={setCategoriesTempValue}
              />
            ) : (
              <VideoFilters
                categoriesValue={categoriesValue}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                setFilterTempValue={setFilterTempValue}
                setCategoriesValue={setCategoriesValue}
                setCategoriesTempValue={setCategoriesTempValue}
                shorts
              />
            )}
            <ButtonBase
              sx={{
                p: theme.spacing(0, 1),
                borderRadius: "50%",
                "&:hover": {
                  opacity: 0.7,
                },
                transition: "none !important",
              }}
              disableRipple
              onClick={onClickReset}
            >
              <Icon name="trash-alt" size={20} color={youhaGrey[500]} />
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: 500,
                  color: youhaGrey[500],
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
              boxShadow: `${youhaBlue[500]} 0px 0px 0px 1px`,
              borderRadius: 0.5,
              height: 32,
              p: theme.spacing(0, 1.5),
              m: theme.spacing(0, 1, 0, 0),
              transition: "none",
              "&:hover": {
                boxShadow: `${youhaBlue[700]} 0px 0px 0px 1px`,
              },
              display: "none",
              "@media(max-width: 480px)": {
                display: "flex",
              },
            }}
            onClick={onClickFilter}
          >
            <Icon
              name="sliders"
              prefix="fas"
              size={16}
              color={youhaBlue[500]}
              sx={{
                m: theme.spacing(0, 0.5, 0, -0.5),
                "@media(max-width: 480px)": {
                  fontSize: `6px !important`,
                },
              }}
            />
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaBlue[500],
                fontWeight: "700",
                "@media(max-width: 480px)": {
                  fontSize: 12,
                  lineHeight: "15px",
                },
              }}
            >
              필터
            </Typography>
          </ButtonBase>
        </Box>
        {query.type === "youtuber" && (
          <>
            <Button
              size="md"
              sx={{
                display: "flex",
                "@media(max-width: 480px)": {
                  display: "none",
                },
              }}
            >
              선택한{" "}
              {query.type === "youtuber"
                ? "채널"
                : query.type === "video"
                ? "동영상"
                : "쇼츠"}{" "}
              북마크하기
            </Button>
            <Button
              size="sm"
              sx={{
                display: "none",
                "@media(max-width: 480px)": {
                  display: "flex",
                },
              }}
            >
              선택한{" "}
              {query.type === "youtuber"
                ? "채널"
                : query.type === "video"
                ? "동영상"
                : "쇼츠"}{" "}
              북마크하기
            </Button>
          </>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 8,
          backgroundColor: youhaGrey[100],
          display: "none",
          "@media(max-width: 480px)": {
            display: "block",
          },
        }}
      />
      <FilterDrawer
        query={query}
        open={filterDrawerOpen}
        setOpen={setFilterDrawerOpen}
        filterTempValue={filterTempValue}
        categoriesTempValue={categoriesTempValue}
        setFilterValue={setFilterValue}
        setFilterTempValue={setFilterTempValue}
        setCategoriesValue={setCategoriesValue}
        setCategoriesTempValue={setCategoriesTempValue}
      />
    </>
  );
}

function SortBar({
  query,
  listIds,
  selectedIds,
  setSelectedIds,
  sortList,
  sortValue,
  setSortValue,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  listIds: string[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  sortList: { title: string; value: string }[];
  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
}) {
  const selected = equals(listIds.sort(), selectedIds.sort());
  const onClickSelect = () => {
    setSelectedIds(selected ? [] : listIds);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: theme.spacing(2, 0),
        "@media(max-width: 480px)": {
          p: theme.spacing(1, 2),
          borderBottom: `1px solid ${grey[300]}`,
        },
      }}
    >
      {query.type === "youtuber" && (
        <>
          <Checkbox
            focused={selected}
            onClick={onClickSelect}
            sx={{
              display: "none",
              "@media(max-width: 480px)": {
                display: "flex",
              },
            }}
            size="sm"
          />
          <Checkbox
            focused={selected}
            onClick={onClickSelect}
            sx={{
              display: "flex",
              "@media(max-width: 480px)": {
                display: "none",
              },
            }}
          />
        </>
      )}
      <Typography
        sx={{
          flex: 1,
          fontSize: 14,
          lineHeight: "20px",
          "@media(max-width: 480px)": {
            fontSize: `12px`,
            lineHeight: "16px",
          },
        }}
      >
        총 {listIds.length}개의 결과
      </Typography>
      <SortItem
        sortList={sortList}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </Box>
  );
}

function List({
  query,
  list,
  selectedIds,
  setSelectedIds,
}: {
  query: {
    type: string;
    search: string;
    categories: string[];
  };
  list: any[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}) {
  const { type } = query;
  return (
    <Box
      sx={{
        "&:not(.youtuber)": {
          display: "grid",
          gridTemplateColumns: type === "shorts" ? "1fr 1fr" : "1fr 1fr 1fr",
          gridAutoRows: "1fr",
          gridTemplateRows: "auto auto",
          gridRowGap: 16,
          gridColumnGap: 16,
        },
        "&.youtuber > *:not(:last-child)": {
          m: theme.spacing(0, 0, 2, 0),
        },
        "@media(max-width: 480px)": {
          "&:not(.youtuber)": {
            display: "block",
            gridTemplateColumns: "1fr",
            gridAutoRows: "1fr",
            gridTemplateRows: "auto auto",
            gridRowGap: 0,
            gridColumnGap: 0,
          },
          "& > *": {
            m: `0 !important`,
          },
        },
      }}
      className={type}
    >
      {list.map((item, index) => {
        return type === "youtuber" ? (
          <YoutuberItem
            key={index}
            index={index}
            item={item}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ) : type === "video" ? (
          <VideoItem
            key={index}
            index={index}
            item={item}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ) : (
          <VideoItem
            key={index}
            index={index}
            item={item}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            shorts
          />
        );
      })}
    </Box>
  );
}
