import React from 'react';

class Tag extends React.Component {

  render () {

    return <span>{this.props.tag.title}</span>;
  }
}

Tag.propTypes = {
  tag: React.PropTypes.object.isRequired
};

