import React from 'react';

export default function BookmarkTitleCell (props) {

  return (
    <a
        href={props.row.url}
        target="_blank">
      {props.row.title}
    </a>
  );
};

BookmarkTitleCell.propTypes = {
  row: React.PropTypes.object.isRequired
};

