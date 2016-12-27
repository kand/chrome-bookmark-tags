import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from 'Store';
import { fetchBookmarks } from 'app/actions/BookmarkActions';
import { fetchTags } from 'app/actions/TagActions';
import { fetchBookmarkTagRelations } from 'app/actions/BookmarkTagRelationActions';
import AppRoot from 'app/components/AppRoot';

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

store.dispatch(fetchBookmarks());
store.dispatch(fetchTags());
store.dispatch(fetchBookmarkTagRelations());

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  root
);

