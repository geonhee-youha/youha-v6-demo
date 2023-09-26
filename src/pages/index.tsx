import { Box, Stack, SxProps, Typography } from "@mui/material";
import MainBanner from "../components/organisms/MainBanner";
import PopupBanner from "../components/organisms/PopupBanner";
import Container from "../components/atoms/Container";
import { theme } from "../themes/theme";
import Visual from "../components/atoms/Visual";
import { ProductProps, products } from "../data/product";
import {
  cyan,
  deepPurple,
  grey,
  pink,
  purple,
  red,
} from "@mui/material/colors";
import Typo from "../components/atoms/Typo";
import youhaBlue from "../constants/youhaBlue";
import { comma } from "../utils";
import _ from "lodash";
import Footer from "../components/organisms/Footer";
import Link from "next/link";

function diffDay(time1: Date, time2: Date) {
  const diff: any = time2.getTime() - time1.getTime();
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${diffDay}`;
}

type TagProps = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

function Tag({ item }: { item: TagProps }) {
  const { label, backgroundColor, textColor } = item;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: theme.spacing(0, 0.75),
        borderRadius: 0.5,
        height: 20,
        backgroundColor: backgroundColor,
      }}
    >
      <Typography
        sx={{
          fontSize: 10,
          lineHeght: "14px",
          fontWeight: "700",
          color: textColor,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function Product({ item }: { item: ProductProps }) {
  const {
    state,
    deadline,
    thumbnail,
    videoType,
    type,
    product,
    offer,
    brand,
    quota,
    applicants,
    fee,
  } = item;
  const tags: TagProps[] = [
    {
      label: videoType,
      backgroundColor: youhaBlue[500],
      textColor: "#FFFFFF",
    },
    {
      label: type,
      backgroundColor: grey[200],
      textColor: grey[700],
    },
  ];
  return (
    <Box
      sx={{
        cursor: "pointer",
        "& *": {
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Visual
          src={thumbnail}
          sx={{
            borderRadius: 1,
            overflow: "hidden",
            "& *": {
              transform: "none !important",
            },
            "&::after": {
              position: "absolute",
              content: '""',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.1)",
              zIndex: 1,
            },
          }}
        />
      </Box>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          m: theme.spacing(1.5, 0, 0, 0),
        }}
      >
        {tags.map((item, index) => {
          return <Tag key={index} item={item} />;
        })}
      </Stack>
      <Box
        sx={{
          //  minHeight: `72px`,
          m: theme.spacing(1, 0, 0, 0),
        }}
      >
        <Typo
          sx={{
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: "700",
            wordBreak: "keep-all",
          }}
        >
          {`[${brand}] ${product}`}
        </Typo>
        <Typo
          lines={2}
          sx={{
            m: theme.spacing(0.5, 0, 0, 0),
            fontSize: 12,
            lineHeight: "16px",
            color: grey[700],
          }}
        >
          {offer.summary}
        </Typo>
      </Box>
      <Typography
        sx={{
          m: theme.spacing(0.5, 0, 0, 0),
          fontSize: 12,
          lineHeight: "16px",
          color: grey[900],
          "& span": {
            fontWeight: "700",
          },
        }}
      >
        신청 <span>{applicants}명</span> / {quota}명
      </Typography>
      <Stack
        spacing={0.5}
        direction="row"
        sx={{
          m: theme.spacing(1.5, 0, 0, 0),
        }}
      >
        {state === "오픈중" ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: theme.spacing(0, 0.75),
                borderRadius: 0.5,
                height: 20,
                border: `1px solid ${pink[500]}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  lineHeght: "14px",
                  fontWeight: "700",
                  color: pink[500],
                }}
              >
                D-{diffDay(new Date(), deadline)}일
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: theme.spacing(0, 0.75),
                borderRadius: 0.5,
                height: 20,
                border: `1px solid ${grey[900]}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  lineHeght: "14px",
                  fontWeight: "700",
                  color: grey[900],
                  "& span": {
                    color: grey[900],
                  },
                }}
              >
                {comma(fee)}원 지급
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: theme.spacing(0, 0.75),
                borderRadius: 0.5,
                height: 20,
                border: `1px solid ${grey[500]}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  lineHeght: "14px",
                  fontWeight: "700",
                  color: grey[500],
                }}
              >
                오픈예정
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: theme.spacing(0, 0.75),
                borderRadius: 0.5,
                height: 20,
                border: `1px solid ${grey[900]}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  lineHeght: "14px",
                  fontWeight: "700",
                  color: grey[900],
                  "& span": {
                    color: grey[900],
                  },
                }}
              >
                {comma(fee)}원 지급
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
}

function Product2({ item }: { item: ProductProps }) {
  const {
    deadline,
    thumbnail,
    videoType,
    type,
    product,
    offer,
    brand,
    quota,
    applicants,
    fee,
  } = item;
  const tags: TagProps[] = [
    {
      label: videoType,
      backgroundColor: youhaBlue[500],
      textColor: "#FFFFFF",
    },
    {
      label: type,
      backgroundColor: grey[200],
      textColor: grey[700],
    },
  ];
  return (
    <Box
      sx={{
        cursor: "pointer",
        "& *": {
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Visual
          src={thumbnail}
          sx={{
            borderRadius: `8px !important`,
            overflow: "hidden",
            "& *": {
              transform: "none !important",
            },
            "&::after": {
              position: "absolute",
              content: '""',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.1)",
              zIndex: 1,
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            p: theme.spacing(0, 1),
            borderRadius: 2,
            height: 20,
            backgroundColor: deepPurple[400],
            zIndex: 999,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              lineHeght: "14px",
              fontWeight: "700",
              color: "#FFFFFF",
              "& span": {
                color: grey[900],
              },
            }}
          >
            {diffDay(new Date(), deadline)}일 남음
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          //  minHeight: `72px`,
          m: theme.spacing(1.5, 0, 0, 0),
        }}
      >
        <Typo
          sx={{
            fontSize: 10,
            lineHeight: "12px",
            fontWeight: "700",
            wordBreak: "keep-all",
          }}
        >
          {`${brand}`}
        </Typo>
        <Typo
          sx={{
            m: theme.spacing(0.25, 0, 0, 0),
            fontSize: 16,
            lineHeight: "24px",
            // fontWeight: "700",
            wordBreak: "keep-all",
          }}
        >
          {`${product}`}
        </Typo>
        <Typo
          lines={1}
          sx={{
            m: theme.spacing(0.5, 0, 0, 0),
            fontSize: 12,
            lineHeight: "16px",
            color: grey[500],
          }}
        >
          {offer.summary}
        </Typo>
        <Typography
          sx={{
            m: theme.spacing(0.5, 0, 0, 0),
            fontSize: 12,
            lineHeight: "16px",
            color: grey[700],
            "& span": {
              fontWeight: "700",
            },
          }}
        >
          신청 <span>{applicants}명</span> / {quota}명
        </Typography>
        {/* <Typo
          sx={{
            m: theme.spacing(0.5, 0, 0, 0),
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: "700",
            wordBreak: "keep-all",
            "& span": {
              fontSize: 12,
              m: theme.spacing(0, 0, 0, 0.25),
            },
          }}
        >
          {`${comma(fee)}`}<span>원 지급</span>
        </Typo> */}
      </Box>
      <Stack
        spacing={0.5}
        direction="row"
        sx={{
          m: theme.spacing(1, 0, 0, 0),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            p: theme.spacing(0, 1),
            borderRadius: 0.5,
            height: 24,
            border: `1px solid ${youhaBlue[500]}`,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              lineHeght: "16px",
              fontWeight: "700",
              color: youhaBlue[500],
              "& span": {
                color: youhaBlue[500],
              },
            }}
          >
            {/* + <span>{comma(fee)}</span>원 */}
            {comma(fee)}원 지급
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          m: theme.spacing(1, 0, 0, 0),
        }}
      >
        {tags.map((item, index) => {
          return <Tag key={index} item={item} />;
        })}
      </Stack>
    </Box>
  );
}

function Header() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        // borderBottom: `1px solid ${grey[200]}`,
      }}
    >
      <Box
        sx={{
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 2),
          maxWidth: "480px",
          height: `56px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
          "& img": {
            width: "auto",
            height: 20,
          },
        }}
      >
        <img src="/logos/youha.members.png" />
      </Box>
    </Box>
  );
}

