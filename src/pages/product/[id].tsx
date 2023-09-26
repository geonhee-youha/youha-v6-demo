import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import Icon from "../../components/atoms/Icon";
import Button from "../../components/atoms/Button";
import { useRouter } from "next/router";
import { ProductProps, products, viewSplitLine } from "../../data/product";
import _ from "lodash";
import Visual from "../../components/atoms/Visual";
import { Product, diffDay } from "..";
import Footer from "../../components/organisms/Footer";
import { grey } from "@mui/material/colors";
import moment from "moment";
import { useState } from "react";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const onCilckHome = () => {
    router.push("/");
  };
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
          p: theme.spacing(0, 1),
          maxWidth: "480px",
          height: `56px`,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          "& img": {
            width: "auto",
            height: 20,
          },
        }}
      >
        <ButtonBase
          sx={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => router.back()}
        >
          <Icon name="chevron-left" size={24} />
        </ButtonBase>
        <ButtonBase
          sx={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onCilckHome}
        >
          <Icon name="home-alt" size={24} />
        </ButtonBase>
      </Box>
    </Box>
  );
}

function BottomAction({ item }: { item: ProductProps }) {
  const router = useRouter();
  const { registrationDuration } = item;
  const waiting =
    diffDay(new Date(), registrationDuration[0]) === 9999 ||
    diffDay(new Date(), registrationDuration[0]) > 0;
  const closed =
    registrationDuration[0] !== null &&
    diffDay(new Date(), registrationDuration[1]) < 0;
  const ongoing = !waiting && !closed;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          m: theme.spacing(0, "auto"),
          maxWidth: "480px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          "& *": {
            width: `100%`
          },
        }}
      >
        {ongoing ? (
          <Link href={item.registerLinkUrl} passHref>
            <a
              target="_blank"
              href={item.registerLinkUrl}
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                fullWidth
                disabled={!ongoing}
                sx={{
                  borderRadius: 0,
                  height: `60px !important`,
                }}
              >
                {ongoing ? (
                  <>
                    지금 바로 신청하기
                    <Icon
                      name="arrow-right"
                      size={20}
                      color="#FFFFFF"
                      sx={{
                        m: theme.spacing(0, 0, 0, 1),
                      }}
                    />
                  </>
                ) : closed ? (
                  "신청이 마감되었습니다."
                ) : (
                  "오픈예정인 광고입니다."
                )}
              </Button>
            </a>
          </Link>
        ) : (
          <Button
            size="lg"
            fullWidth
            disabled={!ongoing}
            sx={{
              borderRadius: 0,
              height: `60px !important`,
            }}
          >
            {ongoing ? (
              <>
                지금 바로 신청하기
                <Icon
                  name="arrow-right"
                  size={20}
                  color="#FFFFFF"
                  sx={{
                    m: theme.spacing(0, 0, 0, 1),
                  }}
                />
              </>
            ) : closed ? (
              "신청이 마감되었습니다."
            ) : (
              "오픈예정인 광고입니다."
            )}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default function Index() {
  const router = useRouter();
  const { query } = router;
  const item =
    products[
      _.findIndex(products, (el) => {
        return el.id === query.id;
      })
    ];
  if (!item) return <></>;
  const { registrationDuration } = item;
  const waiting =
    diffDay(new Date(), registrationDuration[0]) === 9999 ||
    diffDay(new Date(), registrationDuration[0]) > 0;
  const closed =
    registrationDuration[0] !== null &&
    diffDay(new Date(), registrationDuration[1]) < 0;
  const ongoing = !waiting && !closed;
  const [detailImgsOpened, setDetailImgsOpened] = useState<boolean>(false);
  return (
    <>
      <Header />
      <Product type="page" item={item} />
      <Box>
        <Box
          sx={{
            height: 16,
            backgroundColor: `#F5F5F5`,
          }}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: theme.spacing(3, 2, 3, 2),
          }}
        >
          <Stack spacing={1.5} sx={{ width: 96 }}>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
                fontWeight: "700",
              }}
            >
              광고 신청기간
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
                fontWeight: "700",
              }}
            >
              선정일
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[500],
                fontWeight: "700",
              }}
            >
              업로드 기간
            </Typography>
          </Stack>
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
              }}
            >
              {`${moment(item.registrationDuration[0]).format(
                "MM.DD"
              )} ~ ${moment(item.registrationDuration[1]).format("MM.DD")}`}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
              }}
            >
              {item.selectionDate
                ? `${moment(item.selectionDate).format("MM.DD")}`
                : `미정`}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
              }}
            >
              {item.uploadDuration
                ? `${moment(item.uploadDuration[0]).format("MM.DD")} ~ ${moment(
                    item.uploadDuration[1]
                  ).format("MM.DD")}`
                : "미정"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box className="Section">
        <Box
          sx={{
            height: 16,
            backgroundColor: `#F5F5F5`,
          }}
        />
        <Box
          sx={{
            p: theme.spacing(3, 2, 3, 2),
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            제공 내역
          </Typography>
          <Box
            sx={{
              m: theme.spacing(1.5, 0, 0, 0),
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "24px",
              }}
            >
              {item.offer.detail === ""
                ? `${item.offer.summary} + 콘텐츠 제작비 별도 지급`
                : item.offer.detail}
            </Typography>
          </Box>
        </Box>
      </Box>
      {ongoing ? (
        <>
          {item.detailImgs && (
            <Box className="Section">
              <Box
                sx={{
                  height: 16,
                  backgroundColor: `#F5F5F5`,
                }}
              />
              <Box
                sx={{
                  p: theme.spacing(3, 2, 3, 2),
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    lineHeight: "32px",
                    fontWeight: "700",
                  }}
                >
                  상세 이미지
                </Typography>
                <Box
                  sx={{
                    m: theme.spacing(1.5, -2, -3, -2),
                    position: "relative",
                    height: detailImgsOpened ? "auto" : `480px`,
                    overflow: "hidden",
                  }}
                >
                  {item.detailImgs.map((item, index) => {
                    return <Visual key={index} src={item} />;
                  })}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 99,
                      background: `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)`,
                      p: theme.spacing(20, 2, 3, 2),
                      display: detailImgsOpened ? "none" : "flex",
                    }}
                  >
                    <Button
                      fullWidth
                      type="outlined"
                      borderColor={grey[300]}
                      color={grey[500]}
                      size="lg"
                      onClick={() => setDetailImgsOpened(true)}
                    >
                      이미지 전체보기
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box className="Section">
            <Box
              sx={{
                height: 16,
                backgroundColor: `#F5F5F5`,
              }}
            />
            <Box
              sx={{
                p: theme.spacing(3, 2, 3, 2),
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                }}
              >
                광고 가이드라인
              </Typography>
              <Box
                sx={{
                  m: theme.spacing(1.5, 0, 0, 0),
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "24px",
                  }}
                >
                  {viewSplitLine(item.mission)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="Section">
            <Box
              sx={{
                height: 16,
                backgroundColor: `#F5F5F5`,
              }}
            />
            <Box
              sx={{
                p: theme.spacing(3, 2, 3, 2),
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                }}
              >
                키워드
              </Typography>
              <Box
                sx={{
                  m: theme.spacing(1.5, 0, 0, 0),
                }}
              >
                {item.keywords.map((item, index) => {
                  return (
                    <Typography
                      component={"span"}
                      sx={{
                        fontSize: 14,
                        lineHeight: "24px",
                      }}
                    >
                      {index === 0 ? "" : ", "}
                      {item}
                    </Typography>
                  );
                })}
              </Box>
              <Typography
                sx={{
                  m: theme.spacing(1, 0, 0, 0),
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                * 영상 업로드 시 ‘제목’과 ‘설명’ 부분에 활용해주세요.
              </Typography>
            </Box>
          </Box>
          <Box className="Section">
            <Box
              sx={{
                height: 16,
                backgroundColor: `#F5F5F5`,
              }}
            />
            <Box
              sx={{
                p: theme.spacing(3, 2, 3, 2),
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "32px",
                  fontWeight: "700",
                }}
              >
                태그
              </Typography>
              <Box
                sx={{
                  m: theme.spacing(1.5, 0, 0, 0),
                }}
              >
                {item.tags.map((item, index) => {
                  return (
                    <Typography
                      component={"span"}
                      sx={{
                        fontSize: 14,
                        lineHeight: "24px",
                      }}
                    >
                      {index === 0 ? "" : ", "}
                      {item}
                    </Typography>
                  );
                })}
              </Box>
              <Typography
                sx={{
                  m: theme.spacing(1, 0, 0, 0),
                  fontSize: 12,
                  lineHeight: "16px",
                  color: grey[500],
                }}
              >
                * 영상 업로드 시 ‘태그’에 활용해주세요.
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Box
            sx={{
              height: 16,
              backgroundColor: `#F5F5F5`,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "480px",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "24px",
              }}
            >
              자세한 광고 컨디션은 신청 오픈 후 공개됩니다.
            </Typography>
          </Box>
        </Box>
      )}
      <Box className="Section">
        <Box
          sx={{
            height: 16,
            backgroundColor: `#F5F5F5`,
          }}
        />
        <Box
          sx={{
            p: theme.spacing(3, 2, 3, 2),
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              fontWeight: "700",
            }}
          >
            주의사항
          </Typography>
          <Box
            sx={{
              m: theme.spacing(1.5, 0, 0, 0),
            }}
          >
            <Typography
              component={"span"}
              sx={{
                fontSize: 14,
                lineHeight: "24px",
              }}
            >
              {viewSplitLine(`- 완성된 영상이 가이드라인의 내용을 반영하지 않았다면 추후 수정 및 재작업을 요구할 수 있습니다.
- 제공받은 제품은 타인에게 양도 및 판매, 교환을 절대 허용하지 않으며, 적발 시 제품 가격 환불 및 캠페인 참여 제한됩니다.
- 영상 업로드 기간 내 영상 미업로드 시 서비스 이용료 및 제품 가격에 대하여 비용 청구됩니다.
- 선정 후 단순 변심에 의한 제공내역 옵션 및 배송지 변경은 어렵습니다.
- 안내된 제공 내역과 다르거나, 별도 공지 없이 7일 이상 배송되지 않는 등 진행이 어려운 경우 1:1 문의로 연락해 주세요.
- 업체 측 요청에 따라 선정 인플루언서 수가 변경될 수 있습니다.
- 업로드하신 영상은 6개월동안 유지해야 하며, 유지하지 않을 경우 패널티가 부과됩니다.
`)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
      <BottomAction item={item} />
    </>
  );
}
