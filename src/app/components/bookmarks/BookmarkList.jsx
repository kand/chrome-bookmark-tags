import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookmarkActions from 'app/actions/BookmarkActions';
import BookmarkKeyDimension from 'app/components/bookmarks/BookmarkKeyDimension';
import BookmarkTitleDimension from 'app/components/bookmarks/BookmarkTitleDimension';
import Table from 'app/components/table/Table';

class BookmarkList extends React.Component {

  constructor (props) {
    super(props);
    this.props.actions.fetchBookmarks();
  }

  render () {

    return (
      <Table rows={this.props.bookmarks}>
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
  state => ({
    bookmarks: state.bookmarks.ui.listedBookmarks.map(id => state.bookmarks.entities.byId[id])
  }),
  dispatch => ({ actions: bindActionCreators(BookmarkActions, dispatch) })
)(BookmarkList);

