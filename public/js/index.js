import SpriteSheet from './SpriteSheet.js';
import { loadJSON } from './loaders.js';
import { loadMuncherSprite, loadBackground } from './sprites.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}


Promise.all([
        loadBackground(),
        loadMuncherSprite(),
        loadJSON('levels/1.json')
    ])
    .then(function([sprites, muncher, level]) {

        let backgroundBuff = document.createElement('canvas');
        backgroundBuff.width = cvs.width;
        backgroundBuff.height = cvs.height;
        let bkBuffCtx = backgroundBuff.getContext('2d');

        level.backgrounds.forEach(bk => {
            drawBackground(bk, bkBuffCtx, sprites);
        });

        let pos = { x: 0, y: 0 };

        function update() {
            pos.x += 1;
            pos.y += 1;

            ctx.drawImage(backgroundBuff, 0, 0);

            muncher.draw('idle', ctx, pos.x, pos.y);
            requestAnimationFrame(update);
        }
        update();

    });