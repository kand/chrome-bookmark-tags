import React from 'react';

import BookmarkKeyDimension from 'app/components/bookmarks/BookmarkKeyDimension';
import TagSearch from 'app/components/tags/TagSearch';

export default class BookmarkTagsDimension extends BookmarkKeyDimension {

  selectTag (tag) {
    console.log(tag)
  }

  renderValue (row) {
    return (
      <TagSearch onSelect={this.selectTag} />
    );
  }
};

