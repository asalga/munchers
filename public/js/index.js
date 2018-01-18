import SpriteSheet from './SpriteSheet.js';
import { loadJSON } from './loaders.js';
import { loadMuncherSprite, loadBackground } from './sprites.js';
import Compositor from './Compositor.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');
let compositor = new Compositor();

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

function createBackgroundLayer(level, sprites) {
    let backgroundCvs = document.createElement('canvas');
    backgroundCvs.width = cvs.width;
    backgroundCvs.height = cvs.height;
    let backgroundCtx = backgroundCvs.getContext('2d');

    level.backgrounds.forEach(bk => {
        drawBackground(bk, backgroundCtx, sprites);
    });

    return function(ctx) {
        ctx.drawImage(backgroundCvs, 0, 0);
    }
}


Promise.all([
        loadBackground(),
        loadMuncherSprite(),
        loadJSON('levels/1.json')
    ])
    .then(function([sprites, muncher, level]) {

        let bkLayer = createBackgroundLayer(level, sprites);
        compositor.layers.push(bkLayer);

        let pos = { x: 0, y: 0 };

        function update() {
            pos.x += 1;
            pos.y += 1;

            compositor.draw(ctx);

            muncher.draw('idle', ctx, pos.x, pos.y);
            requestAnimationFrame(update);
        }
        update();

    });