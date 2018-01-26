import createMuncher from './Entities.js';
import Timer from './Timer.js';
import { loadJSON } from './loaders.js';
import { loadBackground } from './sprites.js';
import { createSpriteLayer } from './layers.js';
import { Board } from './Entity.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

Promise.all([
        createMuncher(),
        loadBackground(),
        loadJSON('levels/1.json')
    ])
    .then(function([muncher, bkSprites, level]) {

        let board = new Board();
        muncher.board = board;
        board.pos.set(10, 10);
        board.createBackgroundLayer(level.backgrounds, bkSprites);
        board.addChild(muncher);

        let timer = new Timer(1 / 60);

        timer.update = function update(dt) {
            board.update(dt);
            board.draw(ctx);
        };

        timer.start();
    });