import { combineReducers } from 'redux';

import {
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_SUCCESS
} from 'actions/BookmarkActions';

function bookmarks (state = {
  isFetching: false,
  error: '',
  items: []
}, action) {

  switch (action.type) {

    case FETCH_BOOKMARKS_START:
      return {
        ...state,
        ...{
          isFetching: true
        }
      };

    case FETCH_BOOKMARKS_SUCCESS:

      return {
        ...state,
        ...{
          isFetching: false,
          items: action.bookmarks
        }
      };

    default:
      return state;
  }
}

export default combineReducers({
  bookmarks
});

