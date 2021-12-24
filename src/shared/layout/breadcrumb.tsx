import * as React from 'react';

import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react';

import { useTranslation } from 'react-i18next';

type TBreadCrumb = {
  items: object[];
};

interface IBreadCrumbItems {
  name: string;
  name_code: string;
  path: string;
}

const BreadCrumb: React.FC<TBreadCrumb> = React.memo(({ items }) => {
  const { t, i18n } = useTranslation(['menu']);
  const [bareadCrumbData, setBreadCrumbData] = React.useState([]);
  React.useEffect(() => {
    const newBreadCrumbData = items.map(({ name_code, path }: IBreadCrumbItems) => {
      return {
        text: t(`${name_code}`),
        key: name_code,
        path: path,
        onClick: (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
          // console.log(item);
        },
      };
    });

    setBreadCrumbData(newBreadCrumbData);
  }, [items, i18n.language]);

  return (
    <>{bareadCrumbData.length ? <Breadcrumb className="bareacrumb-wrapper" items={bareadCrumbData} /> : undefined}</>
  );
});

export default BreadCrumb;
