import { Vec2 } from './Math.js';
import { shuffleArray } from './Math.js';
import { randomInt } from './Math.js';

class Question {
    constructor(name) {
        this.name = name;
    }
}

function sampleArray(arr) {
    return arr[randomInt(0, arr.length - 1)];
}

export function primes1() {
    this.name = "Primes";
    this.difficulty = 1;

    this.total = 25;
    this.ratio = 0.5;
    this.correct = [1, 3, 5, 7];
    this.incorrect = [4, 6, 8, 10];

    let correctCount = Math.floor(this.ratio * this.total);
    // console.log(correctCount);

    let values = [];
    for (let i = 0; i < correctCount; ++i) {
        values.push(sampleArray(this.correct));
    }
    console.log(values);

    for (let i = 0; i < this.total - correctCount; ++i) {
        values.push(sampleArray(this.incorrect));
    }

    return shuffleArray(values, 10);
}



class Primes1 extends Question {
    constructor() {
        super('Prime Numbers');
        this.difficulty = 1;

        this.ratio = 0.5;

        this.correct = [1, 3, 5, 7];
        this.incorrect = [4, 6, 8, 10];
    }

    getValues(total) {
        var numCorrect = Math.floor(total * this.ratio);
    }

    getNext() {

        let a = {
            value: 0,
            correct: false
        }
        return a;
    }
}