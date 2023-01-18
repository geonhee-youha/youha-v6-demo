import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { maxWidth } from "../../constants";
import { theme } from "../../themes/theme";
import Icon from "../atoms/Icon";

export default function BackHeader({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
      }}
    >
      <Box
        sx={{
          height: 56,
          maxWidth: maxWidth,
          display: "flex",
          alignItems: "center",
          p: theme.spacing(0, 2),
          m: theme.spacing(0, "auto"),
        }}
      >
        {children ?? (
          <IconButton onClick={onClickBack}>
            <Icon name="chevron-left" color="#ffffff" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
