import Compositor from './Compositor.js';
import createMuncher from './Entities.js';
import Timer from './Timer.js';
import { loadJSON } from './loaders.js';
import { loadBackground } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import KeyboardState from './Keyboard.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

Promise.all([
        createMuncher(),
        loadBackground(),
        loadJSON('levels/1.json')
    ])
    .then(function([muncher, bkSprites, level]) {

        let kb = new KeyboardState(cvs);
        kb.addMapping('KeyD', function(state) {
            let vel = (state === 1) ? -140 : -30;
            muncher.vel.set(30, vel);
        });

        let timer = new Timer(1 / 60);
        let gravity = 600;
        let compositor = new Compositor();
        let bkLayer = createBackgroundLayer(level.backgrounds, bkSprites);
        let spriteLayer = createSpriteLayer(muncher);

        compositor.layers.push(bkLayer, spriteLayer);

        timer.update = function update(dt) {
            muncher.update(dt);
            compositor.draw(ctx);
        };

        timer.start();
    });