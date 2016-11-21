import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRoot from './app/AppRoot';
import store from './app/Store';

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  root
);

