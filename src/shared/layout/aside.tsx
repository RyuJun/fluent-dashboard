import * as React from 'react';

import { AnimationStyles, Callout, Text } from '@fluentui/react';
import { DirectionalHint, ICalloutContentStyles, mergeStyleSets } from '@fluentui/react';
import { ITabs, IinitialMenu, menuState } from 'shared/context/menu.recoil';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { SideBarWrapper, SideItemMenu, SideSubMenu } from 'shared/components/sidebar';
import { ejectNowMenuData, menuChange } from 'utils/functions/menu';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Icon } from '@fluentui/react/lib/Icon';
import { settingsState } from 'shared/context/settings.recoil';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import useWindowSize from 'shared/hooks/useWindowSize';

interface IHelpCalloutContent {
  selectTarget: {
    name_code: string;
    path: string;
    help_path?: string;
    tabs?: ITabs[];
  };
  setClose?: (boolean) => void;
}
const getIcon = (iconName: string) => <Icon iconName={iconName} />;

const asideStyle = {
  ...AnimationStyles.fadeIn500,
};

const customCalloutStyles = mergeStyleSets({
  customCalloutWrapper: {
    boxShadow: 'none',
  },
  customCalloutInner: {
    padding: '17px 15px',
  },
  customCalloutTitle: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 10,
    gap: 10,
  },
  customCalloutContent: {
    gap: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  customCalloutDetailPath: {
    color: '#5299F3',
    cursor: 'pointer',
  },
  customCalloutSubPath: {
    color: '#5299F3',
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
  },
  customCalloutSubPathItems: {
    gap: 10,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  customCalloutIconStartActive: { cursor: 'pointer', color: '#FFC80A' },
  customCalloutIconStart: { cursor: 'pointer' },
});

export const RenderCalloutContent: React.FC<IHelpCalloutContent> = ({ selectTarget }) => {
  const { t } = useTranslation(['common', 'menu', 'help'], { useSuspense: false });
  const history = useHistory();

  const handleOnSubPathMove = (path: string) => history.push(`/admin${path}`) as void;

  return (
    <div className={customCalloutStyles.customCalloutWrapper}>
      <div className={customCalloutStyles.customCalloutInner}>
        <div className={customCalloutStyles.customCalloutTitle}>{t(`menu:${selectTarget.name_code}`)}</div>
        <div className={customCalloutStyles.customCalloutContent}>
          {/* {isHelpStatus[`${i18n.language === 'ko' ? '' : `${i18n.language}_`}content`]} */}
          {selectTarget.help_path && String(t(`help:${selectTarget.name_code}`))}

          <div
            className={customCalloutStyles.customCalloutDetailPath}
            data-path={selectTarget.help_path && selectTarget.help_path}
          >
            {selectTarget.help_path && t('common:view-detail')}
          </div>

          <div className={customCalloutStyles.customCalloutSubPath}>
            {selectTarget.tabs &&
              selectTarget.tabs.map((tab) => (
                <div
                  key={`${tab.name_code}_${tab.path}`}
                  className={customCalloutStyles.customCalloutSubPathItems}
                  onClick={() => {
                    handleOnSubPathMove(tab.path);
                  }}
                >
                  <Icon iconName="CirclePlus"></Icon>
                  <div>{t(`menu:${String(tab.name_code)}`)}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const calloutStyles: Partial<ICalloutContentStyles> = {
  calloutMain: {
    border: '1px solid #97979759',
    borderRadius: 'none',
  },
  root: { paddingLeft: 24, boxShadow: 'none' },
};

const Aside = (): React.ReactElement => {
  const { t, i18n } = useTranslation(['menu', 'common']);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, height, device] = useWindowSize();
  const match = useRouteMatch();
  const location = useLocation().pathname.replace('/admin', '');
  const settings = useRecoilValue(settingsState);
  const [menu, setMenu] = useRecoilState(menuState);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedFixed, setCollapsedFixed] = React.useState(false);
  const [linkClick, setLinkClick] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(true);

  const [calloutTarget, setCalloutTarget] = React.useState(null);
  const [isCalloutVisible, setIsCalloutVisible] = React.useState(false);

  React.useEffect(() => {
    setCollapsed(device !== 'big');
    setCollapsedFixed(device !== 'big');
  }, [device]);

  React.useEffect(() => {
    const now = ejectNowMenuData(menu, 'location', location) as IinitialMenu;
    setMenu(menuChange(true, now));
  }, [location]);

  const handleOnClick = (e, item, depth?) => {
    const thisTarget = e.currentTarget;
    setLinkClick(depth);
    setFirstLoad(false);
    setMenu(menuChange(depth, item));
    if (depth === 3) thisTarget.parentNode.previousSibling.classList.toggle('open', false);
  };

  return (
    <aside
      onMouseEnter={() => {
        if (collapsedFixed) {
          setCollapsed(false);
        }
      }}
      onMouseLeave={() => {
        if (collapsedFixed) {
          setCollapsed(true);
        }
      }}
    >
      <div
        className="logo-wrapper"
        style={{
          justifyContent: collapsed ? 'center' : 'flex-start',
          marginLeft: collapsed ? '4px' : '13px',
          marginRight: collapsed ? '4px' : '10px',
        }}
      >
        {!collapsed && (
          <>
            <Text>Fluent Dashboard</Text>
            <Icon
              iconName={collapsedFixed ? 'Unpin' : 'Pin'}
              onClick={() => {
                setCollapsedFixed(!collapsedFixed);
              }}
            />
          </>
        )}
      </div>
      <SideBarWrapper
        collapsed={collapsed}
        className={`${settings.theme} ${collapsed ? 'collapsed' : ''} custom-scrollbar`}
        wrapperStyle={{
          ...asideStyle,
        }}
      >
        {menu.map((firstDeps) =>
          !firstDeps.views ? (
            <Link
              to={`${String(match.path)}${String(firstDeps.path) ? String(firstDeps.path) : ''}`}
              key={`firstDeps_${String(firstDeps.name_code)}`}
              onClick={(e) => {
                handleOnClick(e, firstDeps, 1);
              }}
              id={firstDeps.name_code.replace('.', '')}
              onMouseEnter={() => {
                setIsCalloutVisible(true);
                setCalloutTarget({
                  id: firstDeps.name_code.replace('.', ''),
                  selectTarget: firstDeps,
                });
              }}
            >
              <SideItemMenu
                icon={getIcon(firstDeps.icon)}
                title={t(`${firstDeps.name_code}`)}
                active={firstDeps.active}
              />
            </Link>
          ) : (
            <SideSubMenu
              key={`firstDeps_${String(firstDeps.name_code)}`}
              icon={getIcon(firstDeps.icon)}
              title={t(`${firstDeps.name_code}`)}
              active={firstDeps.active}
              depth={2}
              collapsed={collapsed}
              linkClick={linkClick}
              firstLoad={firstLoad}
              onClick={(e) => {
                handleOnClick(e, firstDeps);
              }}
            >
              {firstDeps.views.map((secondDeps) => (
                <Link
                  to={`${String(match.path)}${String(secondDeps.path) ? String(secondDeps.path) : ''}`}
                  key={`secondDeps_${String(secondDeps.name_code)}`}
                  onClick={(e) => {
                    handleOnClick(e, secondDeps, 2);
                  }}
                  id={secondDeps.name_code.replace('.', '')}
                  onMouseEnter={() => {
                    setIsCalloutVisible(true);
                    setCalloutTarget({
                      id: secondDeps.name_code.replace('.', ''),
                      selectTarget: secondDeps,
                    });
                  }}
                >
                  <SideItemMenu title={t(`${secondDeps.name_code}`)} active={secondDeps.active} />
                </Link>
              ))}
            </SideSubMenu>
          )
        )}
      </SideBarWrapper>

      {isCalloutVisible && (
        <Callout
          target={`#${String(calloutTarget.id)}`}
          onDismiss={() => setIsCalloutVisible(false)}
          onMouseLeave={() => setIsCalloutVisible(false)}
          setInitialFocus
          styles={calloutStyles}
          directionalHint={DirectionalHint.rightTopEdge}
          calloutMinWidth={300}
          calloutMaxWidth={350}
          isBeakVisible={false}
        >
          {<RenderCalloutContent selectTarget={calloutTarget.selectTarget} />}
        </Callout>
      )}
    </aside>
  );
};

export default Aside;
