import createMuncher from './Entities.js';
import Timer from './Timer.js';
import { loadJSON } from './loaders.js';
import { Board } from './Entity.js';
import { config } from './config.js';

let cvs = document.getElementById('screen');
[cvs.width, cvs.height] = [config.gameWidth, config.gameHeight];

let ctx = cvs.getContext('2d');

Promise.all([
        createMuncher(),
        // loadBackground(),
        // loadData(),
        loadJSON('levels/1.json')
    ])
    .then(function([muncher, level]) {

        function clearBackground() {
            ctx.fillStyle = 'rgb(0,0,120';
            ctx.fillRect(0, 0, cvs.width, cvs.height);
            ctx.lineWidth = 2;
        }

        let board = new Board();
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