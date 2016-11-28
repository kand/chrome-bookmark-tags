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

    this.state = {};

    this.props.actions.fetchTags();
  }

  addTag (event) {

    this.props.actions.createTag({ title: event.target.value });
  }

  renderTable () {
    return (
      <div>
        <Table rows={this.props.tags}>
          <TableKeyDimension
              label="ID"
              rowKey="id" />
          <TableKeyDimension
              label="Title"
              rowKey="title" />
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
        <input
          value={this.state.value}
          onChange={this.addTag.bind(this)} />
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

