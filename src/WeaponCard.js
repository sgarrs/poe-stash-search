import React, { Component } from 'react';
import './WeaponCard.scss';

class WeaponCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;

    /* Requiremnts */
    // need to convert this to jsx to bold the number values

    /* Properties */
    const damagePhys = <li>Physical Damage: <span className='damage__type--physical'><b>{item.damagePhys}</b></span></li>;
    const damageElemental = <li>Elemental Damage: {WeaponCard.getElementalDamageMarkup(item)}</li>;
    const damageChaos = <li>Chaos Damage: <span className='damage__type--chaos'><b>{item.damageChaos}</b></span></li>;
    const critChance = <li>Critical Strike Chance: <b>{item.critChance + '%'}</b></li>;
    const aps = <li>Attacks Per Second: <b>{item.aps}</b></li>;
    const range = <li>Weapon Range: <b>{item.range}</b></li>;

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
          {item.damageFire || item.damageCold || item.damageLightning ? damageElemental : ''}
          {item.damageChaos ? damageChaos : ''}
          {item.critChance ? critChance : ''}
          {item.aps ? aps : ''}
          {item.range ? range : ''}
        </ul>
        <hr />
        {item.requirements.length > 0 ? WeaponCard.getRequirementMarkup(item) : ''}
        {item.implicitMods.length > 0 ? implicitMods : ''}
        {item.explicitMods.length > 0 ? explicitMods : ''}
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

  static getElementalDamageMarkup(item) {
    const dmgArr = [
      [item.damageFire, 'fire'],
      [item.damageCold, 'cold'],
      [item.damageLightning, 'lightning'],
    ].filter((dmg) => dmg[0]);

    let dmgEl = dmgArr.length > 0
      ? dmgArr.map((dmg, i) =>
          <span key={'dmgEle-' + i} className={'damage__type--' + dmg[1]}><b>{dmg[0]}</b></span>
        ).reduce((prev, curr) => [prev, ', ', curr])
      : '';

    return <span>{dmgEl}</span>;
  }

  static getRequirementMarkup(item) {
    const reqArr = [
      [item.reqLvl, 'lvl'],
      [item.reqStr, 'str'],
      [item.reqDex, 'dex'],
      [item.reqInt, 'int']
    ].filter((req) => req[0] > 0);

    let reqEl = reqArr.length > 0
      ? reqArr.map((req, i) => {
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
          ? <span key={'req-' + i}>{reqType} <b>{req[0]}</b></span>
          : <span key={'req-' + i}><b>{req[0]}</b> {reqType}</span>;
      }).reduce((prev, curr) => [prev, ', ', curr])
      : '';

    return (
      <div className='item-card__requirements'>
        Requires {reqEl}
        <hr />
      </div>
    );
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
