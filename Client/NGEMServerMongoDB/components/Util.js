import React from 'react';



class Util {
 // constructor(props){
  //  super(props);
   // this.getOptions=this.getOptions.bind(this);
   //static getOptions=getOptions;
 // }

  getOptions(props) {
    let options= {};
    for(let key in props) {
      if (
        key !== 'children'
        && typeof props[key] !== 'undefined' //exclude undefined ones
        && !key.match(/^on[A-Z]/)     //exclude events
      ) {
        options[key] = props[key];
      }
    }
    return options;
  }

getPropsKey(eventName) {
  return 'on' + eventName
    .replace(/(\:[a-z])/g, $1 => $1.toUpperCase())
    .replace(/^[a-z]/, $1 => $1.toUpperCase())
    .replace(':','')
}

getEvents(events={}, props={}) {
  let prop2EventMap= {};
  for(let key in events) {
    prop2EventMap[this.getPropsKey(key)] = key;
  } 

  let ret = {};
  for(let propName in props) {
    let eventName = prop2EventMap[propName];
    let prop = props[propName];
    if (typeof prop !== 'undefined' && propName.match(/^on[A-Z]/) && eventName) {
      ret[eventName] = prop;
    }
  }

  return ret;
}

typeOf(obj){
    return ({}).toString.call(obj)
        .match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

cloneObject(obj){
  var type = typeOf(obj);
  if (type == 'object' || type == 'array') {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == 'array' ? [] : {};
    for (var key in obj) {
      clone[key] = cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
}

findChild(children=[], childType) {
  let found;
  let childrenArr = React.Children.toArray(children);
  for (let i=0; i<childrenArr.length; i++) {
    let child= childrenArr[i];
    if (child.type.name == childType){
      found = child;
      break;
    }
  }
  return found;
}
    
   
};

export default Util;