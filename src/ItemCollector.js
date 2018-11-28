import React, { Component } from 'react';
import _ from 'lodash';
//import Item from './Item';
import Item from './Item';
import SearchResults from './SearchResults';

class ItemCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchResults: []
    };
  }

  render() {
//    const test = this.state.items.filter((item) => item.category === 'weapons');
//    console.log(test);
//    const searchResult = this.search({
//        subCategory: 'boots'
//      }, this.state.items);
//    console.log(searchResult);
//    const props = test !== undefined
//      ? test.properties.map((prop) => <li>{prop.name}</li>)
//      : 'props';
    const searchObj = {
      subCategory: 'onesword',
      edps: [100]
    };

    return (
      <div>
        <button onClick={() => this.search(searchObj, this.state.items)}>Search</button>
        <SearchResults itemResults={this.state.searchResults} />
      </div>
    )
  }

  componentDidMount() {
    this.setState((state) => ({
      items: this.getStashItems(this.props.stashes)
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.stashes !== this.props.stashes) {
      this.setState((state) => ({
        items: this.getStashItems(this.props.stashes)
      }));
    }
  }

  search(searchObj, items) {
    const searchKeys = Object.keys(searchObj);
    const searchResults = items.filter((item) => {
      let result = true;
      for (let key of searchKeys) {
        switch (key) {
          case 'name':
          case 'typeLine':
          case 'isCorrupted':
          case 'isIdentified':
          case 'isElder':
          case 'isShaper':
          case 'isRelic':
          case 'isSupport':
          case 'frameType':
          case 'category':
          case 'subCategory':
          case 'ilvl':
          case 'reqLvl':
          case 'reqStr':
          case 'reqDex':
          case 'reqInt':
          case 'stash':
          case 'verified':
          case 'note':
          case 'stash':
          case 'buyout':
            if (searchObj[key] !== item[key]) {
              result = false;
              break;
            }
            break;

          case 'damagePhysMin':
          case 'damagePhysMax':
          case 'damageChaosMin':
          case 'damageChaosMax':
          case 'damageFireMin':
          case 'damageFireMax':
          case 'damageColdMin':
          case 'damageColdMax':
          case 'damageLightningMin':
          case 'damageLightningMax':
          case 'damageElementalMin':
          case 'damageElementalMax':
          case 'damageMin':
          case 'damageMax':
          case 'aps':
          case 'dps':
          case 'pdps':
          case 'edps':
          case 'critChance':
          case 'block':
          case 'armour':
          case 'evasion':
          case 'energyShield':
            // ! need to account for searchObj min/max value to be undefined
            if (!searchObj[key][0] && searchObj[key][1]) {
              result = searchObj[key][1] < item[key] ? false : true;
              break;
            } else if (searchObj[key][0] && !searchObj[key][1]) {
              result = searchObj[key][0] > item[key] ? false : true;
              break;
            } else if (searchObj[key][0] > item[key] || searchObj[key][1] < item[key]) {
              result = false;
              break;
            }
            break;

          default:
            if (searchObj[key] > item[key]) {
              result = false;
              break;
            }
            break;
        }
      }
      return result;
    });

    this.setState((state) => ({
      searchResults: searchResults
    }));
  }

  getStashItems(stashArray) {
    const items = _.flatten(stashArray.map((stash) =>
      stash.items.map((item) => {
        return Object.assign(item,
          {
            accountName: stash.accountName,
            lastCharacterName: stash.lastCharacterName,
            stash: stash.stash
          }
        )
      })
    ));
    return items.map((item) => new Item(item));
  }
}

export default ItemCollector;
