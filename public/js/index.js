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
    let bkCvs = document.createElement('canvas');
    [bkCvs.width,bkCvs.height] = [cvs.width,cvs.height];

    let bkCtx = bkCvs.getContext('2d');

    level.backgrounds.forEach(bk => {
        drawBackground(bk, bkCtx, sprites);
    });

    return function(ctx) {
        ctx.drawImage(bkCvs, 0, 0);
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