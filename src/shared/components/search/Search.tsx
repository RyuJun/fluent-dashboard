/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Callout, DirectionalHint } from '@fluentui/react';
import { ISearchCompProps, ISearchHelpDataProps, ISearchHelpPageProps } from './search.types';
import { MAX_RECENT_SEARCH_COUNT, calloutStyles, searchBoxStyles, searchListStyles } from './search.constants';

import { AutoComplete } from 'utils/functions/auto-complete';
import { Icon } from '@fluentui/react/lib/Icon';
import { RenderCalloutContent } from 'shared/components/aisde/aside';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import deepCopy from 'utils/functions/deep-copy';
import { menuState } from 'shared/context/menu.recoil';
import useClickOutside from 'shared/hooks/useClickOutside';
import useGetThemePalette from 'shared/hooks/useGetThemePalette';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

export const Search = ({ setVisible }: ISearchCompProps): React.ReactElement => {
  const { t } = useTranslation(['help', 'menu', 'common']);
  const searchWrapperRef = React.useRef(null);
  const scrollBarRef = React.useRef(null);
  const searchRef = React.useRef(null);
  const menuRecoil = useRecoilValue(menuState);
  const history = useHistory();

  const [searchPageData, setSearchPageData] = React.useState<ISearchHelpPageProps[]>([]);
  const [searchHelpData, setSearchHelpData] = React.useState<ISearchHelpDataProps[]>([]);
  const [inputSearchPageList, setInputSearchPageList] = React.useState([]);
  const [inputSearchHelpList, setInputSearchHelpList] = React.useState([]);
  const [inputSearchRecentList, setInputSearchRecentList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const theme = useGetThemePalette();

  const [calloutTarget, setCalloutTarget] = React.useState(null);
  const [isCalloutVisible, setIsCalloutVisible] = React.useState(false);

  useClickOutside(searchWrapperRef, () => {
    setVisible(false);
  });

  React.useEffect(() => {
    const recentStorage = JSON.parse(localStorage.getItem('recent'));
    if (!recentStorage) localStorage.setItem('recent', JSON.stringify({ list: [] }));
    setInputSearchRecentList(recentStorage ? recentStorage.list : []);
    const pageData: ISearchHelpPageProps[] = [];
    const helpData: ISearchHelpDataProps[] = [];

    menuRecoil.forEach((firstDepth) => {
      firstDepth.help_path &&
        helpData.push({ name: t(`help:${firstDepth.name_code}`), help_path: firstDepth.help_path });
      if (!firstDepth.views) {
        pageData.push({
          name: t(`menu:${firstDepth.name_code}`),
          name_code: firstDepth.name_code,
          path: firstDepth.path,
          help_path: firstDepth.help_path,
          tabs: firstDepth.tabs,
        });
      } else {
        firstDepth.views.forEach((secondDeps) => {
          secondDeps.help_path &&
            helpData.push({ name: t(`help:${secondDeps.name_code}`), help_path: secondDeps.help_path });
          if (!secondDeps.tabs) {
            pageData.push({
              name: t(`menu:${secondDeps.name_code}`),
              position: [firstDepth.name_code],
              name_code: secondDeps.name_code,
              path: secondDeps.path,
              help_path: secondDeps.help_path,
              tabs: secondDeps.tabs,
            });
          } else {
            secondDeps.tabs.forEach((tab) => {
              pageData.push({
                name: t(`menu:${tab.name_code}`),
                position: [firstDepth.name_code, secondDeps.name_code],
                name_code: tab.name_code,
                path: tab.path,
              });
            });
          }
        });
      }
    });
    setSearchPageData(pageData);
    setSearchHelpData(helpData);
    searchRef.current.querySelector('input').focus();
  }, []);

  const handleSearchKeyUp = (e) => {
    return;
    const searchElements = searchRef.current.nextSibling.children;
    const searchList = [];
    Array.from(searchElements).forEach((element: HTMLBaseElement) => {
      element.tagName === 'UL' && Array.from(element.children).forEach((item) => searchList.push(item));
    });
    switch (e.keyCode) {
      case 38: {
        // up
        const index = searchList.findIndex((item) => item.classList.contains('active'));
        if (index !== 0) {
          searchList[index].classList.remove('active');
          searchList[index - 1].classList.add('active');
          searchList[index - 1].scrollIntoView();
        } else {
          scrollBarRef.current.scrollTop = 0;
        }
        break;
      }
      case 40: {
        // down
        const index = searchList.findIndex((item) => item.classList.contains('active'));
        if (searchList.length - 1 !== index) {
          searchList[index].classList.remove('active');
          searchList[index + 1].classList.add('active');
          searchList[index + 1].scrollIntoView();
        }
        break;
      }
      case 13: {
        // enter
        const index = searchList.findIndex((item) => item.classList.contains('active'));
        const nameCode = searchList[index].getAttribute('data-name-code');
        if (nameCode) {
          const pick = inputSearchPageList.filter((page) => page.name_code === nameCode)[0];
          handleOnClickList(pick, false);
        } else {
          clearSearchInput();
          history.push(`/admin${String(searchList[index].getAttribute('data-path'))}`);
        }
        break;
      }
      case 27: // esc
        break;
      case 119: // f8
        break;
      default:
        return null;
    }
  };
  const clearSearchInput = () => {
    setInputValue('');
    setVisible(false);
  };
  const handleOnClickList = (pickMenu, recent) => {
    if (!recent) {
      const recentStorage = JSON.parse(localStorage.getItem('recent'));
      const check = recentStorage.list.filter((item) => item.name_code === pickMenu.name_code);

      if (!check.length) {
        recentStorage.list.splice(0, 0, {
          name_code: pickMenu.name_code,
          path: pickMenu.path,
          position: pickMenu.position,
        });
      } else {
        recentStorage.list = recentStorage.list.filter((item) => item.name_code !== pickMenu.name_code);
        recentStorage.list.splice(0, 0, {
          name_code: pickMenu.name_code,
          path: pickMenu.path,
          position: pickMenu.position,
        });
      }
      const newRecentStorage = recentStorage.list;
      if (newRecentStorage.length > MAX_RECENT_SEARCH_COUNT) {
        newRecentStorage.pop();
      }
      recentStorage.list = newRecentStorage;

      localStorage.setItem('recent', JSON.stringify(recentStorage));
    }
    clearSearchInput();
    history.push(`/admin${String(pickMenu.path)}`);
  };

  return (
    <div ref={searchWrapperRef} className={`${searchListStyles.searchWrapper}`}>
      <SearchBox
        styles={searchBoxStyles}
        placeholder="Search"
        ref={searchRef}
        autoComplete="off"
        value={inputValue}
        onChange={(_, newValue) => {
          const searchPageList: any = new AutoComplete(
            searchRef.current.querySelector('input'),
            deepCopy(searchPageData),
            true
          );

          const searchHelpList: any = new AutoComplete(
            searchRef.current.querySelector('input'),
            deepCopy(searchHelpData),
            true
          );

          setInputValue(newValue);

          if (searchPageList.length) {
            searchPageList[0].active = true;
          } else {
            if (searchHelpList.length) {
              searchHelpList[0].active = true;
            }
          }

          setInputSearchPageList(searchPageList);
          setInputSearchHelpList(searchHelpList);
        }}
        onClear={() => setVisible(false)}
        onEscape={() => setVisible(false)}
        onKeyUp={handleSearchKeyUp}
      />
      <div
        style={{ background: theme.customColorsSet.searchListColor }}
        ref={scrollBarRef}
        className={`${searchListStyles.searchScrollWrapper} custom-scrollbar`}
      >
        <div className={searchListStyles.searchTitle}>{t('common:page')}</div>
        {inputSearchPageList.length ? (
          <ul>
            {inputSearchPageList.map((item, i) => {
              return (
                <li
                  key={`${String(item.name_code)}_${i}`}
                  className={`${String(theme.config.theme)} ${searchListStyles.searchListWrapper} ${
                    i === 0 ? 'active' : ''
                  }`}
                  onClick={() => handleOnClickList(item, false)}
                  data-path={item.path}
                  data-name-code={item.name_code}
                >
                  <div className={searchListStyles.searchListLeft}>
                    <Icon iconName="Search" />
                    <span style={{ opacity: 0.6 }}>
                      {item.position && item.position.map((posi) => `${t(`menu:${String(posi)}`)} > `)}
                    </span>
                  </div>
                  <div className={searchListStyles.searchListRight}>
                    <div dangerouslySetInnerHTML={{ __html: item.name }} />
                    {item.help_path && (
                      <Icon
                        id={`${String(item.name_code.replace('.', ''))}_search`}
                        iconName="Info"
                        style={{ marginTop: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCalloutVisible(true);
                          setCalloutTarget({
                            id: `${String(item.name_code.replace('.', ''))}_search`,
                            selectTarget: item,
                          });
                        }}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            {inputValue.length ? (
              <div className={searchListStyles.searchListWrapper}>
                {t('common:no-search-result', { value: inputValue })}
              </div>
            ) : null}
          </>
        )}
        <div className={searchListStyles.searchTitle}>{t('common:help')}</div>
        {inputSearchHelpList.length ? (
          <ul>
            {inputSearchHelpList.map((item, i) => {
              return (
                <li
                  key={`${String(item.name_code)}_${i}`}
                  className={`${String(theme.config.theme)} ${searchListStyles.searchListWrapper} ${
                    !inputSearchPageList.length && i === 0 ? 'active' : ''
                  }`}
                  data-path={item.help_path}
                >
                  <div className={searchListStyles.searchListLeft}>
                    <Icon iconName="Info" />
                    <div dangerouslySetInnerHTML={{ __html: item.name }} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            {inputValue.length ? (
              <div className={searchListStyles.searchListWrapper}>
                {t('common:no-search-result', { value: inputValue })}
              </div>
            ) : null}
          </>
        )}

        <div className={searchListStyles.searchTitle}>{t('common:recent')}</div>
        {inputSearchRecentList.length ? (
          <>
            {inputSearchRecentList.map((item, i) => {
              return (
                <div
                  key={`${String(item.name_code)}_${i}`}
                  className={`${String(theme.config.theme)} ${searchListStyles.searchListWrapper}`}
                >
                  <div className={searchListStyles.searchListLeft}>
                    <Icon iconName="Recent" />
                    <span style={{ opacity: 0.6 }}>
                      {item.position.map((posi) => `${t(`menu:${String(posi)}`)} > `)}
                    </span>
                  </div>
                  <div className={searchListStyles.searchListRight}>
                    <div
                      dangerouslySetInnerHTML={{ __html: t(`menu:${String(item.name_code)}`) }}
                      onClick={() => handleOnClickList(item, true)}
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className={searchListStyles.searchListWrapper}>{t('common:no-recent-search-history')}</div>
        )}
      </div>
      {isCalloutVisible && (
        <Callout
          target={`#${String(calloutTarget.id)}`}
          onDismiss={() => setIsCalloutVisible(false)}
          setInitialFocus
          styles={calloutStyles}
          directionalHint={DirectionalHint.bottomLeftEdge}
          calloutMinWidth={300}
          calloutMaxWidth={350}
          beakWidth={8}
        >
          {<RenderCalloutContent selectTarget={calloutTarget.selectTarget} />}
        </Callout>
      )}
    </div>
  );
};
