import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookmarkActions from 'actions/BookmarkActions';
import BookmarkTitleCell from 'components/BookmarkTitleCell';
import Table from 'components/table/Table';
import TableDimension from 'components/table/TableDimension';
import TableKeyCell from 'components/table/TableKeyCell';

class BookmarkList extends React.Component {

  constructor (props) {
    super(props);
    this.props.actions.fetchBookmarks();
  }

  render () {

    return (
      <Table rows={this.props.bookmarks}>
        <TableDimension label="ID">
          <TableKeyCell rowKey="id" />
        </TableDimension>
        <TableDimension label="Path">
          <TableKeyCell rowKey="path" />
        </TableDimension>
        <TableDimension label="Title">
          <BookmarkTitleCell />
        </TableDimension>
      </Table>
    );
  }
}

export default connect(
  state => ({ bookmarks: state.bookmarks.items }),
  dispatch => ({ actions: bindActionCreators(BookmarkActions, dispatch) })
)(BookmarkList);

