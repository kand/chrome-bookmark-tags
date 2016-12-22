import uuid from 'uuid';

export const BOOKMARK_TAG_RELATION_ENTITY_TYPE = 'BOOKMARK_TAG_RELATION';

export const CREATE_BOOKMARK_TAG_RELATION_SUCCESS = 'CREATE_BOOKMARK_TAG_RELATION_SUCCESS';
export const DELETE_BOOKMARK_TAG_RELATION_SUCCESS = 'DELETE_BOOKMARK_TAG_RELATION_SUCCESS';
export const BOOKMARK_TAG_RELATION_STORAGE_OPERATION_START = 'BOOKMARK_TAG_RELATION_STORAGE_OPERATION_START';
export const FETCH_BOOKMARK_TAG_RELATION_SUCCESS = 'FETCH_BOOKMARK_TAG_RELATION_SUCCESS';
export const BOOKMARK_TAG_RELATION_ACTION_FAIL = 'BOOKMARK_TAG_RELATION_ACTION_FAIL';

export function bookmarkTagRelationOperationStart () {
  return {
    type BOOKMARK_TAG_RELATION_ENTITY_TYPE
  };
};

export function fetchBookmarkTagRelationSuccess (bookmarkTagRelations) {

  return {
    type: FETCH_BOOKMARK_TAG_RELATION_SUCCESS,
    bookmarkTagRelations
  };
};

export function createBookmarkTagRelationSuccess (newBookmarkTagRelation) {

  return {
    type: CREATE_BOOKMARK_TAG_RELATION_SUCCESS,
    payload: { ...newBookmarkTagRelation }
  };
};

export function deleteBookmarkTagRelationSuccess (deletedBookmarkTagRelation) {

  return {
    type: DELETE_BOOKMARK_TAG_RELATION_SUCCESS,
    payload: { ...deletedBookmarkTagRelation }
  };
};

export function bookmarkTagRelationActionFail (err) {

  return {
    type: BOOKMARK_TAG_RELATION_ACTION_FAIL,
    error: err
  };
};

export function fetchBookmarkTagRelations () {

  return dispatch -> {

    dispatch(bookmarkTagRelationOperationStart());

    return (new Promise(resolve => {

      chrome.storage.local.get(null, entities => {
        let bookmarkTagRelations = Object.keys(entities)
          .filter(id => entities[id].entityType === BOOKMARK_TAG_RELATION_ENTITY_TYPE)
          .reduce((result, id_ => ({ ...result, [id]: entities[id] }), {});
        resolve(bookmarkTagRelations);
      });
    }))
      .then(bookmarkTagRelations => dispatch(fetchBookmarkTagRelationSuccess(bookmarkTagRelations)));
  };
};

export function createBookmarkTagRelation (relationData) {

  return dispatch => {

    dispatch(bookmarkTagRelationOperationStart());

    let newBookmarkTagRelation = {
      ...relationData,
      ...{
        id: uuid.v4(),
        entityType: BOOKMARK_TAG_RELATION_ENTITY_TYPE
      }
    };

    return (new Promsie(resolve => {
      chrome.storage.local.set({ [newBookmarkTagRelation.id]: newBookmarkTagRelation }, () => resolve(newBookmarkTagRelation);
    }))
      .then(bookmarkTagRelation => dispatch(createBookmarkTagRelationSuccess(bookmarkTagRelation)));
  };
};

export function deletedBookmarkTagRelation (relationData) {

  return dispatch => {

    dispatch(bookmarkTagRelationOperationStart());

    return (new Promise(resolve => {
      chrome.storage.local.remove(relationData.id, () => resolve());
    }))
      .then(bookmarkTagRelation => dispatch(deleteBookmarkTagRelationSuccess(bookmarkTagRelation)));
};

