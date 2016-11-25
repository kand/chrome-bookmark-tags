import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookmarkActions from 'actions/BookmarkActions';
import BookmarkTitleCell from 'components/BookmarkTitleCell';
import Table from 'components/table/Table';

class BookmarkList extends React.Component {

  constructor (props) {
    super(props);
    this.props.actions.fetchBookmarks();
  }

  render () {

    return (
      <Table
        dimensions={[
          {
            label: 'ID',
            value: 'id'
          }, {
            label: 'Path',
            value: 'path'
          }, {
            label: 'Title',
            value: row => <BookmarkTitleCell row={row} />
          }
        ]}
        rows={this.props.bookmarks}
      />
    );
  }
}

export default connect(
  state => ({ bookmarks: state.bookmarks.items }),
  dispatch => ({ actions: bindActionCreators(BookmarkActions, dispatch) })
)(BookmarkList);

