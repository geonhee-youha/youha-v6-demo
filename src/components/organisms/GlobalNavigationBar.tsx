import {
  alpha,
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { cyan, grey, pink } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { theme } from "../../themes/theme";
import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import Toolbar from "../atoms/Toolbar";

const headers = [
  { href: "/auth/signin", title: "로그인", type: "default" },
  { href: "/auth/signup", title: "회원가입", type: "default" },
];

const navs = [
  { href: "/ranking", title: "유튜버 랭킹", type: "hot" },
  { href: "/case", title: "성공 사례", type: "default" },
  { href: "/mcn", title: "MCN 찾기", type: "default" },
  { href: "/finance", title: "금융", type: "new" },
];

export const categories = [
  {
    title: "게임",
    value: "game",
    secondaries: [
      {
        title: "액션게임",
        value: "action",
      },
      {
        title: "리듬게임",
        value: "rythem",
      },
      {
        title: "RPG게임",
        value: "rpg",
      },
      {
        title: "스포츠게임",
        value: "sports",
      },
      {
        title: "전략게임",
        value: "stretegy",
      },
      {
        title: "RTS게임",
        value: "rts",
      },
    ],
  },
  {
    title: "뷰티·메이크업",
    value: "beauty",
    secondaries: [
      {
        title: "뷰티",
        value: "beauty",
      },
      {
        title: "메이크업",
        value: "makeup",
      },
      {
        title: "스킨케어",
        value: "skincare",
      },
      {
        title: "헤어스타일",
        value: "hairstyle",
      },
      {
        title: "네일",
        value: "nail",
      },
    ],
  },
  {
    title: "패션",
    value: "fashion",
    secondaries: [
      {
        title: "옷",
        value: "cloths",
      },
      {
        title: "주얼리",
        value: "jewerly",
      },
      {
        title: "슈즈",
        value: "shoes",
      },
      {
        title: "모자",
        value: "hat",
      },
    ],
  },
  {
    title: "전자제품",
    value: "it",
    secondaries: [
      {
        title: "스마트폰",
        value: "smartphone",
      },
      {
        title: "카메라",
        value: "camera",
      },
      {
        title: "컴퓨터",
        value: "computer",
      },
      {
        title: "게임콘솔",
        value: "gameconsole",
      },
      {
        title: "헤드셋",
        value: "headset",
      },
      {
        title: "텔레비전",
        value: "television",
      },
      {
        title: "스마트워치",
        value: "smartwatch",
      },
      {
        title: "전자담배",
        value: "smoke",
      },
      {
        title: "배터리",
        value: "battery",
      },
    ],
  },
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
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: `1px solid ${grey[300]}`,
        display: focused ? "flex" : "none",
        zIndex: 99,
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
  const [value, setValue] = useState<string>("");
  const [languagesOpen, setLanguagesOpen] = useState<boolean>(false);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const onClickLanguages = () => {
    setLanguagesOpen((prev) => !prev);
  };
  const onSearchClick = () => {
    if (value === "") return;
    router.push(`/search?value=${value}`);
  };
  function HeaderBtn({
    item,
  }: {
    item: { type: string; href: string; title: string };
  }) {
    const { href, title } = item;
    return (
      <Link href={href} passHref>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            m: theme.spacing(0, 0, 0, 3),
            cursor: "pointer",
            "&:hover": {
              "& *": {
                color: grey[600],
              },
            },
          }}
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
            height: 20,
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
        }}
      >
        <InputBase
          value={value}
          onChange={onChange}
          placeholder="어떤 유튜버가 궁금하세요?"
          sx={{
            width: 360,
            height: 40,
            p: theme.spacing(0, 6, 0, 2),
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: grey[100],
            transition: `all 0.35s ease`,
            "&:hover": {
              boxShadow: `#2F59CC 0px 0px 0px 1px inset`,
            },
            "&.Mui-focused": {
              boxShadow: `#2F59CC 0px 0px 0px 2px inset`,
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
          <Icon name="search" size={20} />
        </IconButton>
      </Box>
      {headers.map((item, index) => (
        <HeaderBtn key={index} item={item} />
      ))}
      <Box
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
                color: grey[600],
              },
            },
          }}
          disableRipple
          onClick={onClickLanguages}
        >
          <Icon prefix="fal" name="globe" size={20} />
        </IconButton>
        <Languages open={languagesOpen} setOpen={setLanguagesOpen} />
      </Box>
    </Toolbar>
  );
}

