import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import thunkMiddleware from 'redux-thunk';


import {
  FETCH_BOOKMARKS_START,
  FETCH_BOOKMARKS_SUCCESS
} from './BookmarkActions';


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

const rootReducer = combineReducers({
  bookmarks
});

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;

