import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BookmarkKeyDimension from 'app/components/bookmarks/BookmarkKeyDimension';
import TagSearch from 'app/components/tags/TagSearch';
import * as BookmarkTagRelationActions from 'app/actions/BookmarkTagRelationActions';

class BookmarkTagsDimension extends BookmarkKeyDimension {

  selectTag (tag) {
    this.props.actions.createBookmarkTagRelation({
      bookmarkId: this.props.row.id,
      tagId: tag.id
    });
  }

  renderBookmarkTagRelations () {
    let tagElements = this.props.tags
      .map((tag, i) => <li key={i}>{tag.title}</li>);

    return <ul>{tagElements}</ul>
  }

  renderValue (bookmark) {
    return (
      <div>
        <TagSearch onSelect={this.selectTag.bind(this)} />
        {this.renderBookmarkTagRelations()}
      </div>
    );
  }
};

export default connect(
  (state, ownProps) => {
    let bookmarkTagRelations = state.bookmarkTagRelations;

    let tags = [];
    if (ownProps.row) {
      tags = bookmarkTagRelations.entities.allIds
        .map(id => bookmarkTagRelations.entities.byId[id])
        .filter(relation => relation.bookmarkId === ownProps.row.id)
        .map(relation => state.tags.entities.byId[relation.tagId])
    }

    return {
      errorMessage: bookmarkTagRelations.ui.error,
      tags
    };
  },
  dispatch => ({ actions: bindActionCreators(BookmarkTagRelationActions, dispatch) })
)(BookmarkTagsDimension);

