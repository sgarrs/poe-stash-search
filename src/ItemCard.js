import React, { Component } from 'react';
import './ItemCard.scss';
import WeaponCard from './WeaponCard';

// create frame around item, including border icons

class ItemCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;

    let headerBackground = '';
    let rarity = '';
    let l = '';
    let r = '';

    switch(item.frameType) {
      case 1:
        rarity = 'magic';
        headerBackground = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderMagicMiddle.png?scale=1&v=f1b14ee55eec3fdea97d5eef52dfd612&scaleIndex=0';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderMagicLeft.png?scale=1&v=bd01114bdfbf1e7400f30b94e734a651&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderMagicRight.png?scale=1&v=f2144b4e8e8d1b59a6a320dd69eb7163&scaleIndex=0';
        break;
      case 2:
        rarity = 'rare';
        headerBackground = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderRareMiddle.png?scale=1&v=2a9bc46046532795600f120446dafb6c&scaleIndex=0';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderRareLeft.png?scale=1&v=8cddcdac2caa4bb3f3bba08e652b07fd&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderRareRight.png?scale=1&v=9d46a1fb985804f8a1afb8c985458d5b&scaleIndex=0';
        break;
      case 3:
        rarity = 'unique';
        headerBackground = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderUniqueMiddle.png?scale=1&v=c992ff3d42f93942a86a165cb7dbba90&scaleIndex=0';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderUniqueLeft.png?scale=1&v=5f8f17b2da67446b3f38713dfc34ca04&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderUniqueRight.png?scale=1&v=5f6500622ce8d46e5a7e49c20c69a0ca&scaleIndex=0';
        break;
      default:
        rarity = 'normal';
        headerBackground = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderWhiteMiddle.png?scale=1&v=800c88925978db435f458f4fb19c8830&scaleIndex=0';
        l = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderWhiteLeft.png?scale=1&v=7ffe5e9587a0fac4607e0cebf495d66e&scaleIndex=0';
        r = 'http://web.poecdn.com/image/Art/2DArt/UIImages/InGame/ItemsHeaderWhiteRight.png?scale=1&v=216077af6f19c588368fbb0a4099015e&scaleIndex=0';
        break;
    }

    const single = (item.frameType === 2 || item.frameType === 3 || item.isIdentified)
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

//          <img src={l} />
//         <img src={r} />

    return (
      <div className='item-card'>
        <div className={'item-card__header'} id={single}>
          <div className={'item-card__name--' + rarity}>
            <h3>{item.name}</h3>
            <h4>{item.typeLine}</h4>
          </div>
          <WeaponCard item={item} />
        </div>
      </div>
    )
  }
}

export default ItemCard;
