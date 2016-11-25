import React from 'react';

import TableCell from 'components/table/TableCell';

export default class TableKeyCell extends TableCell {

  renderValue (row) {
    return row[this.props.rowKey];
  }
}

TableKeyCell.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

