import { atom } from "recoil";

export const loginRecoilState = atom({
  key: "loginRecoilState",
  default: false,
});

export type BookmarkProps = {
  id: string;
  title: string;
  description: string;
  list: any[];
};
export type BookmarksProps = {
  [key: string]: BookmarkProps[];
};

export const bookmarksDefaultProps = {
  youtuber: [],
  video: [],
  shorts: [],
};

export const bookmarksRecoilState = atom<BookmarksProps>({
  key: `bookmarkRecoilState`,
  default: bookmarksDefaultProps,
});

//다이얼로그

export type BookmarskDialogProps = {
  open: boolean;
  type: string;
  state?: string;
  item?: any;
};

export const bookmarksDialogRecoilState = atom<BookmarskDialogProps>({
  key: "bookmarksDialogRecoilState",
  default: {
    open: false,
    type: "youtuber",
  },
});

export const newBookmarkDialogRecoilState = atom({
  key: "newBookmarkDialogRecoilState",
  default: {
    open: false,
    type: "youtuber",
  },
});

export const firstLoginDialogRecoilState = atom({
  key: "firstLoginDialogRecoilState",
  default: {
    open: false,
  },
});
