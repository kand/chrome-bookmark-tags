import { bindActionCreators } from 'redux';
import uuid from 'uuid';

import { getSortedTagIds } from 'app/Utils';

export const CREATE_TAG = 'CREATE_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const FETCH_TAGS_START = 'FETCH_TAGS_START';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const TAGS_LIST_UPDATED = 'TAGS_LIST_UPDATED';

export function fetchTagsStart () {
  return {
    type: FETCH_TAGS_START
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

export function fetchTags () {

  return dispatch => {

    dispatch(fetchTagsStart());

    return (new Promise(resolve => {

      // TODO : actually fetch from chrome
      resolve({});
    }))
      .then(tags => dispatch(fetchTagsSuccess(tags)));
  };
}

export function createTag (tagData) {

  return {
    type: CREATE_TAG,
    payload: {
      ...tagData,
      ...{ id: uuid.v4() }
    }
  };
};

export function updateTag (tagData) {

  return {
    type: UPDATE_TAG,
    payload: { ...tagData }
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

