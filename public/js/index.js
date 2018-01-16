//const TileWidth = 28;
// const TileHeight = 24;
const TileWidth = 16;
const TileHeight = 16;

import SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

ctx.fillStyle = 'rgba(0, 0, 0, 255)';
ctx.fillRect(0, 0, cvs.width, cvs.height);

loadImage('/images/tiles.png')
    .then(img => {

        const sprites = new SpriteSheet({
            sheet: img,
            tileWidth: TileWidth,
            tileHeight: TileHeight
        });

        // sprites.define('top-left-pink', 0, 0);
        sprites.define('mid-mid-pink', 1, 1);

        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 10; ++y) {
                sprites.drawTile('mid-mid-pink', ctx, x, y);
            }
        }
    });