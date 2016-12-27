import React from 'react';

import BookmarkList from 'app/components/bookmarks/BookmarkList';
import TagList from 'app/components/tags/TagsList';

export default class AppRoot extends React.Component {

  render () {
    return (
      <div>
        <TagList />
        <BookmarkList />
      </div>
    );
  }
}

