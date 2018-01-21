import Entity from './Entity.js';
import Vec2 from './Math.js';
import Compositor from './Compositor.js';
import createMuncher from './Entities.js';

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
    .then(function([muncher, bkSprites , level]) {

        let delta = 0.01666;
        let gravity = 20;
        let compositor = new Compositor();
        let bkLayer = createBackgroundLayer(level.backgrounds, bkSprites);
        let spriteLayer = createSpriteLayer(muncher);

        compositor.layers.push(bkLayer, spriteLayer);

        function update() {
            muncher.update();
            muncher.vel.y += gravity * delta;

            compositor.draw(ctx);
            // requestAnimationFrame(update);
            setTimeout( update, 1000/60)
        }
        update();
    });