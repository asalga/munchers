const KEY_DOWN = 1;
const KEY_UP = 0;

export default class KeyboardState {
    constructor() {
        this.keyStates = new Map;
        this.keyMap = new Map;
    }

    /*
       We can attach a function to any of the keys we require for 
       our use cases.
    */
    addMapping(code, callback) {
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

    listenTo(el) {
        el.addEventListener('keydown', e => this.handleEvent(e));
        el.addEventListener('keyup', e => this.handleEvent(e));
    }
}