import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { fetchBookmarkTagRelations } from 'app/actions/BookmarkTagRelationActions';
import { fetchBookmarks } from 'app/actions/BookmarkActions';
import { fetchEntities } from 'app/actions/EntityActions';
import { store } from 'Store';
import setupBookmarkBrowserEventListeners from 'app/lib/BookmarkBrowserEventListener';
import AppRoot from 'app/components/AppRoot';

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

store.dispatch(fetchEntities());
store.dispatch(fetchBookmarks());

setupBookmarkBrowserEventListeners();

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  root
);

