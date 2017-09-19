import React, {Component, PropTypes} from 'react';

export default class Table extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  onSortComplete (rowKey) {
    this.setState({ currentSortRowKey: rowKey });
  }

  render () {
    let headers = React.Children.map(
      this.props.children,
      dim => React.cloneElement(dim, {
        renderAsHeader: true,
        onSortComplete: this.onSortComplete.bind(this),
        isCurrentlySortedBy: this.state && this.state.currentSortRowKey === dim.props.rowKey
      })
    );

    let rows = this.props.rows.map((row, i) => {
      let values = React.Children.map(
        this.props.children,
        dim => React.cloneElement(dim, { row: row })
      );

      return <tr key={i}>{values}</tr>;
    });

    return (
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
