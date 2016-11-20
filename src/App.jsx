import React from 'react';
import ReactDOM from 'react-dom';

import BookmarkList from './app/BookmarkList';

let root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

ReactDOM.render(
  <BookmarkList />,
  root
);

