import React from 'react';

export default class TableCell extends React.Component {

  renderValue (row) {
    throw new Error('TableCell should only be used through an implementation!');
  }

  render () {
    return <td>{this.renderValue(this.props.row)}</td>;
  }
}

