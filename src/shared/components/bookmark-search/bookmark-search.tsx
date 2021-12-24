import { IBookmark, IBookmarkItem, bookmarkChangeSelector, bookmarkState } from 'shared/context/bookmark.recoil';
import { IIconStyles, Icon } from '@fluentui/react/lib/Icon';
import { ITextFieldStyles, TextField } from '@fluentui/react/lib/TextField';
import { IinitialMenu, menuState } from 'shared/context/menu.recoil';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { AutoComplete } from 'utils/functions/auto-complete';
import React from 'react';
import deepCopy from 'utils/functions/deep-copy';
import { menuChange } from 'utils/functions/menu';
import { mergeStyleSets } from '@fluentui/react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

const bookmarkWrapperStyles = mergeStyleSets({
  wrapper: {
    minWidth: 196,
    padding: 11,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    height: 32,
    cursor: 'pointer',
    ':hover': {
      background: '#F3F2F1',
    },
  },
  listItemActive: {
    background: '#F3F2F1',
  },
});

const searchBoxStyles: Partial<ITextFieldStyles> = {
  root: { marginBottom: 12 },
  field: { padding: '2px 26px 2px 8px' },
};

const bookmarkIconStyles: Partial<IIconStyles> = {
  root: {
    position: 'relative',
    color: '#FFC80A',
    width: 32,
    height: 32,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};

interface IBookmarkSearch {
  toggle: () => void;
}
export const BookmarkSearch = ({ toggle }: IBookmarkSearch): React.ReactElement => {
  const { t } = useTranslation(['common', 'menu']);
  const history = useHistory();
  const bookmarkRecoil = useRecoilValue(bookmarkState) as IBookmark;
  const setBookmark = useSetRecoilState(bookmarkChangeSelector);
  const [bookmarkSearchData, setBookmarkSearchData] = React.useState({ list: [] });
  const [bookmarkSearchList, setBookmarkSearchList] = React.useState([]);
  const [_, setMenu] = useRecoilState(menuState);

  React.useEffect(() => {
    const bookmarkData = { list: [] };
    bookmarkRecoil.list.forEach((bookmark) => {
      bookmarkData.list.push({ ...bookmark, name: t(`menu:${bookmark.name_code}`) });
    });
    setBookmarkSearchData(bookmarkData);
    setBookmarkSearchList(bookmarkData.list);
  }, []);

  const handleOnBookmarkMove = (item) => {
    setMenu(menuChange(true, item));
    history.push(`/admin${String(item.path)}`);
  };

  return (
    <div className={bookmarkWrapperStyles.wrapper}>
      <TextField
        styles={searchBoxStyles}
        placeholder={`${t('common:search')}...`}
        autoComplete="off"
        onChange={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const searchBookmarkList: any = new AutoComplete(event.target, deepCopy(bookmarkSearchData.list), true);
          setBookmarkSearchList(searchBookmarkList.length ? searchBookmarkList : bookmarkSearchData.list);
        }}
      />
      <ul>
        {bookmarkSearchList.map((data: IinitialMenu) => (
          <li key={data.name_code} className={`${bookmarkWrapperStyles.listItem} `}>
            <Icon styles={bookmarkIconStyles} iconName="FavoriteStarFill" onClick={() => setBookmark(data)} />
            <div
              dangerouslySetInnerHTML={{ __html: t(`menu:${data.name_code}`) }}
              onClick={() => {
                handleOnBookmarkMove(data);
                toggle();
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
