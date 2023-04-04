import { Box, Dialog, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  bookmarksDialogRecoilState,
  bookmarksDefaultProps,
  BookmarksProps,
  bookmarksRecoilState,
  newBookmarkDialogRecoilState,
} from "../../constants/recoils";
import youhaGrey from "../../constants/youhaGrey";
import { theme } from "../../themes/theme";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import PageHeader from "./PageHeader";

export default function NewBookmarkDialog() {
  const [bookmarksDialog, setBookmarksDialog] = useRecoilState(
    bookmarksDialogRecoilState
  );
  const [newBookmarkDialog, setNewBookmarkDialog] = useRecoilState(
    newBookmarkDialogRecoilState
  );
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksRecoilState);
  const [tempBookmarks, setTempBookmarks] = useState<BookmarksProps>(
    bookmarksDefaultProps
  );
  const { open, type } = newBookmarkDialog;
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDiscriptionValue] = useState<string>("");
  const onChangeTitleValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitleValue(value);
  };
  const onChangeDiscriptionValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDiscriptionValue(value);
  };
  const disabled = titleValue === "" || descriptionValue === "";
  const onClose = () => {
    setBookmarksDialog((prev) => {
      const temp = prev.state === "temp";
      return {
        ...prev,
        open: temp ? true : false,
        state: undefined,
      };
    });
    setNewBookmarkDialog((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const onClickConfirm = () => {
    setBookmarks((prev) => {
      return {
        ...prev,
        [type]: [
          ...prev[type],
          {
            id: `${prev[type].length + 1}`,
            title: titleValue,
            description: descriptionValue,
            list: [],
          },
        ],
      };
    });
    onClose();
  };
  useEffect(() => {
    setTitleValue("");
    setDiscriptionValue("");
  }, [open]);
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        zIndex: 99999,
        "& .MuiBackdrop-root": {
          backgroundColor: `rgba(0, 0, 0, 0.8)`,
        },
        "@media(max-width: 480px)": {
          "& > *": {
            transition: "none !important",
          },
          "& .MuiDialog-paper": {
            width: "100%",
            transition: "none",
            maxWidth: "initial",
            height: "100vh",
            maxHeight: "initial",
            borderRadius: 0,
            m: 0,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 360,
          "@media(max-width: 480px)": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <PageHeader
          onClose={onClose}
          title={`${
            type === "youtuber"
              ? "유튜버"
              : type === "video"
              ? "동영상"
              : "쇼츠"
          } 리스트 추가`}
        />
        <Stack
          spacing={2}
          sx={{
            flex: 1,
            p: theme.spacing(2),
          }}
        >
          <Input
            label="리스트 이름"
            inputValue={titleValue}
            onChange={onChangeTitleValue}
            essential
            placeholder="20자 이내"
            maxLength={20}
          />
          <Input
            label="상세설명"
            inputValue={descriptionValue}
            onChange={onChangeDiscriptionValue}
            multiline
            placeholder="메모를 남겨주세요"
            maxLength={50}
          />
        </Stack>
        <Box
          sx={{
            p: theme.spacing(2),
          }}
        >
          <Button
            size="lg"
            disabled={disabled}
            fullWidth
            onClick={onClickConfirm}
            backgroundColor={youhaGrey[900]}
          >
            완료
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
