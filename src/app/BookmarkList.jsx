import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookmarkActions from './BookmarkActions';
import Bookmark from './Bookmark';

class BookmarkList extends React.Component {

  constructor (props) {
    super(props);
    this.props.actions.fetchBookmarks();
  }

  render () {
    let bookmarks = this.props.bookmarks.map((bookmark) => {
      return <li key={bookmark.id}><Bookmark bookmark={bookmark} /></li>
    });

    return <ul>
      {bookmarks}
    </ul>;
  }
}

export default connect(
  state => ({ bookmarks: state.bookmarks.items }),
  dispatch => ({ actions: bindActionCreators(BookmarkActions, dispatch) })
)(BookmarkList);

