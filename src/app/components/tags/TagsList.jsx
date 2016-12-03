import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TagActions from 'app/actions/TagActions';
import Table from 'app/components/table/Table';
import TableKeyDimension from 'app/components/table/TableKeyDimension';
import TagToolsDimension from 'app/components/tags/TagToolsDimension';

class TagsList extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      newTagTitle: ''
    };

    this.props.actions.fetchTags();
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
    return (
      <div>
        <h2>Tags</h2>
        <form onSubmit={this.addTag.bind(this)}>
          <input
            value={this.state.newTagTitle}
            onChange={this.updateTagValue.bind(this)} />
          <button>create tag</button>
        </form>
        {this.props.tags.length > 0 ? this.renderTable() : this.renderEmpty()}
      </div>
    );
  }
}

export default connect(
  state => ({
    tags: state.tags.ui.listedTags.map(id => state.tags.entities.byId[id]),
  }),
  dispatch => ({ actions: bindActionCreators(TagActions, dispatch) })
)(TagsList);

