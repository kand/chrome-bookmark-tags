import { combineReducers } from 'redux';

import {
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_SUCCESS,
  SORT_BOOKMARKS
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

    case SORT_BOOKMARKS:

      return {
        ...state,
        ...{
          items: state.items.concat().sort(action.sorts)
        }
      };

    default:
      return state;
  }
}

export default combineReducers({
  bookmarks
});

