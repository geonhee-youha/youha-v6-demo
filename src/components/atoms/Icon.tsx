import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";
import { Badge, SxProps } from "@mui/material";
import { red } from "@mui/material/colors";
import { MouseEventHandler } from "react";
import youhaGrey from "../../constants/youhaGrey";

type IconProps = {
  name: IconName;
  prefix?: IconPrefix;
  badgeCount?: number;
  size?: any;
  padding?: number;
  className?: string;
  color?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  sx?: SxProps;
};

export default function Icon({
  name = "circle",
  prefix = "far",
  badgeCount,
  size = 24,
  padding = 2,
  className,
  color = youhaGrey[900],
  onClick,
  sx,
}: IconProps) {
  const icon: IconLookup = { prefix: prefix, iconName: name };
  const badgeInvisible = badgeCount === undefined;
  const badgeColor = red[400];
  return (
    <Badge
      max={999}
      invisible={badgeInvisible}
      badgeContent={badgeCount}
      variant="dot"
      overlap="circular"
      color="error"
      sx={{
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${size}px !important`,
        padding: `${padding}px !important`,
        fontSize: `${(size - 4) / 2}px !important`,
        transition: `all 0.35s ease`,
        ...sx,
        "& .MuiBadge-badge": {
          width: 12,
          height: 12,
          minWidth: 4,
          backgroundColor: badgeColor,
          border: `1px solid #ffffff`,
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: "700",
          borderRadius: "50%",
        },
      }}
      className={className}
    >
      <FontAwesomeIcon
        icon={icon}
        size="2x"
        className={className}
        onClick={onClick}
      />
    </Badge>
  );
}
