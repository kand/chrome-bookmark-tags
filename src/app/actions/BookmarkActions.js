import { BOOKMARK_TAG_RELATION_ENTITY_TYPE } from 'app/actions/BookmarkTagRelationActions';
import { deleteEntity } from 'app/actions/EntityActions';
import {
  flattenBookmarksTree,
  getEntitiesOfType,
  getSortedBookmarkIds
} from 'app/Utils';

export const FETCH_BOOKMARKS_START = 'FETCH_BOOKMARKS_START';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';
export const BOOKMARKS_LIST_UPDATED = 'BOOKMARKS_LIST_UPDATED';

export function fetchBookmarksStart () {

  return {
    type: FETCH_BOOKMARKS_START
  };
};

export function fetchBookmarksSuccess (bookmarks) {
  let listedBookmarks = getSortedBookmarkIds(bookmarks);

  return {
    type: FETCH_BOOKMARKS_SUCCESS,
    bookmarks,
    listedBookmarks
  }
};

export function fetchBookmarks () {

  return (dispatch, getState) => {

    dispatch(fetchBookmarksStart());

    return (new Promise(resolve => {

      chrome.bookmarks.getTree(function (tree) {
        resolve(tree);
      });
    }))
      .then(flattenBookmarksTree)
      .then(bookmarks => {
        let entities = getState().entities;
        let relations = getEntitiesOfType(entities, BOOKMARK_TAG_RELATION_ENTITY_TYPE);

        let bookmarkIds = Object.keys(bookmarks);

        relations
          .filter(relation => !bookmarkIds.includes(relation.bookmarkId))
          .forEach(relation => dispatch(deleteEntity(relation)));

        return bookmarks;
      })
      .then(bookmarks => dispatch(fetchBookmarksSuccess(bookmarks)));
  };
};

export function sortBookmarks (comparator) {

  return (dispatch, getState) => {
    let state = getState();
    let listedBookmarks = getSortedBookmarkIds(state.bookmarks.entities.byId, comparator)

    dispatch(updateBookmarksList(listedBookmarks));
  };
};

export function updateBookmarksList (listedBookmarks) {

  return {
    listedBookmarks,
    type: BOOKMARKS_LIST_UPDATED
  };
};

