export default class Vec2 {
    constructor(x, y) {
        this.set(x || 0, y || 0);
    }

    set(x, y) {
        [this.x, this.y] = [x, y];
    }
}

function randomInt(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

export function sampleArray(arr, cnt) {
    var res = [];
    for (let i = 0; i < cnt; ++i) {
        res.push(arr[randomInt(0, arr.length - 1)]);
    }
    return res;
}