import React from 'react';

import TableDimension from 'app/components/table/TableDimension';
import {
  nullComparator,
  keyComparator,
  keyComparatorReverse
} from 'app/Utils';

export default class TableKeyDimension extends TableDimension {

  getDefaultComparator () {
    return nullComparator;
  }

  constructor (props) {
    super(props);
    this.state.sorters = [
      this.getDefaultComparator(),
      keyComparator.bind(null, this.props.rowKey),
      keyComparatorReverse.bind(null, this.props.rowKey)
    ]
  }

  renderValue (row) {
    return row[this.props.rowKey];
  }
}

TableKeyDimension.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

