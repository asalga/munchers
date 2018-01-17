//const TileWidth = 28;
// const TileHeight = 24;
const TileWidth = 16;
const TileHeight = 16;

import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadJSON } from './loaders.js';

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');


loadImage('/images/tiles.png')
    .then(img => {

        const sprites = new SpriteSheet({
            sheet: img,
            tileWidth: TileWidth,
            tileHeight: TileHeight
        });

        sprites.define('mid-mid-blue', 4, 4);

        // rename to loadLevel
        loadJSON('levels/1.json')
            .then(function(level) {

                let xStart = level.backgrounds[0].ranges[0];
                let yStart = level.backgrounds[0].ranges[1];

                for (let x = 0; x < 19; ++x) {
                    for (let y = 0; y < 14; ++y) {
                        sprites.drawTile('mid-mid-blue', ctx, x, y);
                    }
                }
            });
    });