import { combineReducers } from 'redux';

import bookmarks from 'app/reducers/BookmarksReducer';
import tags from 'app/reducers/TagsReducer';
import bookmarkTagRelations from 'app/reducers/BookmarkTagRelationsReducer';
import entities from 'app/reducers/EntityReducer';

export default combineReducers({
  bookmarkTagRelations,
  bookmarks,
  entities,
  tags
});

