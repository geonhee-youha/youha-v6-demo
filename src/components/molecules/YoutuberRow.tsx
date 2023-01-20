import { alpha, Box, ButtonBase, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import youhaBlue from "../../constants/youhaBlue";
import { theme } from "../../themes/theme";
import { comma } from "../../utils";
import Typo from "../atoms/Typo";

export default function YoutuberRow({
  index,
  item,
}: {
  index?: number;
  item: any;
}) {
  const { thumbnail, title } = item;
  const ranking = index !== undefined ? index + 1 : null;
  return (
    <ButtonBase
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        overflow: "hidden",
        border: `1px solid ${grey[300]}`,
        backgroundColor: "#ffffff",
        boxShadow: `rgb(0 0 0 / 4%) 0px 2px 8px`,
        p: theme.spacing(2),
        transition: `all 0.35s ease`,
        "&:hover": {
          transform: `translateY(-16px)`,
          boxShadow: `rgb(0 0 0 / 24%) 0px 10px 16px`,
        },
      }}
    >
      {ranking ? (
        ranking <= 3 ? (
          <Box
            sx={{
              minWidth: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={
                ranking === 1
                  ? "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/toss-face/342/1st-place-medal_1f947.png"
                  : ranking === 2
                  ? "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/toss-face/342/2nd-place-medal_1f948.png"
                  : ranking === 3
                  ? "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/toss-face/342/3rd-place-medal_1f949.png"
                  : ""
              }
              style={{
                width: "auto",
                height: 32,
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: 32,
              height: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: theme.spacing(0, 1),
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "700",
                color: grey[600],
                fontStyle: "italic",
              }}
            >
              {ranking}
            </Typography>
          </Box>
        )
      ) : null}
      {ranking && (
        <Box
          sx={{
            minWidth: 24,
            height: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: theme.spacing(0, 1, 0, 0),
            p: theme.spacing(0, 1),
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: grey[400],
            }}
          >
            -
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: "50%",
          overflow: "hidden",
          transition: `all 0.35s ease`,
          border: `1px solid ${grey[300]}`,
          "& img": {
            objectFit: "cover",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <img src={thumbnail} />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          p: theme.spacing(0, 2),
        }}
      >
        <Typo
          lines={1}
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: "700",
          }}
        >
          {title}
        </Typo>
        <Typography
          sx={{
            m: theme.spacing(0.5, 0, 0, 0),
            fontSize: 12,
            lineHeight: "16px",
            color: grey[600],
          }}
        >
          구독자 {comma(item.subscriberCount)}명
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          m: theme.spacing(1, 0, 0, 0),
          width: 52,
        }}
      >
        <img src="/logos/star.png" style={{ width: "auto", height: 14 }} />
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            color: youhaBlue[700],
            fontWeight: "700",
          }}
        >
          {(8 + 0.12 * (10 - ((ranking ?? 0) + 1))).toFixed(1)}
        </Typography>
      </Stack>
    </ButtonBase>
  );
}
