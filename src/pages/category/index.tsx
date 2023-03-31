import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Container from "../../components/atoms/Container";
import { categoryList } from "../../constants";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";

export default function Page() {
  return (
    <Container>
      <Box
        sx={{
          p: theme.spacing(2, 0, 5, 0),
        }}
      >
        <Box
          sx={{
            p: theme.spacing(2, 0),
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              lineHeight: "28px",
              fontWeight: "700",
            }}
          >
            카테고리
          </Typography>
        </Box>
        {categoryList.map((item, index) => {
          const router = useRouter();
          const { emoji, title, value } = item;
          const onClick = () => {
            router.push(`/search?type=youtuber&categories=${value}`);
          };
          return (
            <ButtonBase
              key={index}
              sx={{
                width: "100%",
                p: theme.spacing(1, 0),
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
    </Container>
  );
}
