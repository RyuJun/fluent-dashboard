import { IinitialMenu, menuState } from 'shared/context/menu.recoil';
import { Route, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { darkTheme, lightTheme } from 'utils/theme/theme';

import Aside from 'shared/layout/aside';
import React from 'react';
import { ThemeProvider } from '@fluentui/react';
import { ejectNowMenuData } from 'utils/functions/menu/';
import pageLazyImport from 'pages/page-lazy-import';
import { settingsState } from 'shared/context/settings.recoil';
import { useRecoilValue } from 'recoil';

const Admin = (): React.ReactElement => {
  const menu = useRecoilValue(menuState);
  const settings = useRecoilValue(settingsState);
  const theme = React.useMemo(() => (settings.theme === 'light' ? lightTheme : darkTheme), [settings.theme]);
  const size = React.useMemo(() => ({ zoom: `${settings.size}%` }), [settings.size]);
  const layout = React.useMemo(() => settings.layout, [settings.layout]);

  const match = useRouteMatch();
  const location = useLocation().pathname.replace('/admin', '');

  const [breadCrumbData, setBreadCrumbData] = React.useState([]);
  const [pivotData, setPivotData] = React.useState([]);

  React.useEffect(() => {
    const nowlocation = ejectNowMenuData(menu, 'location', location) as IinitialMenu;
    const nowBreadcrumb = ejectNowMenuData(menu, 'breadcrumb', location) as IinitialMenu[];

    setBreadCrumbData(nowBreadcrumb);
    setPivotData(nowlocation.tabs ? nowlocation.tabs : []);
  }, [menu]);

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider applyTo="body" theme={theme}>
        <div className="wrapper" style={size}>
          {layout === 'vertical' && <Aside />}
          <main>
            {/* <Navi /> */}
            {/* {settings.layout === 'horizontal' && <AsideTop />} */}
            <div className="content custom-scrollbar">
              <div className="page-header-wrapper">
                {/* {breadCrumbData.length ? <BreadCrumb items={breadCrumbData} /> : undefined}
                {pivotData.length ? <CustomPivot options={pivotData} /> : undefined} */}
              </div>
              <div className="page-content-wrapper">
                <Route exact path={`${String(match.path)}/:type/:page`} render={() => <GetComponentPages />} />
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </React.Suspense>
  );
};

function getComponentSrc(type, page) {
  const getSrc = require.context('../../pages/', true, /\.page\.(tsx)$/);
  let src = '';
  getSrc.keys().some((filePath) => {
    const path = filePath.split('/');

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const pathReg = new RegExp(`^${type}`, 'i');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const fileReg = new RegExp(`^${page}\\.page\\.(tsx)`);

    if (fileReg.test(path[path.length - 1])) {
      src = filePath;
    }
    if (pathReg.test(path[1]) && fileReg.test(path[path.length - 1])) {
      src = filePath;
      return true;
    }
    return false;
  });
  return src;
}

function GetComponentPages() {
  const { type, page } = useParams();
  const componentSrc = getComponentSrc(type, page);
  const Component = pageLazyImport(componentSrc);
  return <Component />;
}
export default Admin;
