
export default function setupBookmarkBrowserEventListeners () {

  chrome.bookmarks.onCreated.addListener(() => console.log('created'));
  chrome.bookmarks.onRemoved.addListener(() => console.log('removed'));
  chrome.bookmarks.onChanged.addListener(() => console.log('updated'));
}

