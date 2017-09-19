import React from 'react';

import TableDimension from 'app/components/table/TableDimension';
import {
  nullComparator,
  keyComparator,
  keyComparatorReverse
} from 'app/Utils';

export default class TableKeyDimension extends TableDimension {

  static propTypes = {
    rowKey: React.PropTypes.string.isRequired
  }

  state = {
    sorters: [
      this.getDefaultComparator(),
      keyComparator.bind(null, this.props.rowKey),
      keyComparatorReverse.bind(null, this.props.rowKey)
    ]
  }

  getDefaultComparator () {
    return nullComparator;
  }

  renderValue (row) {
    return row[this.props.rowKey];
  }
}