function Banner() {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Link passHref href="https://pf.kakao.com/_jxkJxks">
        <Box
          sx={{
            position: "relative",
            p: theme.spacing(`25%`, 0, 0, 0),
            // borderRadius: 1,
            overflow: "hidden",
            "& img": {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "cover",
            },
            cursor: "pointer",
          }}
        >
          <img src="/images/banner01.png" />
        </Box>
      </Link>
    </Box>
  );
}

export default function Index() {
  return (
    <>
      <Header />
      <Box
        sx={{
          m: theme.spacing(0, "auto"),
          p: theme.spacing(0, 0, 3, 0),
          maxWidth: "480px",
        }}
      >
        <Banner />
        <Box
          sx={{
            p: theme.spacing(3, 0),
          }}
        >
          <Box
            sx={{
              p: theme.spacing(3, 2),
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
              }}
            >
              지금 모집중인 광고 🤩
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
              }}
            >
              간단히 신청하고 협찬지원금도 받아가자!
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "1fr",
                gridTemplateRows: "auto auto",
                gridColumnGap: 12,
                gridRowGap: 32,
                m: theme.spacing(1.5, 0, 0, 0),
                // "@media(min-width: 576px)": {
                //   gridTemplateColumns: "1fr 1fr 1fr",
                // },
              }}
            >
              {_.filter(products, (el) => {
                return el.state === "오픈중";
              }).map((item, index) => {
                return <Product key={index} item={item} />;
              })}
            </Box>
          </Box>
          <Box
            sx={{
              p: theme.spacing(3, 2),
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "32px",
                fontWeight: "700",
              }}
            >
              오픈 준비중인 광고 👀
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
              }}
            >
              곧 오픈예정! 얼른 준비하세요!
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridAutoRows: "1fr",
                gridTemplateRows: "auto auto",
                gridColumnGap: 12,
                gridRowGap: 48,
                m: theme.spacing(1.5, 0, 0, 0),
                // "@media(min-width: 576px)": {
                //   gridTemplateColumns: "1fr 1fr 1fr",
                // },
              }}
            >
              {_.filter(products, (el) => {
                return el.state !== "오픈중";
              }).map((item, index) => {
                return <Product key={index} item={item} />;
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
