import { combineReducers } from 'redux';

import {
  CREATE_TAG_SUCCESS,
  DELETE_TAG_SUCCESS,
  FETCH_TAGS_SUCCESS,
  TAGS_LIST_UPDATED,
  TAG_STORAGE_OPERATION_START,
  UPDATE_TAG_SUCCESS
} from 'app/actions/TagActions';

function ui (state = {
  editingTagId: null,
  error: '',
  isFetching: false,
  listedTags: []
}, action) {

  switch (action.type) {

    case TAG_STORAGE_OPERATION_START:
      return {
        ...state,
        ...{
          isFetching: true
        }
      };

    case FETCH_TAGS_SUCCESS:
    case TAGS_LIST_UPDATED:
      return {
        ...state,
        ...{
          isFetching: false,
          listedTags: action.listedTags
        }
      };

    case CREATE_TAG_SUCCESS:
      return {
        ...state,
        ...{
          listedTags: state.listedTags.concat(action.payload.id)
        }
      };

   case DELETE_TAG_SUCCESS:
      return {
        ...state,
        ...{
          listedTags: state.listedTags.filter(tagId => tagId !== action.payload.id)
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

    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        ...{
          byId: action.tags,
          allIds: Object.keys(action.tags)
        }
      };

    case CREATE_TAG_SUCCESS:
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

    case UPDATE_TAG_SUCCESS:
      return {
        ...state,
        ...{
          byId: {
            ...state.byId,
            [action.payload.id]: {
              ...state.byId[action.payload.id],
              ...action.payload
            }
          }
        }
      };

    case DELETE_TAG_SUCCESS:
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
}


export default combineReducers({
  ui,
  entities
});

