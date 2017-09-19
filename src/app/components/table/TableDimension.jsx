import React, {Component, PropTypes} from 'react';

export default class TableDimension extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    onSort: PropTypes.func,
    isCurrentlySortedBy: PropTypes.bool
  }

  state = {
    currentSortMode: 0,
    sorters: []
  };

  doSort () {
    let incSortMode = this.state.currentSortMode + 1;
    let nextSortMode = incSortMode < this.state.sorters.length ? incSortMode : 0;

    this.props.onSort(this.state.sorters[nextSortMode]);
    this.setState({ currentSortMode: nextSortMode });

    this.props.onSortComplete(this.props.rowKey);
  }

  renderSortText () {
    let sortMode = this.props.isCurrentlySortedBy ? this.state.currentSortMode : 0;

    return [
      'not sorted',
      'sorted asc',
      'sorted dsc'
    ][sortMode];
  }

  renderValue (row) {
    throw new Error('TableDimension should only be used through an implementation!');
  }

  renderAsHeader () {
    let sorting;
    if (this.props.onSort) {
      sorting = <button onClick={this.doSort.bind(this)}>{this.renderSortText()}</button>;
    }

    return (
      <th>
        {this.props.label}
        {sorting}
      </th>
    );
  }

  renderAsRowDim (row) {
    if (!row) {
      return null;
    }

    return <td>{this.renderValue(this.props.row)}</td>;
  }

  render () {
    return this.props.renderAsHeader ?
      this.renderAsHeader() :
      this.renderAsRowDim(this.props.row);
  }
}
