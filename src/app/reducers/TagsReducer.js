import { combineReducers } from 'redux';

import {
  CREATE_TAG,
  FETCH_TAGS_START,
  FETCH_TAGS_SUCCESS,
  TAGS_LIST_UPDATED
} from 'app/actions/TagActions';

function ui (state = {
  isFetching: false,
  error: '',
  listedTags: []
}, action) {

  switch (action.type) {

    case FETCH_TAGS_START:
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

    case CREATE_TAG:
      return {
        ...state,
        ...{
          listedTags: state.listedTags.concat(action.payload.id)
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

    case CREATE_TAG:
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

    default:
      return state;
  }
}


export default combineReducers({
  ui,
  entities
});

