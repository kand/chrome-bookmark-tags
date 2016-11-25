import React from 'react';

import TableDimension from 'components/table/TableDimension';

export default class BookmarkTitleDimension extends TableDimension {

  sorter (row1, row2) {
    if (row1.title > row2.title) {
      return 1;
    }

    if (row1.title < row2.title) {
      return -1;
    }

    return 0;
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

