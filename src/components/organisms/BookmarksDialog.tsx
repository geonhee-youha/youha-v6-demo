import {
  alpha,
  Box,
  ButtonBase,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  bookmarksDialogRecoilState,
  bookmarksRecoilState,
  newBookmarkDialogRecoilState,
} from "../../constants/recoils";
import youhaBlue from "../../constants/youhaBlue";
import youhaGrey from "../../constants/youhaGrey";
import { testCreators, testVideos } from "../../data";
import { theme } from "../../themes/theme";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Typo from "../atoms/Typo";
import PageHeader from "./PageHeader";

export default function BookmarskDialog() {
  const [bookmarksDialog, setBookmarksDialog] = useRecoilState(
    bookmarksDialogRecoilState
  );
  const [newBookmarkDialog, setNewBookmarkDialog] = useRecoilState(
    newBookmarkDialogRecoilState
  );
  const [bookmarks, setBookmarks] = useRecoilState(bookmarksRecoilState);
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [removeBookmarkIds, setRemoveBookmarkIds] = useState<string[]>([]);
  const { open, type, item: queryItem } = bookmarksDialog;
  const disabled = bookmarkIds.length === 0 && removeBookmarkIds.length === 0;
  const onClose = () => {
    setBookmarksDialog((prev) => {
      return {
        open: false,
        type: prev.type,
      };
    });
  };
  const onClickNewBookmark = () => {
    setBookmarksDialog((prev) => {
      return {
        ...prev,
        open: false,
        state: "temp",
      };
    });
    setNewBookmarkDialog((prev) => {
      return {
        ...prev,
        open: true,
        type: type,
      };
    });
  };
  const onCilckConfirm = () => {
    onClose();
    setBookmarks((prev) => {
      let newPrev = _.cloneDeep(prev);
      let targetType = newPrev[type];
      for (let i = 0; i < targetType.length; i++) {
        let target = targetType[i];
        if (bookmarkIds.includes(target.id)) {
          target.list = [...target.list, queryItem.id];
        }
        if (removeBookmarkIds.includes(target.id)) {
          target.list = _.filter(target.list, (el) => el !== queryItem.id);
        }
      }
      return newPrev;
    });
  };
  useEffect(() => {
    setBookmarkIds([]);
    setRemoveBookmarkIds([]);
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
            maxWidth: 'initial',
            height: '100vh',
            maxHeight: 'initial',
            borderRadius: 0,
            m: 0,
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 360,
          "@media(max-width: 480px)": {
            width: "100%",
            height: '100%'
          },
        }}
      >
        <PageHeader onClose={onClose} title="북마크 관리" />
        <Box
          sx={{
            flex: 1,
            p: theme.spacing(1, 2),
            height: 200,
            overflowY: "scroll",
          }}
        >
          <ButtonBase
            sx={{
              width: "100%",
              alignItems: "center",
              p: theme.spacing(1, 0),
            }}
            disableRipple
            onClick={onClickNewBookmark}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${youhaGrey[200]}`,
                m: theme.spacing(0, 1.5, 0, 0),
              }}
            >
              <Icon size={20} prefix="fal" name="plus" color={youhaGrey[300]} />
            </Box>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: youhaGrey[700],
              }}
            >
              새{" "}
              {type === "youtuber"
                ? "유튜버"
                : type === "video"
                ? "동영상"
                : "쇼츠"}{" "}
              리스트 만들기
            </Typography>
          </ButtonBase>
          {bookmarks[type].map((item, index) => {
            const { id, title, list } = item;
            const contained = queryItem && list.includes(queryItem.id);
            const selected =
              bookmarkIds.includes(id) ||
              (contained && !removeBookmarkIds.includes(id));
            const onClick = () => {
              if (contained) {
                setRemoveBookmarkIds((prev) => {
                  let newPrev = _.cloneDeep(prev);
                  let focused = newPrev.includes(id);
                  if (focused) {
                    newPrev = _.filter(newPrev, (el) => el !== id);
                  } else {
                    newPrev = [...newPrev, id];
                  }
                  return newPrev;
                });
              } else {
                setBookmarkIds((prev) => {
                  let newPrev = _.cloneDeep(prev);
                  let focused = newPrev.includes(id);
                  if (focused) {
                    newPrev = _.filter(newPrev, (el) => el !== id);
                  } else {
                    newPrev = [...newPrev, id];
                  }
                  return newPrev;
                });
              }
            };
            const onClickDetail = (e: any) => {
              e.preventDefault();
              onClose();
            };
            return (
              <ButtonBase
                key={index}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  p: theme.spacing(1, 0),
                }}
                disableRipple
                onClick={onClick}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: `1px solid ${youhaGrey[500]}`,
                    "& img": {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                >
                  {list.length > 0 ? (
                    <img
                      src={
                        type === "youtuber"
                          ? testCreators[
                              _.findIndex(
                                testCreators,
                                (el) => el.id === list[list.length - 1]
                              )
                            ].thumbnail
                          : testVideos[
                              _.findIndex(
                                testVideos,
                                (el) => el.id === list[list.length - 1]
                              )
                            ].thumbnail
                      }
                    />
                  ) : (
                    <Icon
                      size={20}
                      prefix="fal"
                      name="bookmark"
                      color={youhaGrey[600]}
                    />
                  )}

                  {selected && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // border: `1px solid ${youhaBlue[500]}`,
                        backgroundColor: alpha(youhaBlue[500], 0.7),
                      }}
                    >
                      <Icon
                        size={20}
                        prefix="fas"
                        name="check"
                        color="#ffffff"
                      />
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: theme.spacing(0, 1.5),
                  }}
                >
                  <Typo
                    lines={1}
                    sx={{
                      fontSize: 14,
                      lineHeight: "20px",
                      color: youhaGrey[900],
                    }}
                  >
                    {title}
                  </Typo>
                </Box>
                <ButtonBase
                  sx={{
                    m: theme.spacing(0.5, 0, 0, 0),
                    alignItems: "center",
                  }}
                  disableRipple
                  onClick={onClickDetail}
                >
                  <Icon
                    size={20}
                    prefix="fal"
                    name="chevron-right"
                    sx={{
                      m: theme.spacing(0, 0, 0, 0.25),
                      color: youhaGrey[300],
                    }}
                  />
                </ButtonBase>
              </ButtonBase>
            );
          })}
        </Box>
        <Stack
          spacing={1}
          sx={{
            p: theme.spacing(2),
          }}
        >
          <Button
            size="lg"
            disabled={disabled}
            fullWidth
            onClick={onCilckConfirm}
            backgroundColor={youhaGrey[900]}
          >
            적용하기
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
