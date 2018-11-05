import React, { Component } from 'react';
import _ from 'lodash';
//import Item from './Item';
import Item from './testItem';

class ItemCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  render() {
//    const test = this.state.items.filter((item) => item.category === 'weapons');
//    console.log(test);
    const searchResult = this.search({subCategory: 'chest', typeLine: 'Astral Plate', frameType: 3}, this.state.items);
    console.log(searchResult);
//    const props = test !== undefined
//      ? test.properties.map((prop) => <li>{prop.name}</li>)
//      : 'props';
    return (
      <ul>test</ul>
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
    return items.filter((item) => {
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
            if (searchObj[key] !== item[key]) {
              result = false;
              break;
            }
            break;
          case 'aps':
          case 'dps':
          case 'critChance':
            if (searchObj[key][0] > item[key] || searchObj[key][1] < item[key]) {
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
  }

  getStashItems(stashArray) {
    const items = _.flatten(stashArray.map((stash) =>
      stash.items.map((item) =>
        Object.assign(item, {accountName: stash.accountName, lastCharacterName: stash.lastCharacterName}))));
    return items.map((item) => new Item(item));
  }
}

export default ItemCollector;
