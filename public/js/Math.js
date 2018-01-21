export default class Vec2 {
    constructor(x, y) {
        this.set(x || 0, y || 0);
    }

    set(x, y) {
        [this.x, this.y] = [x, y];
    }
}