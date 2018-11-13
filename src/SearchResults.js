import React, { Component } from 'react';
import ItemCard from './ItemCard';
import './SearchResults.scss';

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
      <div className='search-results'>
        {itemResults}
      </div>
    );
  }
}

export default SearchResults;
