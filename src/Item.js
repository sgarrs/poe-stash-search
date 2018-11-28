import _ from 'lodash';

class Item {
  constructor (item) {
    this.fullItem = item;
    this.accountName = item.accountName ? item.accountName : '';
    this.lastCharacterName = item.lastCharacterName ? item.lastCharacterName : '';
    this.note = item.note ? item.note : '';
    this.stash = item.stash ? item.stash : '';
    this.inventoryId = item.inventoryId ? item.inventoryId : '';
    this.price = Item.getPrice(this.stash, this.note);
    this.verified = item.verified ? item.verified : false;
    this.x = item.x ? item.x : undefined;
    this.y = item.y ? item.y : undefined;
    this.w = item.w ? item.w : undefined;
    this.h = item.h ? item.h : undefined;
    this.icon = item.icon ? item.icon : undefined

    this.name = Item.cleanMarkup(item.name);
    this.typeLine = Item.cleanMarkup(item.typeLine);
    this.flavourText = item.flavourText ? item.flavourText : [];
//    this.flavourText = Item.cleanMarkup(item.flavourText);

    this.isCorrupted = item.corrupted ? true : false;
    this.isIdentified = item.identified ? true : false;
    this.isElder = item.elder ? true : false;
    this.isShaper = item.shaper ? true : false;
    this.isRelic = item.isRelic ? true : false;
    this.isSupport = item.support ? true : false;

    this.frameType = item.frameType ? item.frameType : undefined;
    this.category = item.category ? Object.getOwnPropertyNames(item.category).join() : undefined;
    this.subCategory = item.category ? Object.values(item.category)[0].join() : undefined;
    this.ilvl = item.ilvl ? item.ilvl : 0;
    this.talismanTier = item.talismanTier ? item.talismanTier : 0;

    this.requirements = item.requirements ? item.requirements : [];
    this.reqLvl = this.getRequirementValue('Level');
    this.reqStr = this.getRequirementValue('Str');
    this.reqInt = this.getRequirementValue('Int');
    this.reqDex = this.getRequirementValue('Dex');

    this.properties = item.properties ? item.properties : [];

    this.damagePhys = this.getPropertyValue(9)
    this.damageChaos = this.getPropertyValue(11);
    this.damageFire = this.getElementalDamage(4);
    this.damageCold = this.getElementalDamage(5);
    this.damageLightning = this.getElementalDamage(6);
    this.damageElemental = this.getDamage(true);
    this.damage = this.getDamage();

    this.damagePhysMin = Item.getDamageMinMax(this.damagePhys)[0];
    this.damagePhysMax = Item.getDamageMinMax(this.damagePhys)[1];
    this.damageChaosMin = Item.getDamageMinMax(this.damageChaos)[0];
    this.damageChaosMax = Item.getDamageMinMax(this.damageChaos)[1];
    this.damageFireMin = Item.getDamageMinMax(this.damageFire)[0];
    this.damageFireMax = Item.getDamageMinMax(this.damageFire)[1];
    this.damageColdMin = Item.getDamageMinMax(this.damageCold)[0];
    this.damageColdMax = Item.getDamageMinMax(this.damageCold)[1];
    this.damageLightningMin = Item.getDamageMinMax(this.damageLightning)[0];
    this.damageLightningMax = Item.getDamageMinMax(this.damageLightning)[1];
    this.damageElementalMin = Item.getDamageMinMax(this.damageElemental)[0];
    this.damageElementalMax = Item.getDamageMinMax(this.damageElemental)[1];
    this.damageMin = Item.getDamageMinMax(this.damage)[0];
    this.damageMax = Item.getDamageMinMax(this.damage)[1];

    this.critChance = this.getPropertyValue(12);
    this.aps = this.getPropertyValue(13);
    this.range = this.getPropertyValue(14);
    this.dps = this.getDps(this.damage);
    this.pdps = this.getDps(this.damagePhys);
    this.edps = this.getDps(this.damageElemental);

    this.block = this.getPropertyValue(15);
    this.armour = this.getPropertyValue(16);
    this.evasion = this.getPropertyValue(17);
    this.energyShield = this.getPropertyValue(18);

    this.implicitMods = item.implicitMods ? item.implicitMods : [];
    this.explicitMods = item.explicitMods ? item.explicitMods : [];
  }

  getDps(damage) {
    const range = Item.getDamageMinMax(damage);
    if (range[0] !== 0 && this.aps) {
      return (((range[0] + range[1]) / 2) * Number(this.aps)).toFixed(2);
    }
    else return 0;
  }

  static getDamageMinMax(damage) {
    if (damage) {
      const regex = /-/g;
      const separator = damage.search(regex);
      const dmgMin = Number(damage.slice(0, separator));
      const dmgMax = Number(damage.slice(separator + 1));
      return [dmgMin, dmgMax];
    }
    else return [0, 0];
  }

  getDamage(eleOnly = false) {
    let totalMin = 0;
    let totalMax = 0;
    let dmgArray;
    if (eleOnly) {
      dmgArray = [ this.damageFire, this.damageCold, this.damageLightning, this.damageChaos ];
    } else {
      dmgArray = [ this.damagePhys, this.damageFire, this.damageCold, this.damageLightning, this.damageChaos ];
    }
    dmgArray.forEach((damage) => {
      if (damage) {
        const range = Item.getDamageMinMax(damage);
        totalMin += range[0];
        totalMax += range[1];
      }
    });

    if (totalMin && totalMax) {
      return totalMin + '-' + totalMax;
    }
    else return "";
  }

  getElementalDamage(type, arr = this.getPropertyValue(10)) {
    if (arr) {
      const match = arr.filter((value) => value[1] === type)[0];
      return match ? match[0] : 0;
    }
    else return 0;
  }

  getPropertyValue(type, arr = this.properties) {
    const match = arr.filter((prop) => prop.type === type)[0];
    if (match) {
      const value = match.values;
      if (match.type === 10) { // if property is 'Quality'
        return value;
      } else {
        const returnValue = _.flatten(value)[0];
        if (type === 12) {
          return Number(returnValue.slice('%')[0]);
        } else {
          return (type === 13 || type === 14 || type === 16 || type === 17 || type === 18)
            ? Number(returnValue)
            : returnValue;
        }
      }
    }
    else return 0;
  }

  getRequirementValue(name, arr = this.requirements) {
    const match = arr.filter((req) => req.name === name);
    return match.length > 0
      ? Number(match[0].values[0][0])
      : 0;
  }

  // clean item name from markup prefix
  static cleanMarkup(text) {
    const matchMarkup = /^[\w\d<>:]+>>/;
    if (matchMarkup.test(text)) {
      return text.replace(matchMarkup, '');
    }
    return text;
  }

  static getPrice(stash, note) {
    const buyoutStr = '~b/o'
    const priceStr = '~price'
    const buyoutStash = stash.indexOf(buyoutStr);
    const buyoutNote = note.indexOf(buyoutStr);
    const priceStash = stash.indexOf(priceStr);
    const priceNote = note.indexOf(priceStr);
    if (buyoutNote > -1) {
      return note.slice(buyoutNote + 5); // 5 = string length of '~b/o '
    } else if (buyoutStash > -1) {
      return stash.slice(buyoutStash + 5); // 5 = string length of '~b/o '
    } else if (priceNote > -1) {
      return note.slice(priceNote + 7); // 7 = string length of '~price '
    } else if (priceStash > -1) {
      return stash.slice(priceStash + 7); // 7 = string length of '~price '
    } else return 'no price';
  }

}

export default Item;
