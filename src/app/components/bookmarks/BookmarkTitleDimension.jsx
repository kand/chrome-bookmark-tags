import React from 'react';

import BookmarkKeyDimension from 'app/components/bookmarks/BookmarkKeyDimension';

export default class BookmarkTitleDimension extends BookmarkKeyDimension {

  renderValue (row) {
    return (
      <a
          href={row.url}
          target="_blank">
        {row.title}
      </a>
    );
  }
};

