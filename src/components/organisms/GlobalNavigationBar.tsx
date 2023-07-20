import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { cyan, pink } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { categoryList } from "../../constants";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import Toolbar from "../atoms/Toolbar";
import { useRecoilState } from "recoil";
import { loginRecoilState } from "../../constants/recoils";
import { IconName } from "@fortawesome/fontawesome-svg-core";

const headers = [
  { href: "/auth/signin", title: "로그인", type: "default" },
  { href: "/auth/signup", title: "회원가입", type: "default" },
];

const navs = [
  { href: "/ranking", title: "유하 랭킹", type: "hot" },
  { href: "/insight", title: "인사이트", type: "default" },
  { href: "/mcn", title: "MCN 찾기", type: "default" },
];

const languages = [{ title: "KOR" }, { title: "ENG" }];

export default function GlobalNavigationBar() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const focused = `/${pathnames[1]}` !== "/auth";
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        display: focused ? "flex" : "none",
        zIndex: 9999,
        borderBottom: `1px solid ${youhaGrey[200]}`,
      }}
    >
      <Container>
        <Header />
        <Nav />
      </Container>
    </Box>
  );
}

function Header() {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const { type } = router.query;
  const [inputValue, setInputValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };
  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };
  const onSearchClick = () => {
    router.push(`/search?type=${type}&search=${inputValue}`);
    setInputValue("");
  };
  function HeaderBtn({
    item,
  }: {
    item: { type: string; href: string; title: string };
  }) {
    const { href, title } = item;
    const hrefUrl = `${href}?url=${router.pathname}`;
    return (
      <Link href={hrefUrl} passHref>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            m: theme.spacing(0, 0, 0, 2),
            cursor: "pointer",
            "&:hover": {
              opacity: 0.7,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
              color: youhaGrey[700],
            }}
          >
            {title}
          </Typography>
        </Box>
      </Link>
    );
  }
  return (
    <Toolbar>
      <Box
        sx={{
          m: theme.spacing(0, 3, 0, 0),
          "& img": {
            width: "auto",
            height: 24,
            cursor: "pointer",
          },
        }}
      >
        <Link href="/" passHref>
          <img src="/logos/logo.png" />
        </Link>
      </Box>
      <Box
        sx={{
          position: "relative",
          m: theme.spacing(0, "auto", 0, 0),
          "@media(max-width: 480px)": {
            flex: 1,
            m: theme.spacing(0),
          },
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            zIndex: 2,
          }}
          onClick={onSearchClick}
        >
          <Icon name="search" size={20} color={youhaGrey[500]}/>
        </IconButton>
        <InputBase
          value={inputValue}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={`어떤 ${
            type === "video"
              ? "동영상이"
              : type === "shorts"
              ? "쇼츠가"
              : "유튜버가"
          } 궁금하세요?`}
          sx={{
            width: 360,
            height: 40,
            p: theme.spacing(0, 2, 0, 6),
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            backgroundColor: youhaGrey[50],
            // transition: `all 0.35s ease`,
            "&:hover": {
              boxShadow: `${youhaGrey[300]} 0px 0px 0px 1px inset`,
            },
            "&.Mui-focused": {
              boxShadow: `${youhaBlue[500]} 0px 0px 0px 1px inset !important`,
              backgroundColor: "#ffffff",
              "& input": {
                fontSize: 14,
                "&::placeholder": {
                  color: youhaGrey[500],
                },
              },
            },
            "& input": {
              fontSize: 14,
              "&::placeholder": {
                fontWeight: 400,
                color: youhaGrey[500],
                opacity: 1,
              },
            },
            "@media(max-width: 480px)": {
              width: "100%",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          "@media(max-width: 480px)": {
            display: "none",
          },
        }}
      >
        {login ? (
          <>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 500,
                color: youhaGrey[700],
                m: theme.spacing(0, 2, 0, 0),
              }}
            >
              유진호 님 안녕하세요!
            </Typography>
            <User />
          </>
        ) : (
          <>
            {headers.map((item, index) => (
              <HeaderBtn key={index} item={item} />
            ))}
            <Languages />
          </>
        )}
      </Box>
    </Toolbar>
  );
}

