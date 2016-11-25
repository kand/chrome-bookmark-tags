import React from 'react';

export default class Table extends React.Component {

  render () {
    let headers = React.Children.map(
      this.props.children,
      dim => React.cloneElement(dim, { renderAsHeader: true })
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

Table.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  rows: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

