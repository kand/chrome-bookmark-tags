import { getEntitiesOfType } from 'app/Utils';
import {
  TAG_ENTITY_TYPE,
  TAGS_LIST_UPDATED
} from 'app/actions/TagActions';
import {
  ENTITY_CREATE_SUCCESS,
  ENTITY_DELETE_SUCCESS,
  ENTITY_LIST_HYDRATE_SUCCESS,
  ENTITY_UPDATE_SUCCESS
} from 'app/actions/EntityActions';

export default function tags (state = {
  editingTagId: null,
  listedTagIds: []
}, action) {

  switch (action.type) {

    case ENTITY_LIST_HYDRATE_SUCCESS:
      return {
        ...state,
        ...{
          listedTagIds: getEntitiesOfType({
            allIds: Object.keys(action.entities),
            byId: action.entities
          }, TAG_ENTITY_TYPE)
            .map(tag => tag.id)
        }
      };

    case TAGS_LIST_UPDATED:
      return {
        ...state,
        ...{
          listedTagIds: action.listedTagIds
        }
      };

    case ENTITY_CREATE_SUCCESS:
      if (action.payload.entityType !== TAG_ENTITY_TYPE) {
        return state;
      }

      return {
        ...state,
        ...{
          listedTagIds: state.listedTagIds.concat(action.payload)
        }
      };

    case ENTITY_UPDATE_SUCCESS:
      if (action.payload.entityType !== TAG_ENTITY_TYPE) {
        return state;
      }

      let listedTagIds = state.listedTagIds
        .map(tag => tag.id === action.payload.id ? action.payload : tag);

      return {
        ...state,
        ...{
          listedTagIds
        }
      };

    case ENTITY_DELETE_SUCCESS:
      if (action.payload.entityType !== TAG_ENTITY_TYPE) {
        return state;
      }

      return {
        ...state,
        ...{
          listedTagIds: state.listedTagIds.filter(tag => tag.id !== action.payload.id)
        }
      };

    default:
      return state;
  }
};

