//const TileWidth = 28;
// const TileHeight = 24;
const TileWidth = 16;
const TileHeight = 16;

import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadJSON } from './loaders.js';

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

function loadBackground() {
    return loadImage('/images/test.png')
        .then(img => {
            let sprites = new SpriteSheet({
                sheet: img,
                tileWidth: TileWidth,
                tileHeight: TileHeight
            });

            sprites.define('middle', 0, 0);
            sprites.define('top-mid', 1, 0);
            sprites.define('top-right', 2, 0);
            return sprites;
        });
}

Promise.all([
        loadBackground(),
        loadJSON('levels/1.json')
    ])
    .then(function([sprites, level]) {
        level.backgrounds.forEach(bk => {
            drawBackground(bk, ctx, sprites);
        });
    });