import React from 'react';

import TableKeyDimension from 'components/table/TableKeyDimension';
import { bookmarkDefaultComparator } from 'Utils';

export default class BookmarkKeyDimension extends TableKeyDimension {

  getDefaultComparator () {
    return bookmarkDefaultComparator;
  }
};

