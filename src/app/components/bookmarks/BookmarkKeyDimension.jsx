import React from 'react';

import TableKeyDimension from 'app/components/table/TableKeyDimension';
import { bookmarkDefaultComparator } from 'app/Utils';

export default class BookmarkKeyDimension extends TableKeyDimension {

  getDefaultComparator () {
    return bookmarkDefaultComparator;
  }
};

