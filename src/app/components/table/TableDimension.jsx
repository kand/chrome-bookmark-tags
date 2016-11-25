import React from 'react';

export default class TableDimension extends React.Component {

  sorter (row1, row2) {
    throw new Error('TableDimension sorter must be implemented before use!');
  }

  renderValue (row) {
    throw new Error('TableDimension should only be used through an implementation!');
  }

  renderAsHeader () {
    let sorting;
    if (this.props.onSort) {
      sorting = <button onClick={this.props.onSort.bind(null, this.sorter)}>sort</button>;
    }

    return (
      <th>
        {this.props.label}
        {sorting}
      </th>
    );
  }

  renderAsRowDim (row) {
    return <td>{this.renderValue(this.props.row)}</td>;
  }

  render () {
    return this.props.renderAsHeader ?
      this.renderAsHeader() :
      this.renderAsRowDim(this.props.row);
  }
};

TableDimension.propTypes = {
  label: React.PropTypes.string.isRequired
};

