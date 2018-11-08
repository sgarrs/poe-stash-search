import React, { Component } from 'react';

class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;

    let rarity = '';
    switch(item.frameType) {
      case 1:
        rarity = 'rare';
        break;
      case 3:
        rarity = 'unique';
        break;
      default:
        rarity = 'normal';
        break;
    }

    return (
      <div className='item-card'>
        <div className={'item-card__header--' + rarity}>
          <h1>{item.name}</h1>
          <h2>{item.typeLine}</h2>
          <p>{item.flavourText}</p>
        </div>
        <div className='item-card__data'>
          <ul className='item-card__data--damage'>
            <li><b>Quality</b></li>
            <li><b>Phys.:</b> {item.damagePhys}</li>
            <li><b>Elem.:</b> {item.damageElemental}</li>
            <li><b>APS:</b> {item.aps}</li>
            <li><b>DPS:</b> {item.dps}</li>
            <li><b>pDPS:</b> {item.pdps}</li>
            <li><b>eDPS:</b> {item.edps}</li>
          </ul>
          <ul className='item-card__data--armour'>
            <li><b>Armour:</b> {item.armour}</li>
            <li><b>Evasion:</b> {item.evasion}</li>
            <li><b>Block:</b> {item.block}</li>
            <li><b>Shield:</b> {item.energyShield}</li>
            <li><b>Crit:</b> {item.critChance}</li>
          </ul>
        </div>
        <hr />
      </div>
    )
  }
}

export default ItemCard;
