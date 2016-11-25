import React from 'react';

import TableKeyDimension from 'components/table/TableKeyDimension';
import { bookmarkDefaultComparator } from 'Utils';

export default class BookmarkTitleDimension extends TableKeyDimension {

  getDefaultComparator () {
    return bookmarkDefaultComparator;
  }

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

