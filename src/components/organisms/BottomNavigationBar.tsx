import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Box, ButtonBase, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import youhaBlue from "../../constants/youhaBlue";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";

const bottomTabList: { href: string; title: string; iconName: IconName }[] = [
  { href: "/", title: "홈", iconName: "home-lg-alt" },
  { href: "/insight", title: "인사이트", iconName: "lightbulb-exclamation" },
  { href: "/category", title: "카테고리", iconName: "bars" },
  { href: "/mcn", title: "MCN", iconName: "building" },
  { href: "/mypage", title: "마이페이지", iconName: "user" },
];
export default function BottomNavigationBar() {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: `#ffffff`,
        display: "none",
        "@media(max-width: 480px)": {
          display: "flex",
        },
        boxShadow: `rgba(0, 0, 0, 0.12) -8px 0px 16px 0px`,
      }}
    >
      {bottomTabList.map((item, index) => {
        const { href, title, iconName } = item;
        const focused = pathName === href;
        const color = focused ? youhaBlue[500] : grey[900];
        const onClick = () => {
          router.push(href);
        };
        return (
          <ButtonBase
            key={index}
            sx={{
              height: 56,
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={onClick}
          >
            <Icon
              prefix={focused ? "fad" : "far"}
              name={iconName}
              color={color}
              size={24}
            />
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: "16px",
                fontWeight: "700",
                m: theme.spacing(0.25, 0, 0, 0),
                color: color,
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
