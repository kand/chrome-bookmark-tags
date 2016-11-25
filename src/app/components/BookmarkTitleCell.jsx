import React from 'react';

import TableCell from 'components/table/TableCell';

export default class BookmarkTitleCell extends TableCell {

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

