import _ from "lodash";
import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import { theme } from "../../themes/theme";
import { categories } from "../../constants/categories";
import { grey } from "@mui/material/colors";
import youhaBlue from "../../constants/youhaBlue";
import Icon from "../../components/atoms/Icon";

const tabs = [
  { title: "유튜버", value: "youtuber" },
  { title: "동영상", value: "video" },
  { title: "쇼츠", value: "shorts" },
];

export default function Page() {
  const router = useRouter();
  const { type, categories: categoryOrigin } = router.query;
  const queryCategories =
    typeof categoryOrigin === "string" ? categoryOrigin.split(",") : [];
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
            p: theme.spacing(2, 0),
          }}
        >
          {tabs.map((item, index) => {
            const { title, value } = item;
            const focused = type === value;
            const onClick = () => {
              router.push(`/search?type=${value}&categories=${categoryOrigin}`);
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
                    fontSize: 24,
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
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: 400,
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
        </Box>
      </Box>
    </Container>
  );
}
