import Math from './Math.js';

class Question {
    constructor(name) {
        this.name = name;
    }
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
            value: 0
            correct: false
        }
        return a;
    }
}