function Nav() {
  const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false);
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
        <Link href={href} passHref>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              m: theme.spacing(0, 3, 0, 0),
              cursor: "pointer",
              "&:hover": {
                "& > *": {
                  color: "#2F59CC",
                },
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                color: focused ? "#2F59CC" : grey[900],
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
                    fontWeight: "900",
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
                    fontWeight: "900",
                    color: `${cyan[500]} !important`,
                  }}
                >
                  NEW
                </Typography>
              </Box>
            )}
          </Box>
        </Link>
        {title === "성공 사례" && (
          <Box
            sx={{
              width: `2px`,
              height: `12px`,
              backgroundColor: grey[300],
              m: theme.spacing(0, 3, 0, 0),
            }}
          />
        )}
      </>
    );
  }
  return (
    <Toolbar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          height: "100%",
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
                color={categoriesOpen ? "#2F59CC" : grey[900]}
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
                color={categoriesOpen ? "#2F59CC" : grey[900]}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              fontWeight: "700",
              color: categoriesOpen ? "#2F59CC" : grey[900],
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
    </Toolbar>
  );
}

function Categories({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 48,
        left: 0,
        width: 240,
        display: open ? "flex" : "none",
        boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
        backgroundColor: "#ffffff",
        borderRadius: 1,
        maxHeight: `calc(100vh - 56px - 48px - 24px)`,
        border: `1px solid ${grey[300]}`,
        flexDirection: "column",
        overflow: "auto",
        p: theme.spacing(1, 0),
      }}
      className="categories"
    >
      {categories.map((item, index) => {
        const { title, value, secondaries } = item;
        return (
          <Box key={index}>
            <Box
              sx={{
                p: theme.spacing(1, 2),
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  fontWeight: "700",
                  color: grey[400],
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box
              sx={{
                p: theme.spacing(0, 0, 2, 0),
              }}
            >
              {secondaries.map((item, index) => {
                const router = useRouter();
                const { title } = item;
                const onClick = () => {
                  setOpen(false);
                  router.push(`/search?first=${value}&secondary=${item.value}`);
                };
                return (
                  <ButtonBase
                    key={index}
                    sx={{
                      width: "100%",
                      p: theme.spacing(1, 2),
                      "&:hover .ripple": {
                        opacity: 1,
                      },
                      "&:hover *": {
                        fontWeight: "700",
                        color: "#2F59CC",
                      },
                    }}
                    onClick={onClick}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: alpha("#2F59CC", 0.08),
                        transition: `all 0.35s ease`,
                        opacity: 0,
                        zIndex: 0,
                      }}
                      className="ripple"
                    />
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
      })}
    </Box>
  );
}

function Languages({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const languagesRef = useRef<any>(null);
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);
  const onClickOutside = (event: Event) => {
    if (!languagesRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  return (
    <Box
      ref={languagesRef}
      sx={{
        position: "absolute",
        top: 48,
        right: 0,
        display: open ? "flex" : "none",
        boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
        backgroundColor: "#ffffff",
        borderRadius: 1,
        border: `1px solid ${grey[300]}`,
        flexDirection: "column",
        p: theme.spacing(1, 0),
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
              "&:hover .ripple": {
                opacity: 1,
              },
              "&:hover *": {
                fontWeight: "700",
                color: "#2F59CC",
              },
            }}
            onClick={onClick}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: alpha("#2F59CC", 0.08),
                transition: `all 0.35s ease`,
                opacity: 0,
                zIndex: 0,
              }}
              className="ripple"
            />
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
  );
}
