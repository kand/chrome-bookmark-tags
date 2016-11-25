import React from 'react';

import TableDimension from 'components/table/TableDimension';

export default class TableKeyDimension extends TableDimension {

  renderValue (row) {
    return row[this.props.rowKey];
  }
}

TableKeyDimension.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

