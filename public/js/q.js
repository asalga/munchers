import { Vec2, randomInt, shuffleArray, sampleArray } from './Math.js';

/*
    cfg 
        - Array rangeCorrect
        - Array rangeIncorrect
*/
export function primes(cfg) {
    this.name = "Primes";
    this.difficulty = 1;

    this.total = cfg.total || 25;
    this.ratio = cfg.ratio
    this.correct = cfg.rangeCorrect;
    this.incorrect = cfg.rangeIncorrect

    let correctCount = Math.floor(this.ratio * this.total);

    let values = [];
    for (let i = 0; i < correctCount; ++i) {
        values.push({
            value: sampleArray(this.correct),
            isCorrect: true
        });
    }

    for (let i = 0; i < this.total - correctCount; ++i) {
        values.push({
            value: sampleArray(this.incorrect),
            isCorrect: false
        });
    }

    return shuffleArray(values, 100);
}