import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../themes/theme";
import Visual from "../components/atoms/Visual";
import { ProductProps, products } from "../data/product";
import { cyan, grey, pink } from "@mui/material/colors";
import Typo from "../components/atoms/Typo";
import youhaBlue from "../constants/youhaBlue";
import { comma } from "../utils";
import _ from "lodash";
import Footer from "../components/organisms/Footer";
import Link from "next/link";
import Icon from "../components/atoms/Icon";
import { log } from "console";

export function diffDay(time1: Date, time2: Date | null) {
  if (time2 === null) return -9999;
  const diff: any = time2.getTime() - time1.getTime();
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  return diffDay;
}

type TagProps = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

function Tag({ size, item }: { size?: string; item: TagProps }) {
  const { label, backgroundColor, textColor } = item;
  const md = size === "md";
  const mdSx = {
    p: theme.spacing(0, 1),
    height: 24,
    fontSize: 12,
    lineHeght: "16px",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: md ? mdSx.p : theme.spacing(0, 0.75),
        borderRadius: 0.5,
        height: md ? mdSx.height : 20,
        backgroundColor: backgroundColor,
      }}
    >
      <Typography
        sx={{
          fontSize: md ? mdSx.fontSize : 10,
          lineHeght: md ? mdSx.lineHeght : "14px",
          fontWeight: "700",
          color: textColor,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function Product({
  type: productType,
  item,
}: {
  type?: string;
  item: ProductProps;
}) {
  const {
    id,
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
    registrationDuration,
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
  const page = productType === "page";
  const waiting =
    diffDay(new Date(), registrationDuration[0]) === 9999 ||
    diffDay(new Date(), registrationDuration[0]) > 0;
  const closed =
    registrationDuration[0] !== null &&
    diffDay(new Date(), registrationDuration[1]) < 0;
  const ongoing = !waiting && !closed;
  if (page) return <Inner page={page} item={item} />;
  return (
    <Link href={`/product/${id}`} passHref>
      <a>
        <Inner page={page} item={item} />
      </a>
    </Link>
  );
}
function Inner({ page, item }: { page: boolean; item: ProductProps }) {
  const {
    id,
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
    registrationDuration,
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
  const waiting =
    diffDay(new Date(), registrationDuration[0]) === 9999 ||
    diffDay(new Date(), registrationDuration[0]) > 0;
  const closed =
    registrationDuration[0] !== null &&
    diffDay(new Date(), registrationDuration[1]) < 0;
  const ongoing = !waiting && !closed;
  return (
    <Box
      sx={
        page
          ? {}
          : {
              cursor: "pointer",
              "& *": {
                cursor: "pointer",
              },
            }
      }
    >
      <Box sx={{ position: "relative" }}>
        <Visual
          src={thumbnail}
          sx={{
            borderRadius: page ? 0 : 1,
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
      {page && (
        <Link href={item.productLinkUrl} passHref>
          <a
            target="_blank"
            href="https://twitter.com/"
            rel="noopener noreferrer"
          >
            <ButtonBase
              sx={{
                height: 28,
                backgroundColor: grey[900],
                p: theme.spacing(0, 2),
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <Icon
                name="cart-shopping"
                prefix="fas"
                color={cyan[500]}
                sx={{ m: theme.spacing(0, 0.5, 0, 0) }}
                size={16}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: "16px",
                  color: "#FFFFFF",
                  fontWeight: "700",
                }}
              >
                구매사이트에서 바로 보기
              </Typography>
              <Icon
                name="chevron-right"
                color={"#ffffff"}
                sx={{ m: theme.spacing(0, 0, 0, "auto") }}
                size={16}
              />
            </ButtonBase>
          </a>
        </Link>
      )}
      <Box
        sx={{
          p: theme.spacing(0, page ? 2 : 0, page ? 3 : 0, page ? 2 : 0),
        }}
      >
        <Stack
          direction="row"
          spacing={page ? 1 : 0.5}
          sx={{
            m: theme.spacing(page ? 3 : 1.5, 0, 0, 0),
          }}
        >
          {tags.map((item, index) => {
            return <Tag key={index} item={item} size={page ? "md" : "sm"} />;
          })}
        </Stack>
        <Box
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          <Typo
            sx={{
              fontSize: page ? 24 : 16,
              lineHeight: page ? "36px" : "24px",
              fontWeight: "700",
              wordBreak: "keep-all",
              color: grey[900],
            }}
          >
            {`[${brand}] ${product}`}
          </Typo>
          <Typo
            lines={2}
            sx={{
              m: theme.spacing(page ? 1 : 0.5, 0, 0, 0),
              fontSize: page ? 14 : 12,
              lineHeight: page ? "20px" : "16px",
              color: grey[700],
            }}
          >
            {offer.summary}
          </Typo>
        </Box>
        <Typography
          sx={{
            m: theme.spacing(page ? 1 : 0.5, 0, 0, 0),
            fontSize: page ? 14 : 12,
            lineHeight: page ? "20px" : "16px",
            color: ongoing ? grey[900] : grey[500],
            "& span": {
              fontWeight: "700",
            },
          }}
        >
          신청 <span>{applicants}명</span> / {quota}명
        </Typography>
        <Stack
          spacing={page ? 1 : 0.5}
          direction="row"
          sx={{
            m: theme.spacing(page ? 2 : 1.5, 0, 0, 0),
          }}
        >
          {ongoing ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  p: page ? theme.spacing(0, 1) : theme.spacing(0, 0.75),
                  borderRadius: 0.5,
                  height: page ? 24 : 20,
                  border: `1px solid ${pink[500]}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: page ? 12 : 10,
                    lineHeght: page ? "20px" : "14px",
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
                  p: page ? theme.spacing(0, 1) : theme.spacing(0, 0.75),
                  borderRadius: 0.5,
                  height: page ? 24 : 20,
                  border: `1px solid ${grey[900]}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: page ? 12 : 10,
                    lineHeght: page ? "20px" : "14px",
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
                  p: page ? theme.spacing(0, 1) : theme.spacing(0, 0.75),
                  borderRadius: 0.5,
                  height: page ? 24 : 20,
                  border: `1px solid ${closed ? grey[500] : grey[900]}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: page ? 12 : 10,
                    lineHeght: page ? "20px" : "14px",
                    fontWeight: "700",
                    color: closed ? grey[500] : grey[900],
                  }}
                >
                  {closed ? "신청마감" : "오픈예정"}
                </Typography>
              </Box>
              {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              p: page ? theme.spacing(0, 1) : theme.spacing(0, 0.75),
              borderRadius: 0.5,
              height: page ? 24 : 20,
              border: `1px solid ${grey[900]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: page ? 12 : 10,
                lineHeght: page ? "20px" : "14px",
                fontWeight: "700",
                color: grey[900],
                "& span": {
                  color: grey[900],
                },
              }}
            >
              {comma(fee)}원 지급
            </Typography>
          </Box> */}
            </>
          )}
        </Stack>
      </Box>
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
          p: theme.spacing(0, 0, 3, 0),
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
                const { registrationDuration, deadline } = el;
                const waiting =
                  diffDay(new Date(), registrationDuration[0]) > 0;
                const closed = diffDay(new Date(), deadline) <= 0;
                const ongoing = !waiting && !closed;
                return ongoing;
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
                const { registrationDuration, deadline } = el;
                const waiting =
                  diffDay(new Date(), registrationDuration[0]) > 0;
                const closed = diffDay(new Date(), deadline) <= 0;
                const ongoing = !waiting && !closed;
                return !ongoing;
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
