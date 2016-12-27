import React from 'react';

import Modal from 'app/components/modal/Modal';

export default class TagEditModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = { tag: { ...props.tag } };
  }

  saveTag () {
    this.props.onSave(this.state.tag);
  }

  updateTagData (fieldKey, event) {
    this.setState({
      tag: {
        ...this.state.tag,
        [fieldKey]: event.target.value
      }
    });
  }

  render () {
    let tag = this.props.tag;

    return (
      <Modal
          containerId="tagEdit"
          title="Edit Tag">
        <label>
          <span>Title</span>
          <input
              value={this.state.tag.title}
              onChange={this.updateTagData.bind(this, 'title')} />
        </label>
        <button onClick={this.saveTag.bind(this)}>Save</button>
      </Modal>
    );
  }
}

TagEditModal.propTypes = {
  onSave: React.PropTypes.func,
  tag: React.PropTypes.object.isRequired
};

