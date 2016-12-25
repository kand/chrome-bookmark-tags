import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TagActions from 'app/actions/TagActions';
import { store } from 'Store';

export default class TagSearch extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      searchResults: []
    };
  }

  searchTags (event) {
    event.preventDefault();

    let term = event.target.value;
    let tagsEntities = store.getState().tags.entities;

    let results = [];
    if (term) {
      results = tagsEntities.allIds
        .map(id => tagsEntities.byId[id])
        .filter(tag => {
          return tag.title.includes(term);
        })
        .slice(0, 5);
    }

    this.setState({ searchResults: results });
  }

  renderResults () {
    return (
      <ul>
        {
          this.state.searchResults.map(tag => {
            return (
              <li key={tag.id}>
                <button onClick={this.props.onSelect.bind(null, tag)}>{tag.title}</button>
              </li>
            );
          })
        }
      </ul>
    );
  }

  render () {
    return (
      <div>
        <input onChange={this.searchTags.bind(this)} />
        {this.renderResults()}
      </div>
    );
  }
}

TagSearch.propTypes = {
  onSelect: React.PropTypes.func
};

