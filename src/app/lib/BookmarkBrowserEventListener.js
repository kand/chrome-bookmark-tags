import * as BookmarkActions from 'app/actions/BookmarkActions';

export default function setupBookmarkBrowserEventListeners (store) {

  chrome.bookmarks.onCreated.addListener(() => store.dispatch(BookmarkActions.fetchBookmarks()));
  chrome.bookmarks.onRemoved.addListener(() => store.dispatch(BookmarkActions.fetchBookmarks()));
  chrome.bookmarks.onChanged.addListener(() => store.dispatch(BookmarkActions.fetchBookmarks()));
};
