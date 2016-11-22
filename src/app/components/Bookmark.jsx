import React from 'react';

export default class Bookmark extends React.Component {

  render () {
    return (
      <a
          href={this.props.bookmark.url}
          target="_blank">
        ({this.props.bookmark.id})
        ({this.props.bookmark.path})
        {this.props.bookmark.title}
      </a>
    );
  }
}

