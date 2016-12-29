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

  deleteRelation (relation) {
    this.props.actions.deleteBookmarkTagRelation(relation);
  }

  renderBookmarkTagRelations () {
    let tagElements = this.props.relations
      .map(relation => (
        <li key={relation.id}>
          <span>{this.props.tagsById[relation.tagId].title}</span>
          <button onClick={this.deleteRelation.bind(this, relation)}>delete</button>
        </li>
      ));

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

    let relations = [];
    if (ownProps.row) {
      relations = bookmarkTagRelations.entities.allIds
        .map(id => bookmarkTagRelations.entities.byId[id])
        .filter(relation => relation.bookmarkId === ownProps.row.id);
    }

    return {
      errorMessage: bookmarkTagRelations.ui.error,
      tagsById: state.tags.listedTags.reduce((byId, tag) => ({
        ...byId,
        [tag.id]: tag
      }), {}),
      relations
    };
  },
  dispatch => ({ actions: bindActionCreators(BookmarkTagRelationActions, dispatch) })
)(BookmarkTagsDimension);