function Nav() {
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
  const onClick = () => {
    setCategoriesOpen((prev) => !prev);
  };
  const onMouseOver = () => {
    setCategoriesOpen(true);
  };
  const onMouseOut = () => {
    setCategoriesOpen(false);
  };
  function NavBtn({
    item,
  }: {
    item: { type: string; href: string; title: string };
  }) {
    const { type, href, title } = item;
    const router = useRouter();
    const pathnames = router.pathname.split("/");
    const focused = `/${pathnames[1]}` === href;
    return (
      <>
        {title === "MCN 찾기" && (
          <Box
            sx={{
              width: `1px`,
              height: `12px`,
              backgroundColor: youhaGrey[200],
              m: theme.spacing(0, 3, 0, 0),
            }}
          />
        )}
        <Link href={href} passHref>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              m: theme.spacing(0, 3, 0, 0),
              cursor: "pointer",
              "&:hover": {
                "& > svg": {
                  color: youhaBlue[500],
                },
                "& > .MuiTypography-root": {
                  color: youhaBlue[500],
                },
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: focused ? youhaBlue[500] : youhaGrey[900],
              }}
            >
              {title}
            </Typography>
            {type === "hot" && (
              <Box
                sx={{
                  m: theme.spacing(0, 0, 1, 0.25),
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: "14px",
                    fontWeight: 700,
                    color: `${pink[500]} !important`,
                  }}
                >
                  HOT
                </Typography>
              </Box>
            )}
            {type === "new" && (
              <Box
                sx={{
                  m: theme.spacing(0, 0, 1, 0.25),
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    lineHeight: "14px",
                    fontWeight: 700,
                    color: `${cyan[500]} !important`,
                  }}
                >
                  NEW
                </Typography>
              </Box>
            )}
          </Box>
        </Link>
      </>
    );
  }
  return (
    <Box
      sx={{
        position: "relative",
        height: 48,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        "@media(max-width: 480px)": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: "100%",
          m: theme.spacing(0, 3, 0, 0),
          cursor: "pointer",
        }}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <Box
          sx={{
            position: "relative",
            width: 20,
            height: 20,
            m: theme.spacing(0, 1, 0, 0),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              transition: `all 0.35s ease`,
              top: 0,
              left: 0,
              transform: categoriesOpen ? `translateY(-100%)` : `none`,
            }}
          >
            <Icon
              name="bars"
              prefix="fas"
              size={20}
              sx={{
                color: categoriesOpen ? youhaBlue[500] : youhaGrey[900],
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              transition: `all 0.35s ease`,
              top: "100%",
              left: 0,
              transform: categoriesOpen ? `translateY(-100%)` : `none`,
            }}
          >
            <Icon
              name="angle-up"
              prefix="fas"
              size={20}
              sx={{
                color: categoriesOpen ? youhaBlue[500] : youhaGrey[900],
              }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            color: categoriesOpen ? youhaBlue[500] : youhaGrey[900],
          }}
        >
          전체 카테고리
        </Typography>
        <Categories open={categoriesOpen} setOpen={setCategoriesOpen} />
      </Box>
      {navs.map((item, index) => (
        <NavBtn key={index} item={item} />
      ))}
    </Box>
  );
}

