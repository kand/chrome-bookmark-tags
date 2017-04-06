import * as BookmarkActions from 'app/actions/BookmarkActions';
import * as BookmarkTagRelationActions from 'app/actions/BookmarkTagRelationActions';
import { getEntitiesOfType } from 'app/Utils';

export default function setupBookmarkBrowserEventListeners (store) {

  chrome.bookmarks.onCreated.addListener(() => store.dispatch(BookmarkActions.fetchBookmarks()));
  chrome.bookmarks.onChanged.addListener(() => store.dispatch(BookmarkActions.fetchBookmarks()));

  chrome.bookmarks.onRemoved.addListener(bookmarkId => {

  console.log(store.getState())

    getEntitiesOfType(
      store.getState().entities,
      BookmarkTagRelationActions.BOOKMARK_TAG_RELATION_ENTITY_TYPE
    )
      .filter(relation => relation.bookmarkId === bookmarkId)
      .forEach(relation =>
        store.dispatch(BookmarkTagRelationActions.deleteBookmarkTagRelation(relation))
      );

    store.dispatch(BookmarkActions.fetchBookmarks());
  });
};
