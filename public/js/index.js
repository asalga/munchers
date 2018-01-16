const TileWidth = 28;
const TileHeight = 24;

import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');



ctx.fillStyle = 'rgba(0, 0, 0, 255)';
ctx.fillRect(0, 0, cvs.width, cvs.height);

loadImage('/images/muncher.png')
    .then(img => {

        const sprites = new SpriteSheet({
            sheet: img,
            tileWidth: TileWidth,
            tileHeight: TileHeight
        });

        sprites.define('muncher', 0, 0);
        sprites.draw('muncher', ctx, 0, 0);
    });