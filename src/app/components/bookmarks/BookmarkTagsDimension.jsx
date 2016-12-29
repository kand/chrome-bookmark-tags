import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEntitiesOfType } from 'app/Utils';
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
          <span>{relation.tag.title}</span>
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

    let relations = [];
    if (ownProps.row) {
      relations = getEntitiesOfType(
        state.entities.allIds,
        state.entities.byId,
        BookmarkTagRelationActions.BOOKMARK_TAG_RELATION_ENTITY_TYPE
      )
        .filter(relation => relation.bookmarkId === ownProps.row.id)
        .map(relation => ({
          ...relation,
          tag: { ...state.entities.byId[relation.tagId] }
        }));
    }

    return { relations };
  },
  dispatch => ({ actions: bindActionCreators(BookmarkTagRelationActions, dispatch) })
)(BookmarkTagsDimension);

