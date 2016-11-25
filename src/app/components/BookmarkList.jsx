import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookmarkActions from 'actions/BookmarkActions';
import BookmarkTitleDimension from 'components/BookmarkTitleDimension';
import Table from 'components/table/Table';
import TableKeyDimension from 'components/table/TableKeyDimension';

class BookmarkList extends React.Component {

  constructor (props) {
    super(props);
    this.props.actions.fetchBookmarks();
  }

  render () {

    return (
      <Table rows={this.props.bookmarks}>
        <TableKeyDimension
            label="ID"
            rowKey="id"/>
        <TableKeyDimension
            label="Path"
            rowKey="path"/>
        <BookmarkTitleDimension
            label="Title"
            onSort={this.props.actions.sortBookmarks} />
      </Table>
    );
  }
}

export default connect(
  state => ({ bookmarks: state.bookmarks.items }),
  dispatch => ({ actions: bindActionCreators(BookmarkActions, dispatch) })
)(BookmarkList);

