import {
  ENTITY_CREATE_SUCCESS,
  ENTITY_DELETE_SUCCESS,
  ENTITY_LIST_HYDRATE_SUCCESS,
  ENTITY_OPERATION_FAIL,
  ENTITY_OPERATION_START,
  ENTITY_UPDATE_SUCCESS,
} from 'app/actions/EntityActions';

export default function entities (state = {
  allIds: [],
  byId: {},
  error: '',
  isFetching: false
}, action) {

  switch (action.type) {

    case ENTITY_CREATE_SUCCESS:
      return {
        ...state,
        ...{
          isFetching: false,
          error: '',
          byId: {
            ...state.byId,
            [action.payload.id]: action.payload
          },
          allIds: state.allIds.concat(action.payload.id)
        }
      };

    case ENTITY_DELETE_SUCCESS:
      let byId = { ...state.byId };
      delete byId[action.payload.id];

      let allIds = Object.keys(byId);

      return {
        ...state,
        ...{
          isFetching: false,
          error: '',
          byId,
          allIds
        }
      };

    case ENTITY_LIST_HYDRATE_SUCCESS:
      return {
        ...state,
        ...{
          isFetching: false,
          error: '',
          byId: action.entities,
          allIds: Object.keys(action.entities)
        }
      };

    case ENTITY_UPDATE_SUCCESS:
      return {
        ...state,
        ...{
          isFetching: false,
          error: '',
          byId: {
            ...state.byId,
            [action.payload.id]: {
              ...state.byId[action.payload.id],
              ...action.payload
            }
          }
        }
      };

    case ENTITY_OPERATION_FAIL:
      return {
        ...state,
        ...{
          isFetching: false,
          error: action.error
        }
      };

    case ENTITY_OPERATION_START:
      return {
        ...state,
        ...{
          isFetching: true,
          error: ''
        }
      };

    default:
      return state;
  }
}

