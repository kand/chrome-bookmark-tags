import React from 'react';

export default class Table extends React.Component {

  render () {
    let columnLabels = this.props.dimensions.map((dim, i) => {
      return <th key={i}>{dim.label}</th>;
    });

    let rows = this.props.rows.map((row, i) => {
      let values = this.props.dimensions.map((dim, i) => {
        let rowColValue;
        if (typeof dim.value === 'string') {
          rowColValue = row[dim.value];
        } else if (typeof dim.value === 'function') {
          rowColValue = dim.value(row);
        }

        return <td key={i}>{rowColValue}</td>;
      });

      return <tr key={i}>{values}</tr>;
    });

    return (
      <table>
        <thead>
          <tr>
            {columnLabels}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  rows: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  dimensions: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
      ]).isRequired,
      sorts: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func
      ])
    })
  )
};

