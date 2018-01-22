import Compositor from './Compositor.js';
import createMuncher from './Entities.js';
import Timer from './Timer.js';
import { loadJSON } from './loaders.js';
import { loadBackground } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import Keyboard from './KeyboardStates.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

let kb = new Keyboard(cvs);

Promise.all([
        createMuncher(),
        loadBackground(),
        loadJSON('levels/1.json')
    ])
    .then(function([muncher, bkSprites, level]) {

        kb.addMapping('ArrowRight', state => {
            let vel = (state === 1) ? 100 : 0;
            muncher.vel.set(vel, 0);
        });
        // kb.mute(); ?

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