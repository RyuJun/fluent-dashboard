import * as React from 'react';

import { Icon } from '@fluentui/react/lib/Icon';

const getIcon = (iconName: string) => <Icon iconName={iconName} />;

type T_SideBarWrapper = {
  children: JSX.Element | JSX.Element[];
  wrapperStyle?: object;
  className?: string;
  collapsed: boolean;
};

type T_SideSubMenu = {
  children?: JSX.Element | JSX.Element[];
  collapsed?: boolean;
  icon?: JSX.Element;
  title?: string;
  firstLoad?: boolean;
  linkClick?: boolean;
  active?: boolean;
  depth?: number;
  onClick?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
};

type T_SideItemMenu = {
  title: string;
  icon?: JSX.Element;
  active: boolean;
};

export const SideBarWrapper = React.memo(({ collapsed, wrapperStyle, className, children }: T_SideBarWrapper) => {
  const sideBarWrapperStyleMerge: object = { ...wrapperStyle, width: collapsed ? 56 : 260 };
  return (
    <div className={`menu ${className}`} style={sideBarWrapperStyleMerge}>
      {children}
    </div>
  );
});

export const SideSubMenu = React.memo(
  ({
    collapsed,
    icon,
    title,
    firstLoad,
    linkClick,
    active,
    depth,
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
  }: T_SideSubMenu) => {
    const [className, setClassName] = React.useState('');
    const [openClose, setOpenClose] = React.useState(false);
    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
      if (collapsed) {
        const handleClickOutside = (event) => {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            for (const items of wrapperRef.current.children) {
              if (items.nodeName === 'LI') {
                setOpenClose(false);
              }
            }
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [wrapperRef, collapsed]);

    React.useEffect(() => {
      let deps1ClassNameCombination = '';
      // deps1ClassNameCombination += active ? 'active' : '';
      if (!collapsed) {
        // pc모드
        linkClick && !active && setOpenClose(false);
        active && firstLoad && setOpenClose(true);

        deps1ClassNameCombination += depth !== 3 && openClose ? ' open' : '';
      } else {
        linkClick && setOpenClose(false);
        active && firstLoad && setOpenClose(false);
        deps1ClassNameCombination += openClose ? ' open' : '';
      }
      setClassName(deps1ClassNameCombination);
    }, [active, openClose, linkClick, collapsed]);

    React.useEffect(() => {
      let classNameCombination = '';
      const makeActive = active ? 'active' : '';
      const makeOpen = active ? 'open' : '';
      if (!collapsed) {
        classNameCombination += `${makeActive} ${depth !== 3 ? makeOpen : ''}`;
        setClassName(classNameCombination);
      }
    }, [active]);

    const handleOnClick = (e) => {
      setOpenClose(!openClose);
      onClick(e);
    };

    return (
      <ul className="" ref={wrapperRef}>
        <li
          className={className}
          onClick={onClick ? handleOnClick : null}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div>
            {icon && icon}
            <span className="name">{title}</span>
            {onClick ? (openClose ? getIcon('ChevronUpMed') : getIcon('ChevronDownMed')) : getIcon('More')}
            {/* {!onClick && getIcon('More')} */}
          </div>
        </li>
        <div className="subMenu">{children}</div>
      </ul>
    );
  }
);

export const SideItemMenu = React.memo(({ title, icon, active }: T_SideItemMenu) => {
  return (
    <ul className="">
      <li className={active ? 'active' : ''}>
        <div>
          {icon && icon}
          <span className="name">{title}</span>
        </div>
      </li>
    </ul>
  );
});
