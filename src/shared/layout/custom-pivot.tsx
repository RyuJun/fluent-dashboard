import { IPivotItemProps, Pivot, PivotItem } from '@fluentui/react';
import { useHistory, useLocation } from 'react-router';

import React from 'react';
import useGetUrlSearchParams from 'shared/hooks/useGetUrlSearchParams';
import { useTranslation } from 'react-i18next';

interface ICustomPivotItemsProps {
  en_name: string;
  name: string;
  name_code: string;
  path: string;
}
interface ICustomPivotProps {
  options: ICustomPivotItemsProps[];
}
const CustomPivot: React.FC<ICustomPivotProps> = ({ options }) => {
  // const theme = useGetThemePalette();
  const { t } = useTranslation(['menu']);
  const [activePivot, setActivePivot] = React.useState(options[0].name_code);
  const location = useLocation().pathname.replace('/admin', '');
  const history = useHistory();
  const nowTab = useGetUrlSearchParams('tabs');

  // const bookmark = useRecoilValue(bookmarkState) as IBookmark;
  // const setBookmark = useSetRecoilState(bookmarkChangeSelector);

  React.useEffect(() => {
    if (!nowTab) {
      if (options[0].path.indexOf(location) !== -1) {
        history.push(`/admin${options[0].path}`);
      }
    } else {
      setActivePivot(nowTab);
    }
  }, [nowTab, options]);

  const handleLinkClick = (item: PivotItem) => {
    const { linkText, itemKey } = item.props;
    setActivePivot(itemKey);
    if (location !== linkText) {
      history.push(`/admin${linkText}`);
    }
  };
  // const _onBookmarkClick = (target): void => {
  //   setBookmark({
  //     name: target.name,
  //     en_name: target.en_name,
  //     name_code: target.name_code,
  //     path: target.path,
  //   });
  // };
  return (
    <Pivot
      className="pivot-wrapper"
      headersOnly
      overflowBehavior="menu"
      onLinkClick={handleLinkClick}
      selectedKey={activePivot}
    >
      {options.map((item) => {
        // const isBookmarkStatus = bookmark.list.filter((bookmark) => bookmark.name_code === item.name_code);
        return (
          <PivotItem
            key={item.name_code}
            headerText={t(`${item.name_code}`)}
            itemKey={item.name_code}
            linkText={item.path}
            onRenderItemLink={(
              link: IPivotItemProps,
              defaultRenderer: (link: IPivotItemProps) => JSX.Element
            ): JSX.Element => defaultRenderer(link)}
          />
        );
      })}
    </Pivot>
  );
};

export default CustomPivot;
