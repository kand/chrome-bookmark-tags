import { combineReducers } from 'redux';

import {
  BOOKMARK_TAG_RELATION_ENTITY_TYPE,
  CREATE_BOOKMARK_TAG_RELATION_SUCCESS,
  DELETE_BOOKMARK_TAG_RELATION_SUCCESS,
  BOOKMARK_TAG_RELATION_STORAGE_OPERATION_START,
  FETCH_BOOKMARK_TAG_RELATION_SUCCESS,
  BOOKMARK_TAG_RELATION_ACTION_FAIL
} from 'app/actions/BookmarkTagRelationActions';

function ui (state = {
  error: '',
  isFetching: false
}, action) {

  switch (action.type) {

    case BOOKMARK_TAG_RELATION_STORAGE_OPERATION_START:
      return {
        ...state,
        ...{
          isFetching: true,
          error: ''
        }
      };

    case FETCH_BOOKMARK_TAG_RELATION_SUCCESS:
    case CREATE_BOOKMARK_TAG_RELATION_SUCCESS:
    case DELETE_BOOKMARK_TAG_RELATION_SUCCESS:
      return {
        ...state,
        ...{
          isFetching: false
        }
      };

    case BOOKMARK_TAG_RELATION_ACTION_FAIL:
      return {
        ...state,
        ...{
          error: action.error
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

    case FETCH_BOOKMARK_TAG_RELATION_SUCCESS:
      return {
        ...state,
        ...{
          byId: action.bookmarkTagRelations,
          allIds: Object.keys(action.bookmarkTagRelations)
        }
      };

    case CREATE_BOOKMARK_TAG_RELATION_SUCCESS:
      return {
        ...state,
        ...{
          byId: {
            ...state.byId,
            [action.payload.id]: action.payload
          },
          allIds: state.allIds.concat(action.payload.id)
        }
      };

    case DELETE_BOOKMARK_TAG_RELATION_SUCCESS:
      let byId = { ...state.byId };
      delete byId[action.payload.id];

      let allIds = Object.keys(byId);

      return {
        ...state,
        ...{
          byId,
          allIds
        }
      };

    default:
      return state;
  }
};

export default combineReducers({
  ui,
  entities
});

