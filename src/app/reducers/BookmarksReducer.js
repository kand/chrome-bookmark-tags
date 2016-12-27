import { combineReducers } from 'redux';

import {
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_SUCCESS,
  BOOKMARKS_LIST_UPDATED,
} from 'app/actions/BookmarkActions';

function ui (state = {
  isFetching: false,
  error: '',
  listedBookmarks: []
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
    case BOOKMARKS_LIST_UPDATED:
      return {
        ...state,
        ...{
          isFetching: false,
          listedBookmarks: action.listedBookmarks
        }
      };

    default:
      return state;
  }
};

function entities (state = {
  byId: {},
  allIds: []
}, action) {

  switch (action.type) {

    case FETCH_BOOKMARKS_SUCCESS:
      return {
        ...state,
        ...{
          byId: action.bookmarks,
          allIds: Object.keys(action.bookmarks)
        }
      };

    default:
      return state;
  }
}

export default combineReducers({
  ui,
  entities
});

