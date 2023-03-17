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
import { categoryList } from "../../constants";
import { theme } from "../../themes/theme";
import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import Toolbar from "../atoms/Toolbar";

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
        zIndex: 999,
        // borderBottom: `1px solid ${grey[300]}`,
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
    router.push(`/search?type=youtuber&value=${value}`);
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
              opacity: 0.4,
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
        <Languages />
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
              width: `2px`,
              height: `12px`,
              backgroundColor: grey[300],
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
                "& > *": {
                  color: grey[400],
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
                opacity: categoriesOpen ? 0.4 : 1,
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
                opacity: categoriesOpen ? 0.4 : 1,
              }}
            />
          </Box>
        </Box>
        <Typography
          sx={{
            fontWeight: "700",
            opacity: categoriesOpen ? 0.4 : 1,
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
        // backgroundColor: grey[50],
        backgroundColor: "#ffffff",
        border: `1px solid ${grey[300]}`,
        borderRadius: 0.5,
      }}
      className="categories"
    >
      {categoryList.map((item, index) => {
        const router = useRouter();
        const { emoji, title, value } = item;
        const onClick = () => {
          setOpen(false);
          router.push(`/search?type=youtuber&categories=${value}`);
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
    <Box ref={ref} sx={{ height: "100%" }}>
      <IconButton
        sx={{
          width: 24,
          height: "100%",
          borderRadius: "50%",
          "&:hover": {
            "& svg": {
              opacity: 0.4,
            },
          },
        }}
        disableRipple
        onClick={onClick}
      >
        <Icon prefix="fal" name="globe" size={20} />
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
          // backgroundColor: grey[50],
          backgroundColor: "#ffffff",
          border: `1px solid ${grey[300]}`,
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
