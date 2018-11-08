import React, { Component } from 'react';
import ItemCard from './ItemCard';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const itemKey = 'ItemCard-';
    const itemResults = this.props.itemResults.map((item, i) => <ItemCard key={itemKey + i} item={item} />);
    return (
      <ul>
        {itemResults}
      </ul>
    );
  }
}

export default SearchResults;