function Categories({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { type } = router.query;
  return (
    <Box
      sx={{
        position: "absolute",
        top: 48,
        left: -16,
        width: 240,
        display: open ? "flex" : "none",
        boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
        maxHeight: `calc(100vh - 64px - 48px - 24px)`,
        flexDirection: "column",
        overflow: "auto",
        p: theme.spacing(1, 0),
        backgroundColor: "#ffffff",
        border: `1px solid ${youhaGrey[200]}`,
        borderRadius: 0.5,
      }}
      className="categories"
    >
      {categoryList.map((item, index) => {
        const { emoji, title, value } = item;
        const onClick = () => {
          setOpen(false);
          router.push(`/search?type=${type}&forceCategory=${value}`);
        };
        return value === "" ? null : (
          <ButtonBase
            key={index}
            sx={{
              width: "100%",
              p: theme.spacing(1, 2),
              "&:hover": {
                backgroundColor: alpha(youhaBlue[500], 0.08),
              },
            }}
            onClick={onClick}
          >
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
                  color: youhaGrey[900],
                }}
              >
                {emoji}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[900],
              }}
            >
              {title}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}

function Languages() {
  const ref = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
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
    <Box
      ref={ref}
      sx={{
        position: "relative",
        height: "100%",
        m: theme.spacing(0, 0, 0, 3),
      }}
    >
      <IconButton
        sx={{
          width: 24,
          height: "100%",
          borderRadius: "50%",
          "&:hover": {
            "& svg": {
              opacity: 0.7,
            },
          },
        }}
        disableRipple
        onClick={onClick}
      >
        <Icon prefix="fal" name="globe" size={20} color={youhaGrey[700]} />
      </IconButton>
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          top: 48,
          right: -18,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          p: theme.spacing(1, 0),
          zIndex: 9,
          backgroundColor: "#ffffff",
          border: `1px solid ${youhaGrey[200]}`,
          borderRadius: 0.5,
        }}
        className="languages"
      >
        {languages.map((item, index) => {
          const { title } = item;
          const onClick = () => {
            setOpen(false);
          };
          return (
            <ButtonBase
              key={index}
              sx={{
                width: "100%",
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
                  color: youhaGrey[900],
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

const mypagePages: {
  iconName: IconName;
  title: string;
  href: string;
  counts: number;
}[] = [
  { iconName: "user-circle", title: "내 정보", href: "", counts: 0 },
  { iconName: "bookmark", title: "즐겨찾기", href: "", counts: 0 },
  { iconName: "list-dropdown", title: "제안함", href: "", counts: 3 },
];

function User() {
  const ref = useRef<any>(null);
  const [login, setLogin] = useRecoilState(loginRecoilState);
  const [open, setOpen] = useState<boolean>(false);
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
  function Btn({
    item: { iconName, title, href, counts },
  }: {
    item: {
      iconName: IconName;
      title: string;
      href: string;
      counts: number;
    };
  }) {
    return (
      <ButtonBase
        sx={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          p: theme.spacing(0, 2),
          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        <Icon
          prefix="fad"
          name={iconName}
          color={youhaGrey[300]}
          badgeCount={counts}
          size={28}
        />
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 700,
            color: youhaGrey[500],
            m: theme.spacing(0.5, 0, 0, 0),
          }}
        >
          {title}
        </Typography>
      </ButtonBase>
    );
  }
  const onClickLogout = () => {
    setLogin(false);
  };
  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
      }}
    >
      <ButtonBase
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          overflow: "hidden",
          "&:hover": {
            opacity: 0.7,
          },
        }}
        onClick={onClick}
      >
        <img src={"/images/user-advertiser.png"} />
      </ButtonBase>
      <Typography
        sx={{
          position: "absolute",
          top: -2,
          right: -2,
          minWidth: 12,
          height: 12,
          // p: theme.spacing(0, 0.5),
          backgroundColor: pink[500],
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: `#ffffff`,
          borderRadius: "50%",
          border: `1px solid #ffffff`,
        }}
      ></Typography>
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          top: 48,
          right: 0,
          display: open ? "flex" : "none",
          boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
          flexDirection: "column",
          p: theme.spacing(1, 0),
          zIndex: 9,
          backgroundColor: "#ffffff",
          border: `1px solid ${youhaGrey[200]}`,
          borderRadius: 0.5,
        }}
        className=""
      >
        <Box
          sx={{
            p: theme.spacing(2),
            display: "flex",
            width: 320,
          }}
        >
          {mypagePages.map((item, index) => {
            return <Btn key={index} item={item} />;
          })}
        </Box>
        <Box
          sx={{
            p: theme.spacing(1.5, 1, 1, 1),
            display: "flex",
            width: 320,
            borderTop: `1px solid ${youhaGrey[200]}`,
            "& > :not(:last-of-type)": {
              borderRight: `1px solid ${youhaGrey[200]}`,
            },
          }}
        >
          {/* <ButtonBase
            sx={{
              flex: 1,
              justifyContent: "center",
              height: "100%",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 400,
                color: youhaGrey[900],
              }}
            >
              공지사항
            </Typography>
          </ButtonBase> */}
          <ButtonBase
            sx={{
              flex: 1,
              justifyContent: "center",
              height: "100%",
              "&:hover": {
                opacity: 0.7,
              },
            }}
            onClick={onClickLogout}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 400,
                color: youhaGrey[700],
              }}
            >
              로그아웃
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
}
