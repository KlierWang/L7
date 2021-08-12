import Event from './Event';

const wevents = new WeakMap();

export default class EventTarget {
  constructor() {
    wevents.set(this, {});
  }

  public addEventListener(type: string, listener: any, options: any = {}) {
    let events = wevents.get(this);

    if (!events) {
      events = {};
    }
    if (!events[type]) {
      events[type] = [];
    }
    events[type].push(listener);
    wevents.set(this, events);

    if (options.capture) {
      // console.warn('EventTarget.addEventListener: options.capture is not implemented.')
    }
    if (options.once) {
      // console.warn('EventTarget.addEventListener: options.once is not implemented.')
    }
    if (options.passive) {
      // console.warn('EventTarget.addEventListener: options.passive is not implemented.')
    }
  }

  public removeEventListener(type: string, listener: any, options = {}) {
    const events = wevents.get(this);

    if (events) {
      const listeners = events[type];

      if (listeners && listeners.length > 0) {
        for (let i = listeners.length; i--; i > 0) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  public dispatchEvent(event: Event) {
    const listeners = wevents.get(this)[event.type];

    if (listeners) {
      for (const item of listeners.length) {
        item(event);
      }
    }
  }
}