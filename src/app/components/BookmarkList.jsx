import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookmarkActions from 'actions/BookmarkActions';
import BookmarkTitleDimension from 'components/BookmarkTitleDimension';
import Table from 'components/table/Table';
import BookmarkKeyDimension from 'components/BookmarkKeyDimension';

class BookmarkList extends React.Component {

  constructor (props) {
    super(props);
    this.props.actions.fetchBookmarks();
  }

  render () {

    return (
      <Table rows={this.props.bookmarks}>
        <BookmarkKeyDimension
            label="ID"
            rowKey="id"
            onSort={this.props.actions.sortBookmarks} />
        <BookmarkKeyDimension
            label="Path"
            rowKey="path"
            onSort={this.props.actions.sortBookmarks} />
        <BookmarkTitleDimension
            label="Title"
            rowKey="title"
            onSort={this.props.actions.sortBookmarks} />
      </Table>
    );
  }
}

export default connect(
  state => ({ bookmarks: state.bookmarks.items }),
  dispatch => ({ actions: bindActionCreators(BookmarkActions, dispatch) })
)(BookmarkList);

