import SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js';

export function loadMuncherSprite() {
    const TileWidth = 28;
    const TileHeight = 24;

    return loadImage('/images/muncher.png')
        .then(img => {
            let sprites = new SpriteSheet({
                sheet: img
                // tileWidth: TileWidth,
                // tileHeight: TileHeight
            });

            sprites.define('idle', 0, 0, TileWidth, TileHeight);
            return sprites;
        });
}

export function loadBackground() {

    const TileWidth = 16;
    const TileHeight = 16;

    return loadImage('/images/test.png')
        .then(img => {
            let sprites = new SpriteSheet({
                sheet: img,
                tileWidth: TileWidth,
                tileHeight: TileHeight
            });

            sprites.defineTile('middle', 0, 0);
            sprites.defineTile('top-mid', 1, 0);
            sprites.defineTile('top-right', 2, 0);
            return sprites;
        });
}