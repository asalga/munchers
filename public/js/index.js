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

        let kb = new KeyboardState();
        let timer = new Timer(1 / 60);
        let gravity = 600;
        let compositor = new Compositor();
        let bkLayer = createBackgroundLayer(level.backgrounds, bkSprites);
        let spriteLayer = createSpriteLayer(muncher);

        kb.addMapping('KeyD', function() {
            muncher.vel.set(40, -140);
        });
        kb.listenTo(window);

        compositor.layers.push(bkLayer, spriteLayer);

        timer.update = function update(dt) {
            muncher.update(dt);
            compositor.draw(ctx);
        };

        timer.start();
    });