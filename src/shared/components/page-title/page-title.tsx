import { IinitialMenu, menuState } from 'shared/context/menu.recoil';

import { FUNC_NAV_MODE } from 'shared/variables/common.constants';
import { Icon } from '@fluentui/react';
import React from 'react';
import { ejectNowMenuData } from 'utils/functions/menu/';
import useGetUrlSearchParams from 'shared/hooks/useGetUrlSearchParams';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

interface IPageTitle {
  status?: 'view' | 'add' | 'edit' | 'copy';
  style?: object;
  onBack?: () => void;
  onChangeMode?: () => void;
}

export const PageTitle = ({ status, style, onBack, onChangeMode }: IPageTitle): React.ReactElement => {
  const { t, i18n } = useTranslation(['common', 'menu']);
  const [title, setTitle] = React.useState('');
  const location = useLocation().pathname.replace('/admin', '');
  const nowTab = useGetUrlSearchParams('tabs');
  const menu = useRecoilValue(menuState);

  React.useEffect(() => {
    const nowlocation = ejectNowMenuData(menu, 'location', location) as IinitialMenu;
    if (nowlocation.tabs) {
      nowlocation.tabs.forEach((item) => {
        if (item.name_code === nowTab) setTitle(t(`menu:${String(item.name_code)}`));
      });
    } else {
      setTitle(t(`menu:${String(nowlocation.name_code)}`));
    }
  }, [nowTab, menu, i18n.language]);

  return (
    <div className="page-title" style={style}>
      {onBack && status === 'edit' && <Icon iconName="Back" className="back" onClick={onBack} />}
      {status ? (
        <>
          {title} {status !== 'view' && t(`common:${status}`)}
        </>
      ) : (
        <>{title}</>
      )}

      {onChangeMode && status === FUNC_NAV_MODE.VIEW && (
        <div className="mode-change" onClick={onChangeMode}>
          <Icon iconName="Edit" />
          <span>{t('common:edit')}</span>
        </div>
      )}
    </div>
  );
};
