import { Vec2, randomInt, shuffleArray, sampleArray } from './Math.js';

/*
    cfg 
    - Number difficulty
    - Number ratio - normalized value that defines how many correct 
                    vs. incorrect values there are  0.5 means half 
                    the values on the board will be correct
    - Array rangeCorrect - change? to function?
    - Array rangeIncorrect - change? to function?
*/
export function primes(cfg) {
    this.name = "Primes";
    this.errorMessage = ' is not a prime number.';

    this.difficulty = cfg.difficulty;
    this.total = cfg.numValues;
    this.ratio = cfg.ratio
    this.correctValues = cfg.rangeCorrect;
    this.incorrectvalues = cfg.rangeIncorrect

    let correctCount = Math.floor(this.ratio * this.total);

    let values = [];
    for (let i = 0; i < correctCount; ++i) {
        values.push({
            value: sampleArray(this.correctValues),
            isCorrect: true
        });
    }

    for (let i = 0; i < this.total - correctCount; ++i) {
        values.push({
            value: sampleArray(this.incorrectvalues),
            isCorrect: false
        });
    }
    values = shuffleArray(values);
    this.curr = -1;

    this.getNext = function() {
        this.curr++;
        return {
            value: values[this.curr].value,
            isCorrect: values[this.curr].isCorrect
        };
    }
}