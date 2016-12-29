import { combineReducers } from 'redux';

import bookmarks from 'app/reducers/BookmarksReducer';
import tags from 'app/reducers/TagsReducer';
import entities from 'app/reducers/EntityReducer';

export default combineReducers({
  bookmarks,
  entities,
  tags
});

