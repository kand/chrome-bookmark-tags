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
    let _self = this;
    return this.props.bookmarkTagRelations
      .filter(relation => relation.bookmarkId === _self.props.row.id)
      .map(relation => _self.props.tagsState.byId[relation.tagId])
      .map(tag => <div>{tag.title}</div>);
  }

  renderValue (bookmark) {
    return (
      <div>
        <TagSearch onSelect={this.selectTag.bind(this)} />
        <div>{this.renderBookmarkTagRelations()}</div>
      </div>
    );
  }
};

export default connect(
  state => {
    let bookmarkTagRelations = state.bookmarkTagRelations;

    return {
      errorMessage: bookmarkTagRelations.ui.error,
      bookmarkTagRelations: bookmarkTagRelations.entities.allIds
        .map(id => bookmarkTagRelations.entities.byId[id]),
      tagsState: state.tags
    };
  },
  dispatch => ({ actions: bindActionCreators(BookmarkTagRelationActions, dispatch) })
)(BookmarkTagsDimension);

