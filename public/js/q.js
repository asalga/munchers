import { Vec2, randomInt, shuffleArray, sampleArray } from './Math.js';

export function primes1() {
    this.name = "Primes";
    this.difficulty = 1;

    this.total = 25;
    this.ratio = 0.5;
    this.correct = [1, 3, 5, 7];
    this.incorrect = [4, 6, 8, 10];

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

    return shuffleArray(values, 10);
}