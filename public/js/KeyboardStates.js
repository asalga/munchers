const KEY_DOWN = 1;
const KEY_UP = 0;

export default class KeyboardState {

    constructor(el) {
        this.keyStates = new Map;
        this.keyMap = new Map;
        this.keyQueue = [];

        ['keyup', 'keydown'].forEach(v => {
            el.addEventListener(v, e => this.addToQueue(e));
        });
    }

    addToQueue(e) {
        if (!e) { return; }

        let { code } = e;

        // If we don't have a mapping for this key, we can just return
        if (!this.keyMap.has(code)) {
            return;
        }

        // If we have the key mapped to something, we'll need to 
        // prevent the browser default behaviour.
        e.preventDefault();

        let state = (e.type === 'keydown') ? KEY_DOWN : KEY_UP;

        // If the state hasn't changed, just ignore the event
        if (state === this.keyStates.get(code)) {
            return;
        }
        this.keyStates.set(e.code, e.state);

        e.state = state;

        this.keyQueue.push(e);
    }

    /*
       We can attach a function to any of the keys we require for 
       our use cases.
    */
    mapKey(code, callback) {
        this.keyMap.set(code, callback);
    }

    nextKey() {
        this.handleEvent(this.keyQueue.shift());
    }

    handleEvent(e) {
        if (!e) { return; }

        // console.log('handle event ', e.code, e.state);

        this.keyStates.set(e.code, e.state);

        // At this point we know that we have a function mapped to the event key code
        // and the state just changed, so call the mapped function with the new state
        let func = this.keyMap.get(e.code);
        func(e.state);
    }
}