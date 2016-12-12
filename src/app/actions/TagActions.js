import { bindActionCreators } from 'redux';
import uuid from 'uuid';

import { getSortedTagIds } from 'app/Utils';

export const TAG_ENTITY_TYPE = 'TAG';

export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
export const DELETE_TAG = 'DELETE_TAG';
export const TAG_STORAGE_OPERATION_START = 'TAG_STORAGE_OPERATION_START';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const TAGS_LIST_UPDATED = 'TAGS_LIST_UPDATED';

export function tagStorageOperationStart () {
  return {
    type: TAG_STORAGE_OPERATION_START
  };
};

export function fetchTagsSuccess (tags) {
  let listedTags = getSortedTagIds(tags);

  return {
    type: FETCH_TAGS_SUCCESS,
    tags,
    listedTags
  };
};

export function createTagSuccess (newTag) {

  return {
    type: CREATE_TAG_SUCCESS,
    payload: newTag
  };
};

export function updateTagSuccess (updatedTag) {

  return {
    type: UPDATE_TAG_SUCCESS,
    payload: { ...updatedTag }
  };
};

export function fetchTags () {

  return dispatch => {

    dispatch(tagStorageOperationStart());

    return (new Promise(resolve => {

      chrome.storage.local.get(null, entities => {
        let tags = Object.keys(entities)
          .filter(id => entities[id].entityType === TAG_ENTITY_TYPE)
          .reduce((result, id) => ({ ...result, [id]: entities[id] }), {});
        resolve(tags);
      });
    }))
      .then(tags => dispatch(fetchTagsSuccess(tags)));
  };
}

export function createTag (tagData) {

  return dispatch => {

    dispatch(tagStorageOperationStart());

    let newTag = {
      ...tagData,
      ...{
        id: uuid.v4(),
        entityType: TAG_ENTITY_TYPE
      }
    };

    return (new Promise(resolve => {
      chrome.storage.local.set({ [newTag.id]: newTag }, () => resolve(newTag));
    }))
      .then(tag => dispatch(createTagSuccess(tag)));
  };
};

export function updateTag (tagData) {

  return dispatch => {

    dispatch(tagStorageOperationStart());

    return (new Promise(resolve => {
      chrome.storage.local.get(tagData.id, existingTag => {

        let updatedTag = {
          ...existingTag,
          ...tagData
        };

        chrome.storage.local.set({ [tagData.id]: updatedTag }, () => resolve(updatedTag));
      });
    }))
      .then(tag => dispatch(updateTagSuccess(tag)));
  };
};

export function deleteTag (tagId) {

  return {
    type: DELETE_TAG,
    payload: {
      id: tagId
    }
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
    let state = getState();
    let listedTags = getSortedTagIds(state.tags.entities.byId, comparator);

    dispatch(updateTagsList(listedTags));
  };
};

