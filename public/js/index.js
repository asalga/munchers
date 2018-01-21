import Entity from './Entity.js';
import Vec2 from './Math.js';
import Compositor from './Compositor.js';
import createMuncher from './Entities.js';
import Timer from './Timer.js';

import { loadJSON } from './loaders.js';
import { loadBackground } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

Promise.all([
        createMuncher(),
        loadBackground(),
        loadJSON('levels/1.json')
    ])
    .then(function([muncher, bkSprites, level]) {

        let timer = new Timer(1 / 60);
        let gravity = 600;
        let compositor = new Compositor();
        let bkLayer = createBackgroundLayer(level.backgrounds, bkSprites);
        let spriteLayer = createSpriteLayer(muncher);

        compositor.layers.push(bkLayer, spriteLayer);

        timer.update = function update(dt) {
            muncher.update(dt);
            muncher.vel.y += gravity * dt;
            compositor.draw(ctx);
        };

        timer.start();
    });