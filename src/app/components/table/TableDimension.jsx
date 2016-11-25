import React from 'react';

export default class TableDimension extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      currentSortMode: 0,
      sorters: []
    };
  }

  doSort () {
    let incSortMode = this.state.currentSortMode + 1;
    let nextSortMode = incSortMode < this.state.sorters.length ? incSortMode : 0;

    this.setState({ currentSortMode: nextSortMode });
    this.props.onSort(this.state.sorters[nextSortMode]);
  }

  renderValue (row) {
    throw new Error('TableDimension should only be used through an implementation!');
  }

  renderAsHeader () {
    let sorting;
    if (this.props.onSort) {
      sorting = <button onClick={this.doSort.bind(this)}>sort</button>;
    }

    return (
      <th>
        {this.props.label}
        {sorting} {this.state.currentSortMode}
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

