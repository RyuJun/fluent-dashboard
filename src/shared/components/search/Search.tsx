/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Callout, DirectionalHint, loadTheme } from '@fluentui/react';
import { MAX_RECENT_SEARCH_COUNT, calloutStyles, searchBoxStyles, searchListStyles } from './search.constants';

import { AutoComplete } from 'utils/functions/auto-complete';
import { ISearchCompProps } from './search.types';
import { Icon } from '@fluentui/react/lib/Icon';
import { RenderCalloutContent } from 'shared/layout/aside';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import deepCopy from 'utils/functions/deep-copy';
import { menuState } from 'shared/context/menu.recoil';
import useClickOutside from 'shared/hooks/useClickOutside';
import useGetThemePalette from 'shared/hooks/useGetThemePalette';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

export const Search = ({ setVisible }: ISearchCompProps): React.ReactElement => {
  const { t } = useTranslation(['help', 'menu', 'common'], { useSuspense: false });
  const searchWrapperRef = React.useRef(null);
  const searchRef = React.useRef(null);
  const menuRecoil = useRecoilValue(menuState);
  const history = useHistory();

  const [searchPageData, setSearchPageData] = React.useState([]);
  const [searchHelpData, setSearchHelpData] = React.useState([]);
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
    const searchData = [];
    const helpData = [];
    menuRecoil.forEach((firstDepth) => {
      firstDepth.help_path &&
        helpData.push({ name: t(`help:${firstDepth.name_code}`), help_path: firstDepth.help_path });
      if (!firstDepth.views) {
        searchData.push({
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
            searchData.push({
              name: t(`menu:${secondDeps.name_code}`),
              position: `${t(`menu:${firstDepth.name_code}`)} >`,
              name_code: secondDeps.name_code,
              path: secondDeps.path,
              help_path: secondDeps.help_path,
              tabs: secondDeps.tabs,
            });
          } else {
            secondDeps.tabs.forEach((tab) => {
              searchData.push({
                name: t(`menu:${tab.name_code}`),
                position: `${t(`menu:${firstDepth.name_code}`)} > ${t(`menu:${secondDeps.name_code}`)} >`,
                name_code: tab.name_code,
                path: tab.path,
              });
            });
          }
        });
      }
    });
    setSearchHelpData(helpData);
    setSearchPageData(searchData);
  }, []);

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
    <div
      ref={searchWrapperRef}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        background: 'inherit',
      }}
    >
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
          setInputSearchPageList(searchPageList);
          setInputSearchHelpList(searchHelpList);
        }}
        onClear={() => setVisible(false)}
        onEscape={() => setVisible(false)}
      />
      <div
        style={{
          background: theme ? theme.customColorsSet.searchListColor : 'white',
          maxHeight: 500,
          zIndex: 1,
          overflowY: 'auto',
          boxShadow: '0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)',
        }}
        className="custom-scrollbar"
      >
        <ul>
          <li className={searchListStyles.searchTitle}>{t('common:page')}</li>
          {inputSearchPageList.length ? (
            inputSearchPageList.map((item, i) => {
              return (
                <li key={`${String(item.name_code)}_${i}`} className={searchListStyles.searchListWrapper}>
                  <div className={searchListStyles.searchListLeft}>
                    <Icon iconName="Search" />
                    <span style={{ opacity: 0.6 }}>{item.position}</span>
                  </div>
                  <div className={searchListStyles.searchListRight}>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.name }}
                      onClick={() => handleOnClickList(item, false)}
                    />
                    {item.help_path && (
                      <Icon
                        id={`${String(item.name_code.replace('.', ''))}_search`}
                        iconName="Info"
                        style={{ marginTop: 3 }}
                        onClick={() => {
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
            })
          ) : (
            <>
              {inputValue.length ? (
                <li className={searchListStyles.searchListWrapper}>
                  {t('common:no-search-result', { value: inputValue })}
                </li>
              ) : null}
            </>
          )}
        </ul>
        <ul>
          <li className={searchListStyles.searchTitle}>{t('common:help')}</li>
          {inputSearchHelpList.length ? (
            inputSearchHelpList.map((item, i) => {
              return (
                <li key={`${String(item.name_code)}_${i}`} className={searchListStyles.searchListWrapper}>
                  <div className={searchListStyles.searchListLeft}>
                    <Icon iconName="Info" />
                    <div dangerouslySetInnerHTML={{ __html: item.name }} />
                  </div>
                </li>
              );
            })
          ) : (
            <>
              {inputValue.length ? (
                <li className={searchListStyles.searchListWrapper}>
                  {t('common:no-search-result', { value: inputValue })}
                </li>
              ) : null}
            </>
          )}
        </ul>
        <ul>
          <li className={searchListStyles.searchTitle}>{t('common:recent')}</li>
          {inputSearchRecentList.length ? (
            inputSearchRecentList.map((item, i) => {
              return (
                <li key={`${String(item.name_code)}_${i}`} className={searchListStyles.searchListWrapper}>
                  <div className={searchListStyles.searchListLeft}>
                    <Icon iconName="Recent" />
                    <span style={{ opacity: 0.6 }}>{item.position}</span>
                  </div>
                  <div className={searchListStyles.searchListRight}>
                    <div
                      dangerouslySetInnerHTML={{ __html: t(`menu:${String(item.name_code)}`) }}
                      onClick={() => handleOnClickList(item, true)}
                    />
                  </div>
                </li>
              );
            })
          ) : (
            <li className={searchListStyles.searchListWrapper}>{t('common:no-recent-search-history')}</li>
          )}
        </ul>
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
