import { atom, selector } from 'recoil';

import deepCopy from 'utils/functions/deep-copy';

export interface IBookmarkItem {
  name: string;
  en_name: string;
  name_code: string;
  path: string;
}
export interface IBookmark {
  list: IBookmarkItem[];
}
export const initialBookmark: IBookmark = {
  list: [],
};

const initialStorageSetting = () => {
  const storage: object = JSON.parse(localStorage.getItem('bookmark'));
  if (!storage) {
    localStorage.setItem('bookmark', JSON.stringify(initialBookmark));
    return initialBookmark;
  }
  return storage;
};

export const bookmarkState = atom({
  key: 'bookmark/bookmarkState',
  default: initialStorageSetting(),
});
export const bookmarkChangeSelector = selector({
  key: 'bookmark/bookmarkSelector',
  get: ({ get }) => get(bookmarkState),
  set: ({ set }, newBookmark: IBookmarkItem) => {
    set(bookmarkState, (prevBookmark: IBookmark) => {
      const newStorage: IBookmark = deepCopy(prevBookmark);
      const check = newStorage.list.filter((item) => item.name_code === newBookmark.name_code);
      if (!check.length) {
        newStorage.list.push(newBookmark);
      } else {
        newStorage.list = newStorage.list.filter((item) => item.name_code !== newBookmark.name_code);
      }
      localStorage.setItem('bookmark', JSON.stringify(newStorage));
      return newStorage;
    });
  },
});
