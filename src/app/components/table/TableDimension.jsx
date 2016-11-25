import React from 'react';

export default class TableDimension extends React.Component {

  renderAsHeader () {
    return <th>{this.props.label}</th>;
  }

  renderAsRowDim (row) {
    return React.cloneElement(this.props.children, { row: row });
  }

  render () {
    return this.props.renderAsHeader ?
      this.renderAsHeader() :
      this.renderAsRowDim(this.props.row);
  }
};

TableDimension.propTypes = {
  children: React.PropTypes.element.isRequired,
  label: React.PropTypes.string.isRequired,
  sorts: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ])
};

