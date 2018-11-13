import React, { Component } from 'react';
import './ItemCard.scss';

class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;

    let rarity = '';
    let l = '';
    let r = '';
    switch(item.frameType) {
      case 1:
        rarity = 'magic';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderMagicLeft.png?scale=1&v=bd01114bdfbf1e7400f30b94e734a651&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderMagicRight.png?scale=1&v=f2144b4e8e8d1b59a6a320dd69eb7163&scaleIndex=0';
        break;
      case 2:
        rarity = 'rare';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderRareLeft.png?scale=1&v=8cddcdac2caa4bb3f3bba08e652b07fd&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderRareRight.png?scale=1&v=9d46a1fb985804f8a1afb8c985458d5b&scaleIndex=0';
        break;
      case 3:
        rarity = 'unique';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderUniqueLeft.png?scale=1&v=5f8f17b2da67446b3f38713dfc34ca04&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderUniqueRight.png?scale=1&v=5f6500622ce8d46e5a7e49c20c69a0ca&scaleIndex=0';
        break;
      default:
        rarity = 'normal';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderWhiteLeft.png?scale=1&v=7ffe5e9587a0fac4607e0cebf495d66e&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderWhiteRight.png?scale=1&v=216077af6f19c588368fbb0a4099015e&scaleIndex=0';
        break;
    }

    const single = (item.frameType === 2 || item.frameType === 3 || item.identified)
      ? ''
      : 'single';

    const leftSrc = l;
    const rightSrc = r;
/*    const leftHeaderStyle = {
      backgroundImage: 'url(' + l + ')'
    };
    const rightHeaderStyle = {
      backgroundImage: 'url(' + r + ')'
    };
*/
//          <div className='item-card__header--left' id={single} style={leftHeaderStyle}>&nbsp;</div>
//          <div className='item-card__header--right' id={single} style={rightHeaderStyle}>&nbsp;</div>
    return (
      <div className='item-card'>
        <div className={'item-card__header'}>
          <img src={l} />
          <div className={'item-card__name--' + rarity} id={single}>
              <h3>{item.name}</h3>
              <h4>{item.typeLine}</h4>
          </div>
          <img src={r} />
        </div>
          <ul className='item-card__requirements'>
              <li><b>Level:</b> {item.reqLvl}</li>
              <li><b>Str:</b> {item.reqStr}</li>
              <li><b>Dex:</b> {item.reqDex}</li>
              <li><b>Int:</b> {item.reqInt}</li>
          </ul>
        <div className='item-card__body'>
          <div className='item-card__image'>
            <img src={item.icon} />
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
        </div>
      </div>
    )
  }
}

export default ItemCard;
