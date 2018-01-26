const KEY_DOWN = 1;
const KEY_UP = 0;

// Add mute?
export default class KeyboardState {
    constructor(el) {
        this.keyStates = new Map;
        this.keyMap = new Map;

        ['keyup', 'keydown'].forEach(v => {
            el.addEventListener(v, e => this.handleEvent(e));
        });
    }

    /*
       We can attach a function to any of the keys we require for 
       our use cases.
    */
    mapKey(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(e) {
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
        this.keyStates.set(code, state);

        // At this point we know that we have a function mapped to the event key code
        // and the state just changed, so call the mapped function with the new state
        let func = this.keyMap.get(code);
        func(state);
    }
}