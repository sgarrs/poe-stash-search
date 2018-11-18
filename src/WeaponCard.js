import React, { Component } from 'react';

class WeaponCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;

    /* Requiremnts */
    // need to convert this to jsx to bold the number values
    const reqArr = [
      [item.reqLvl, 'lvl'],
      [item.reqStr, 'str'],
      [item.reqDex, 'dex'],
      [item.reqInt, 'int']
    ].filter((req) => req[0] > 0);

    let reqEl = reqArr.length > 0
      ? reqArr.map((req) => {
        let reqType = '';
        switch (req[1]) {
          case 'lvl':
            reqType = 'Level';
            break;
          case 'str':
            reqType = 'Str';
            break;
          case 'dex':
            reqType = 'Dex';
            break;
          case 'int':
            reqType = 'Int';
            break;
        }

        return reqType === 'Level'
          ? <span>{reqType} <b>{req[0]}</b></span>
          : <span><b>{req[0]}</b> {reqType}</span>;
      }).reduce((prev, curr) => [prev, ', ', curr])
      : '';

    const requirements = reqEl.length > 0
      ? (
        <div className='item-card__requirements'>
          Requires {reqEl}
          <hr />
        </div>
      )
      : '';

    /* Properties */
    const damagePhys = <li>{'Physical Damage: ' + item.damagePhys}</li>;
    const damageElemental = <li>{'Elemental Damage: ' + item.damageElemental}</li>;
    const critChance = <li>{'Critical Strike Chance: ' + item.critChance + '%'}</li>;
    const aps = <li>{'Attacks Per Second: ' + item.aps}</li>;

    /* Modifiers */
    const implicitKey = 'implicit-';
    const explicitKey = 'explicit-';
    const implicitMods = (
      <ul className='item-card__modifiers--implicit'>
        {item.implicitMods.map((mod, i) => <li key={implicitKey + i}>{mod}</li>)}
        <hr />
      </ul>
    );
    const explicitMods = item.isIdentified
      ? (
        <ul className='item-card__modifiers--explicit'>
          {item.explicitMods.map((mod, i) => <li key={explicitKey + i}>{mod}</li>)}
        </ul>
      )
      : '';

    return (
      <div className='item-card__body'>
        <ul className='item-card__properties'>
          <li>{item.subCategory}</li>
          <li>{item.quality}</li>
          {item.damagePhys ? damagePhys : ''}
          {item.damageElemental ? damageElemental : ''}
          {item.critChance ? critChance : ''}
          {item.aps ? aps : ''}
        </ul>
        <hr />
        {requirements}
        {implicitMods}
        {explicitMods}
        <div className='item-card__modifiers--corrupted'>
          {item.isCorrupted ? 'Corrupted' : ''}
          {item.isIdentified ? '' : 'Unidentified'}
        </div>
        <hr />
        <p className='item-card__flavourText'>{item.flavourText}</p>
        <div className='item-card__image'>
          <img src={item.icon} />
        </div>
      </div>

    )
  }
}
        /*
        <div className='item-card__data item-card__body--right'>
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
        */
export default WeaponCard;
