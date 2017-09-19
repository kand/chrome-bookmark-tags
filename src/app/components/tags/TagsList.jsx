import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getEntitiesOfType } from 'app/Utils';
import * as TagActions from 'app/actions/TagActions';
import Table from 'app/components/table/Table';
import TableKeyDimension from 'app/components/table/TableKeyDimension';
import TagToolsDimension from 'app/components/tags/TagToolsDimension';

class TagsList extends Component {

  state = {
    newTagTitle: ''
  }

  addTag (event) {
    if (this.state.newTagTitle) {
      this.props.actions.createTag({ title: this.state.newTagTitle });
    }

    this.setState({ newTagTitle: '' });

    event.preventDefault();
  }

  updateTagValue (event) {
    this.setState({ newTagTitle: event.target.value });
  }

  renderErrorMessage () {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  renderTable () {
    return (
      <div>
        <Table rows={this.props.tags}>
          <TableKeyDimension
              label="Title"
              rowKey="title"
              onSort={this.props.actions.sortTags} />
          <TagToolsDimension
              label="Tools" />
        </Table>
      </div>
    );
  }

  renderEmpty () {
    return <div>There are currently no tags, add one!</div>;
  }

  render () {
    console.log(this.props.tags)
    return (
      <div>
        <h2>Tags</h2>
        <form onSubmit={this.addTag.bind(this)}>
          <input
            value={this.state.newTagTitle}
            onChange={this.updateTagValue.bind(this)} />
          <button>create tag</button>
        </form>
        {this.renderErrorMessage()}
        {this.props.tags.length > 0 ? this.renderTable() : this.renderEmpty()}
      </div>
    );
  }
}

export default connect(
  state => ({
    errorMessage: state.entities.error,
    tags: state.tags.listedTagIds.map(id => state.entities.byId[id])
  }),
  dispatch => ({ actions: bindActionCreators(TagActions, dispatch) })
)(TagsList);

