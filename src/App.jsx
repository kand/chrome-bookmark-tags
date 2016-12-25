import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from 'Store';
import AppRoot from 'app/components/AppRoot';

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  root
);

