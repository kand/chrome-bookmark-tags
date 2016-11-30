import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TagActions from 'app/actions/TagActions';
import TableDimension from 'app/components/table/TableDimension';
import Modal from 'app/components/modal/Modal';

class TagToolsDimension extends TableDimension {

  constructor (props) {
    super(props);
    this.state = { editModalOpen: false };
  }

  openEditModal () {
    this.setState({ editModalOpen: true });
  }

  renderEditModal (tag) {

    if (this.state.editModalOpen) {
      return (
        <Modal
            containerId="tagEdit"
            title="Edit Tag">
          {tag.id}
          {tag.title}
        </Modal>
      );
    }
  }

  renderValue (tag) {
    return (
      <span>
        <button onClick={this.props.actions.deleteTag.bind(null, tag.id)}>delete</button>
        <button onClick={this.openEditModal.bind(this)}>edit</button>

        {this.renderEditModal(tag)}
      </span>
    );
  }
};

export default connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(TagActions, dispatch) })
)(TagToolsDimension);

