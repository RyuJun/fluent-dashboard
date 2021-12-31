import {
  AnimationStyles,
  Callout,
  CommandBar,
  DirectionalHint,
  IButtonStyles,
  ICalloutContentStyles,
  ICommandBarItemProps,
  ICommandBarStyles,
} from '@fluentui/react';

import React from 'react';
import { RenderCalloutContent } from 'shared/components/aisde/aside';
import { menuChange } from 'utils/functions/menu/';
import { menuState } from 'shared/context/menu.recoil';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';

const customCommandBarStyle: ICommandBarStyles = {
  root: {
    ...AnimationStyles.fadeIn500,
    alignItems: 'center',
  },
  primarySet: { gap: 20 },
};

const activeStyle: object = { borderBottom: '2px solid #2B90D9' };

const customButtonStyle: IButtonStyles = {
  root: { fontSize: 14 },
  rootFocused: activeStyle,
  rootExpanded: activeStyle,
  rootHovered: activeStyle,
  menuIcon: {},
  icon: {},
  label: {
    fontWeight: 400,
  },
};

const customSubButtonStyle = {
  padding: 10,
  width: '100%',
  cursor: 'pointer',
};

const calloutStyles: Partial<ICalloutContentStyles> = {
  calloutMain: {
    border: '1px solid #97979759',
    borderRadius: 'none',
  },
  root: {
    paddingLeft: 20,
    boxShadow: 'none',
  },
};

export const AsideTop: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation(['menu']);
  const history = useHistory();
  const [menu, setMenu] = useRecoilState(menuState);
  const [asideTopMenu, setAsideTopMenu] = React.useState([]);
  const [calloutTarget, setCalloutTarget] = React.useState(null);
  const [isCalloutVisible, setIsCalloutVisible] = React.useState(false);

  React.useEffect(() => {
    const convertAsideData: ICommandBarItemProps[] = menu.map((item) => {
      const subMenu = !item.views
        ? []
        : item.views.map((subItem) => ({
            key: subItem.name_code,
            onRender: () => {
              return (
                <div
                  id={subItem.name_code.replace('.', '')}
                  style={customSubButtonStyle}
                  onClick={() => {
                    setMenu(menuChange(true, subItem));
                    history.push(`/admin${subItem.path}`);
                  }}
                  onMouseEnter={() => {
                    setIsCalloutVisible(true);
                    setCalloutTarget({
                      id: subItem.name_code.replace('.', ''),
                      selectTarget: subItem,
                    });
                  }}
                >
                  {t(`menu:${subItem.name_code}`)}
                </div>
              );
            },
          }));

      return item.views
        ? {
            key: item.name_code,
            text: t(`menu:${item.name_code}`),
            iconProps: { iconName: item.icon },
            buttonStyles: customButtonStyle,
            subMenuProps: { items: subMenu },
          }
        : {
            key: item.name_code,
            text: t(`menu:${item.name_code}`),
            iconProps: { iconName: item.icon },
            buttonStyles: customButtonStyle,
            id: item.name_code.replace('.', ''),
            onClick: () => {
              setMenu(menuChange(true, item));
              history.push(`/admin${item.path}`);
            },
            onMouseEnter: () => {
              setIsCalloutVisible(true);
              setCalloutTarget({
                id: item.name_code.replace('.', ''),
                selectTarget: item,
              });
            },
          };
    });
    setAsideTopMenu(convertAsideData);
  }, [i18n.language]);

  return (
    <>
      <CommandBar items={asideTopMenu} className={`aside-top-wrapper`} styles={customCommandBarStyle} />
      {isCalloutVisible && (
        <Callout
          target={`#${String(calloutTarget.id)}`}
          onDismiss={() => setIsCalloutVisible(false)}
          onMouseLeave={() => setIsCalloutVisible(false)}
          setInitialFocus
          styles={calloutStyles}
          directionalHint={DirectionalHint.rightTopEdge}
          calloutMaxWidth={350}
          isBeakVisible={false}
        >
          {<RenderCalloutContent selectTarget={calloutTarget.selectTarget} />}
        </Callout>
      )}
    </>
  );
};

export default AsideTop;
