import createMuncher from './Entities.js';
import Timer from './Timer.js';
import { loadJSON } from './loaders.js';
import { Board } from './Entity.js';
import { config } from './config.js';
import { primes } from './questions.js';

/*
    - make import more succinct in questions.js at top of file
    - fix kb '1' magic number
*/

let cvs = document.getElementById('screen');
[cvs.width, cvs.height] = [config.gameWidth, config.gameHeight];

let ctx = cvs.getContext('2d');

Promise.all([
        createMuncher()
    ])
    .then(([muncher]) => {

        function clearBackground() {
            ctx.fillStyle = 'rgb(0, 0, 120';
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.lineWidth = 2;
        }

        let board = new Board();
        board.loadQuestions(new primes({
            numValues: board.numCells,
            difficulty: 1,
            ratio: 0.5,
            rangeCorrect: [2, 3, 5, 7, 11],
            rangeIncorrect: [4, 6, 8, 10, 12]
        }));

        muncher.board = board;
        board.addChild(muncher);

        let timer = new Timer(1 / 60);

        timer.update = function update(dt) {
            clearBackground();
            board.update(dt);
            board.draw(ctx);
        };

        timer.start();
    });