import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { theme } from "../../themes/theme";
import { grey } from "@mui/material/colors";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const focused = `/${pathnames[1]}` !== "/auth";
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: `#f5f5f5`,
        display: focused ? "block" : "none",
        p: theme.spacing(2, 2, 10, 2),
      }}
    >
      <Box
        sx={{
          borderBottom: `1px solid ${grey[300]}`,
          p: theme.spacing(1.5, 0),
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: grey[700],
            fontWeight: "700",
          }}
        >
          (주) 티켓플레이스 사업자 정보
        </Typography>
      </Box>
      <Stack
        spacing={1}
        sx={{
          p: theme.spacing(1.5, 0),
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            "& *": {
              fontSize: `12px !important`,
              lineHeight: "16px !important",
            },
          }}
        >
          <Typography
            sx={{
              color: grey[500],
            }}
          >
            대표자
          </Typography>
          <Typography
            sx={{
              color: grey[900],
            }}
          >
            한준희
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            "& *": {
              fontSize: `12px !important`,
              lineHeight: "16px !important",
            },
          }}
        >
          <Typography
            sx={{
              color: grey[500],
            }}
          >
            주소
          </Typography>
          <Typography
            sx={{
              color: grey[900],
            }}
          >
            서울특별시 강남구 봉은사로 2길 21, 반석빌딩 5층
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            "& *": {
              fontSize: `12px !important`,
              lineHeight: "16px !important",
            },
          }}
        >
          <Typography
            sx={{
              color: grey[500],
            }}
          >
            사업자등록번호
          </Typography>
          <Typography
            sx={{
              color: grey[900],
            }}
          >
            145-87-00100
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            "& *": {
              fontSize: `12px !important`,
              lineHeight: "16px !important",
            },
          }}
        >
          <Typography
            sx={{
              color: grey[500],
            }}
          >
            광고 제휴문의
          </Typography>
          <Typography
            sx={{
              color: grey[900],
            }}
          >
            business@youha.info
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            "& *": {
              fontSize: `12px !important`,
              lineHeight: "16px !important",
            },
          }}
        >
          <Typography
            sx={{
              color: grey[500],
            }}
          >
            마케팅 제휴문의
          </Typography>
          <Typography
            sx={{
              color: grey[900],
            }}
          >
            business@youha.info
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: grey[500],
          }}
        >
          Copyright © 티켓플레이스. All rights reserved.
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{
          p: theme.spacing(1.5, 0),
        }}
      >
        <Link
          href="https://www.notion.so/5c99a3571c684b4bb4d1d70283b4d7cb"
          passHref
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: grey[700],
              cursor: "pointer",
            }}
          >
            이용약관
          </Typography>
        </Link>
        <Box
          sx={{
            width: `1px`,
            height: `10px`,
            backgroundColor: grey[400],
          }}
        ></Box>
        <Link
          href="https://www.notion.so/0c40b91bd29440c1bfe153cd76246141"
          passHref
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: grey[700],
              cursor: "pointer",
            }}
          >
            개인정보처리방침
          </Typography>
        </Link>
        <Box
          sx={{
            width: `1px`,
            height: `10px`,
            backgroundColor: grey[400],
          }}
        ></Box>
        <Link href="https://tech.youha.info/" passHref>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: grey[700],
              cursor: "pointer",
            }}
          >
            기술 블로그
          </Typography>
        </Link>
        <Box
          sx={{
            width: `1px`,
            height: `10px`,
            backgroundColor: grey[400],
          }}
        ></Box>
        <Link href="https://careers.youha.info/" passHref>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              color: grey[700],
              cursor: "pointer",
            }}
          >
            채용
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}
