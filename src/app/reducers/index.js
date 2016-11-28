import { combineReducers } from 'redux';

import bookmarks from 'app/reducers/BookmarksReducer';
import tags from 'app/reducers/TagsReducer';

export default combineReducers({
  bookmarks,
  tags
});

