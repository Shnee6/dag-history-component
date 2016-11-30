const EVENT_MATCHERS = {
  HTMLEvents: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/,
};

const DEFAULT_OPTIONS = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true,
};

function extend(destination, source) {
  for (let property in source) {
    destination[property] = source[property];
  }
  return destination;
}

//
// From http://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
//
export default function simulate(element, eventName, opts = {}) {
  const options = extend(DEFAULT_OPTIONS, opts);
  let oEvent = null;
  let eventType = null;

  for (let name in EVENT_MATCHERS) { //eslint-disable-line
    if (EVENT_MATCHERS[name].test(eventName)) {
      eventType = name;
      break;
    }
  }

  if (!eventType) {
    throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
  }

  if (document.createEvent) {
    oEvent = document.createEvent(eventType);
    if (eventType === 'HTMLEvents') {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      oEvent['initMouseEvent'](eventName, options.bubbles, options.cancelable, document.defaultView,
      options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
    }
    element.dispatchEvent(oEvent);
  } else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    const evt = document['createEventObject']();
    oEvent = extend(evt, options);
    element.fireEvent(`on${eventName}`, oEvent);
  }
  return element;
}