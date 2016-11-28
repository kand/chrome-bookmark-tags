import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TagActions from 'app/actions/TagActions';
import TableDimension from 'app/components/table/TableDimension';

class TagToolsDimension extends TableDimension {

  renderValue (row) {
    return (
      <span>
        <button onClick={this.props.actions.deleteTag.bind(null, row.id)}>delete</button>
      </span>
    );
  }
};

export default connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(TagActions, dispatch) })
)(TagToolsDimension);

