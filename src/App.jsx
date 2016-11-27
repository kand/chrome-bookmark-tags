import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import AppRoot from 'app/components/AppRoot';
import RootReducer from 'app/reducers';

let store = createStore(
  RootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  root
);

