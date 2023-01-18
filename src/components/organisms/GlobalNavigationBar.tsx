import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { theme } from "../../themes/theme";
import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import Toolbar from "../atoms/Toolbar";

const headers = [
  { href: "/auth/signin", title: "로그인", type: "default" },
  { href: "/auth/signup", title: "회원가입", type: "default" },
];

const navs = [
  { href: "/ranking", title: "유튜버 순위", type: "default" },
  { href: "/mcn", title: "MCN 찾기", type: "default" },
  { href: "/finance", title: "금융", type: "new" },
];

export default function GlobalNavigationBar() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: `1px solid ${grey[300]}`,
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
  const [value, setValue] = useState<string>("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
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
              boxShadow: `#638DFF 0px 0px 0px 1px inset`,
            },
            "&.Mui-focused": {
              boxShadow: `#2F59CC 0px 0px 0px 1px inset`,
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
        >
          <Icon name="search" size={20} />
        </IconButton>
      </Box>
      {headers.map((item, index) => (
        <HeaderBtn key={index} item={item} />
      ))}
    </Toolbar>
  );
}

function Nav() {
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
      <Link href={href} passHref>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            m: theme.spacing(0, 3, 0, 0),
            cursor: "pointer",
            "&:hover": {
              "& *": {
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
                  //   color: "#2F59CC",
                  color: `${pink[500]} !important`,
                }}
              >
                NEW
              </Typography>
            </Box>
          )}
        </Box>
      </Link>
    );
  }
  return (
    <Toolbar>
      <Box
        sx={{
          flex: 1,
          display: "flex",
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
            "&:hover": {
              "& *": {
                color: "#2F59CC",
              },
              "& .icon": {
                "&.bars": {
                  transform: `translateY(-100%)`,
                },
                "&.up": {
                  transform: `translateY(-100%)`,
                },
              },
              "& .categories": {
                display: "flex",
              },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 20,
              height: 20,
              m: theme.spacing(0, 1, 0, 0),
              overflow: "hidden",
              "& .icon": {
                position: "absolute",
                transition: `all 0.35s ease`,
                "&.bars": {
                  top: 0,
                  left: 0,
                },
                "&.up": {
                  top: "100%",
                  left: 0,
                },
              },
            }}
          >
            <Box className="icon bars">
              <Icon name="bars" prefix="fas" size={20} />
            </Box>
            <Box className="icon up">
              <Icon name="angle-up" prefix="fas" size={20} />
            </Box>
          </Box>
          <Typography
            sx={{
              fontWeight: "700",
            }}
          >
            전체 카테고리
          </Typography>
          <Categories />
        </Box>
        {navs.map((item, index) => (
          <NavBtn key={index} item={item} />
        ))}
      </Box>
    </Toolbar>
  );
}

function Categories() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 48,
        left: 0,
        width: 240,
        height: 400,
        display: "none",
        boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
        backgroundColor: "#ffffff",
        borderRadius: 1,
        maxHeight: `calc(100vh - 56px - 48px - 24px)`,
      }}
      className="categories"
    ></Box>
  );
}
