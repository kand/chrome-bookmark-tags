import React from 'react';

export default class Bookmark extends React.Component {

  render () {
    return <div>({this.props.bookmark.id}) {this.props.bookmark.title}</div>;
  }
}

