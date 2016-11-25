import React from 'react';

import TableDimension from 'components/table/TableDimension';
import {
  bookmarkDefaultComparator,
  bookmarkTitleComparatorAsc,
  bookmarkTitleComparatorDsc
} from 'Utils';

export default class BookmarkTitleDimension extends TableDimension {

  constructor (props) {
    super(props);
    this.state.sorters = [
      bookmarkDefaultComparator,
      bookmarkTitleComparatorAsc,
      bookmarkTitleComparatorDsc
    ];
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

