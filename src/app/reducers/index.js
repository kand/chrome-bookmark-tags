import { combineReducers } from 'redux';

import bookmarks from 'app/reducers/BookmarksReducer';
import tags from 'app/reducers/TagsReducer';
import bookmarkTagRelations from 'app/reducers/BookmarkTagRelationsReducer';

export default combineReducers({
  bookmarks,
  bookmarkTagRelations,
  tags
});

