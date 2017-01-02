import uuid from 'uuid';

import { getEntitiesOfType } from 'app/Utils';
import { BOOKMARK_TAG_RELATION_ENTITY_TYPE } from 'app/actions/BookmarkTagRelationActions';
import {
  createEntity,
  updateEntity,
  deleteEntity
} from 'app/actions/EntityActions';

export const TAG_ENTITY_TYPE = 'TAG';

export const TAGS_LIST_UPDATED = 'TAGS_LIST_UPDATED';

function tagIsNotUnique (tagData, state) {
  let tagIsUnique = state.entities.allIds
    .reduce((tagIsUnique, currId) => {
      if (currId === tagData.id) {
        return tagIsUnique;
      }

      let currEntity = state.entities.byId[currId];
      if (currEntity.entityType !== TAG_ENTITY_TYPE) {
        return tagIsUnique;
      }

      return tagIsUnique && currEntity.title !== tagData.title;
    }, true);

  return tagIsUnique ? false : 'tag title must be unique!';
};

export function createTag (tagData) {

  return createEntity(tagData, TAG_ENTITY_TYPE, tagIsNotUnique);
};

export function updateTag (tagData) {

  return updateEntity(tagData, tagIsNotUnique);
};

export function deleteTag (tagData) {

  return (dispatch, getState) => {

    dispatch(deleteEntity(tagData))
      .then(() => {
        let entities = getState().entities;
        let relations = getEntitiesOfType(entities, BOOKMARK_TAG_RELATION_ENTITY_TYPE);

        relations
          .filter(relation => relation.tagId === tagData.id)
          .forEach(relation => dispatch(deleteEntity(relation)));
      });
  };
}

export function updateTagsList (listedTags) {

  return {
    listedTags,
    type: TAGS_LIST_UPDATED
  };
};

export function sortTags (comparator) {

  return function (dispatch, getState) {
    let entities = getState().entities;
    let tags = getEntitiesOfType(entities, TAG_ENTITY_TYPE);

    dispatch(updateTagsList(tags.sort(comparator)));
  };
};

