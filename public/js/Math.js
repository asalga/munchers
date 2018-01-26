export class Vec2 {
    constructor(x, y) {
        this.set(x || 0, y || 0);
    }

    set(x, y) {
        [this.x, this.y] = [x, y];
    }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function sampleArray(arr) {
    return arr[randomInt(0, arr.length - 1)];
}

export function randomInt(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}