import { alpha, Box, Stack, Typography } from "@mui/material";
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
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        display: "flex",
        // p: theme.spacing(2, 0),
        // backgroundColor: grey[100],
        // borderRadius: 1,
        // overflow: "hidden",
        borderRadius: 1,
        overflow: "hidden",
        border: `1px solid ${grey[300]}`,
        boxShadow: `rgb(0 0 0 / 4%) 0px 2px 8px`,
        p: theme.spacing(2),
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
      {/* <Box
        sx={{
          position: "relative",
          width: 104,
          height: 104,
        //   overflow: "hidden",
        //   borderRadius: 1,
          transition: `all 0.35s ease`,
          "& img": {
            objectFit: "cover",
            width: "100%",
            height: "100%",
          },
          "&:after": {
            position: "absolute",
            content: "''",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: alpha("#000000", 0.02),
          },
        }}
      >
        <img src={thumbnail} />
      </Box> */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: "700",
          }}
        >
          뷰티/패션
        </Typography> */}
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
        {/* <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            m: theme.spacing(1, 0, 0, 0),
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
            8.6
          </Typography>
        </Stack> */}
      </Box>
      {/* <Box
        sx={{
          position: "relative",
          width: 72,
          height: 72,
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
      </Box> */}
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
    </Stack>
  );
}
