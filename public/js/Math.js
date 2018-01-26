export class Vec2 {
    constructor(x, y) {
        this.set(x || 0, y || 0);
    }

    set(x, y) {
        [this.x, this.y] = [x, y];
    }
}

export function shuffleArray(array, count) {

    for (let i = 0; i < count; ++i) {
        let first = randomInt(0, array.length - 1);
        let second = randomInt(0, array.length - 1);

        if (first === second) {
            continue;
        }

        // swap
        [array[first], array[second]] = [array[second], array[first]];

        return array;
    }
}


export function randomInt(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

export function sampleArray(arr, cnt) {
    var res = [];
    for (let i = 0; i < cnt; ++i) {
        res.push(arr[randomInt(0, arr.length - 1)]);
    }
    return res;
}