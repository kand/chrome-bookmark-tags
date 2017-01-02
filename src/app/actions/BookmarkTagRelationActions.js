import uuid from 'uuid';

import { getEntitiesOfType } from 'app/Utils';
import {
  createEntity,
  updateEntity,
  deleteEntity
} from 'app/actions/EntityActions';

export const BOOKMARK_TAG_RELATION_ENTITY_TYPE = 'BOOKMARK_TAG_RELATION';

function relationIsNotUnique (relationData, state) {
  let relationIsUnique = state.entities.allIds
    .reduce((relationIsUnique, currId) => {
      if (currId === relationData.id) {
        return relationIsUnique;
      }

      let currEntity = state.entities.byId[currId];
      if (currEntity.entityType !== BOOKMARK_TAG_RELATION_ENTITY_TYPE) {
        return relationIsUnique;
      }

      return relationIsUnique &&
        !(currEntity.tagId === relationData.tagId &&
            currEntity.bookmarkId === relationData.bookmarkId);
    }, true);

    return relationIsUnique ? false : 'this tag has already been assigned to this bookmark!';
};

export function createBookmarkTagRelation (relationData) {

  return createEntity(relationData, BOOKMARK_TAG_RELATION_ENTITY_TYPE, relationIsNotUnique);
};

export function deleteBookmarkTagRelation (relationData) {

  return deleteEntity(relationData);
};

