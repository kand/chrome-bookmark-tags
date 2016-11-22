import { bindActionCreators } from 'redux';

import { flattenBookmarksTree } from 'Utils';

export const FETCH_BOOKMARKS = 'FETCH_BOOKMARKS';
export const FETCH_BOOKMARKS_START = 'FETCH_BOOKMARKS_START';
export const FETCH_BOOKMARKS_SUCCESS = 'FETCH_BOOKMARKS_SUCCESS';

export function fetchBookmarksStart () {
  return {
    type: FETCH_BOOKMARKS_START
  };
};

export function fetchBookmarksSuccess (bookmarks) {
  return {
    type: FETCH_BOOKMARKS_SUCCESS,
    bookmarks
  }
};

export function fetchBookmarks () {

  return function (dispatch) {

    dispatch(fetchBookmarksStart());

    return (new Promise((resolve) => {

      chrome.bookmarks.getTree(function (tree) {
        resolve(tree);
      });
    }))
      .then(flattenBookmarksTree)
      .then(bookmarks => dispatch(fetchBookmarksSuccess(bookmarks)));
  };
};
