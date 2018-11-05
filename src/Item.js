import _ from 'lodash';
//const request = require('request');

class Item {
  constructor(data, id) {
  // general
    //    this.icon = Item.getItemImage(data.icon);
    this.league = data.league; // do I need this?

    this.name = Item.cleanMarkup(data.name);
    this.typeLine = Item.cleanMarkup(data.typeLine);

    this.category = Object.getOwnPropertyNames(data.category).join();
    this.subCategory = Object.values(data.category)[0];
    this.ilvl = data.ilvl;

    this.identified = Boolean(data.identified);
    this.corrupted = Boolean(data.corrupted);
    this.elder = Boolean(data.elder);
    this.shaper = Boolean(data.shaper);
    this.isRelic = Boolean(data.isRelic);
    this.support = Boolean(data.support);
  // item props & mods
    // frameType
      // 0 normal
      // 1 magic
      // 2 rare
      // 3 unique
      // 4 gem
      // 5 currency
      // 6 div card
      // 7 quest item
      // 8 prophecy
      // 9 relic
    this.frameType = Number(data.frameType);

    this.requirements = [].concat(data.requirements);
    this.reqLvl = Number(this.getRequirementValue('Level'));
    this.reqStr = Number(this.getRequirementValue('Str'));
    this.reqInt = Number(this.getRequirementValue('Int'));
    this.reqDex = Number(this.getRequirementValue('Dex'));

    this.properties = [].concat(Item.addQuality(data.properties));
    this.damagePhys = this.getPropertyValue(9)
    this.damageChaos = this.getPropertyValue(11);
    this.damageFire = this.getElementalDamage(4);
    this.damageCold = this.getElementalDamage(5);
    this.damageLightning = this.getElementalDamage(6);
    this.damageElemental = this.getDamage(true);
    this.damage = this.getDamage();
    this.critChance = this.getPropertyValue(12);
    this.aps = this.getPropertyValue(13);
    this.range = this.getPropertyValue(14);

    this.block = this.getPropertyValue(15);
    this.armour = this.getPropertyValue(16);
    this.evasion = this.getPropertyValue(17);
    this.energyShield = this.getPropertyValue(18);

    this.dps = this.getDps(this.damage);
    this.pdps = this.getDps(this.damagePhys);
    this.edps = this.getDps(this.damageElemental);


    this.modifiers = {
      implicit: data.implicitMods,
      explicit: data.explicitMods
    };

    this.additionalProperties = data.additionalProperties;

    this.socketDetails = data.sockets;
    this.sockets = [].concat(this.socketDetails).length;
    this.socketsGreen = Number(this.getSocketColorNumber('G'));
    this.socketsBlue = Number(this.getSocketColorNumber('B'));
    this.socketsRed = Number(this.getSocketColorNumber('R'));
    this.socketsWhite = Number(this.getSocketColorNumber('W'));
    this.socketsAbyssal = Number(this.getSocketColorNumber('A'));
    this.socketedItems = (data.socketedItems) ? data.socketedItems : [];
    this.stackSize = data.stackSize;
    this.maxStackSize = data.maxStackSize;
    this.artFilename = data.artFilename;

  // stash info
    this.inventoryId = data.inventoryId;
    this.stashId = id;
    this.id = data.id;
    this.price = data.note;
    this.x = data.x;  // x pos in stash
    this.y = data.y;  // y pos in stash
    this.w = data.w;  // slot width
    this.h = data.h;  // slot height
  }

  getDps(damage) {
    const dmg = String(damage);
    const regex = /-/g;
    const separator = dmg.search(regex);
    const dmgMin = dmg.slice(0, separator);
    const dmgMax = dmg.slice(separator + 1);
    return ((Number(dmgMin) + Number(dmgMax)) / 2) * Number(this.aps);
    //return ((Number(dmgMin) + Number(dmgMax) / 2) * Number(this.aps));
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
    dmgArray.forEach((dmg) => {
      if (dmg) {
        dmg = String(dmg);
        const regex = /-/g;
        const separator = dmg.search(regex);
        const dmgMin = dmg.slice(0, separator);
        const dmgMax = dmg.slice(separator + 1);
        totalMin += Number(dmgMin);
        totalMax += Number(dmgMax);
      }
    });

    if (totalMin && totalMax) {
      return totalMin + '-' + totalMax;
    }
    else return undefined;
  }

  getElementalDamage(type, arr = this.getPropertyValue(10)) {
    if (arr) {
      const match = arr.filter((value) => {
        return value[1] === type;
      });
      const matchValue = [].concat(match[0]);
      return matchValue[0];
    }
  }

  getPropertyValue(type, arr = this.properties) {
    const match = arr.filter((prop) => {
      if (prop !== undefined) {
        const propObj = Object.assign({}, prop);
        return propObj.type === type;
      }
    });
    const matchObj = Object.assign({}, match[0]);
    const matchValue = [].concat(matchObj.values);

    if (matchObj.type === 10) {
      return matchValue;
    } else {
      return _.flatten(matchValue)[0];
    }
  }

  getRequirementValue(name, arr = this.requirements) {
    const match = arr.filter((req) => {
      const reqObj = Object.assign({}, req);
      return reqObj.name === name;
    });
    // each object/array is missing prototype methods
    // why???
    const matchObj = Object.assign({}, match[0]);
    const matchValue = [].concat(matchObj.values);
    const value = [].concat(matchValue[0])
    return value[0];
  }

  static generic(mod) {
    const digitString = /(\d+(\.\d+)?)/;
    const toString = /\s\d+\s(to)\s\d+\s/;

    const regexArray = [toString, digitString];
    let matchedRegex = regexArray.filter((r) => r.test(mod))[0];

    switch (matchedRegex) {
      case toString:
        return String(mod).replace(toString, ' x to x ');
      case digitString:
        return String(mod).replace(digitString, 'x');
      default:
        return String(mod);
    }
  }

  static addQuality(props) {
    const qualityProp = {
      name: 'Quality ',
      values: [ [ '0%', 1 ] ],
      displayMode: 0,
      type: 6
    };

    // is quality prop always at index 1?
    if (props && props.length > 1 && props[1].name === 'Quality') {
      return props;
    } else if (props && props.length > 1) {
      return [props[0], qualityProp].concat(props.slice(1));
    }
  };

  // clean item name from markup prefix
  static cleanMarkup(text) {
    const matchMarkup = /^[\w\d<>:]+>>/;

    if (matchMarkup.test(text)) {
      return text.replace(matchMarkup, '');
    }

    return text;
  }

  // return image data from href to poe cdn
  static getItemImage(uri) {
    return request.get(uri, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        return "data:" +
          res.headers["content-type"] +
          ";base64," +
          new Buffer(body).toString('base64');
      }
    });
  }

  static getGemExpPercent(addProps) {
    const [cur, max] = (addProps && addProps[0] && addProps[0].name === 'Experience')
      ? addProps[0].values[0][0].split('/')
      : '';
    return cur / max;
  }

  getSocketColorNumber(color, details = this.socketDetails) {
    // this.socketDetails is initially non-iterable
    details = [].concat(details).map((obj) => new Object(obj));
    let count = 0;
    for (let i = 0; i < details.length; i++) {
      if (details[i].sColour === color)
        count++;
    }
    return count;
  }
};

export default Item;
