import './assets/scss/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Admin from './shared/layout/admin';
import { RecoilRoot } from 'recoil';
import { initializeIcons } from '@fluentui/font-icons-mdl2';

initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter history={history}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Redirect path="*" to="/admin/dashboard/dashboard" />
        </Switch>
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
