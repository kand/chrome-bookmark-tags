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
  listedTags: []
}, action) {

  switch (action.type) {

    case ENTITY_LIST_HYDRATE_SUCCESS:
      return {
        ...state,
        ...{
          listedTags: getEntitiesOfType({
            allIds: Object.keys(action.entities),
            byId: action.entities
          }, TAG_ENTITY_TYPE)
        }
      };

    case TAGS_LIST_UPDATED:
      return {
        ...state,
        ...{
          listedTags: action.listedTags
        }
      };

    case ENTITY_CREATE_SUCCESS:
      if (action.payload.entityType !== TAG_ENTITY_TYPE) {
        return state;
      }

      return {
        ...state,
        ...{
          listedTags: state.listedTags.concat(action.payload)
        }
      };

    case ENTITY_UPDATE_SUCCESS:
      if (action.payload.entityType !== TAG_ENTITY_TYPE) {
        return state;
      }

      let listedTags = state.listedTags
        .map(tag => tag.id === action.payload.id ? action.payload : tag);

      return {
        ...state,
        ...{
          listedTags
        }
      };

    case ENTITY_DELETE_SUCCESS:
      if (action.payload.entityType !== TAG_ENTITY_TYPE) {
        return state;
      }

      return {
        ...state,
        ...{
          listedTags: state.listedTags.filter(tag => tag.id !== action.payload.id)
        }
      };

    default:
      return state;
  }
};

