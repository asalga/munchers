import SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loaders.js';

export function loadMuncherSprite() {
    const TileWidth = 28 * 2;
    const TileHeight = 24 * 2;

    return loadImage('/images/muncher.png')
        .then(img => {
            let sprites = new SpriteSheet({
                sheet: img,
                tileWidth: TileWidth,
                tileHeight: TileHeight
            });

            sprites.define('idle', 0, 0, TileWidth, TileHeight);
            sprites.define('openMouth', 56, 0, TileWidth, TileHeight);

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

            sprites.defineTile('top-left', 0, 0);
            sprites.defineTile('top-mid', 1, 0);
            sprites.defineTile('top-right', 2, 0);

            sprites.defineTile('mid-left', 0, 1);
            sprites.defineTile('mid-mid', 1, 1);
            sprites.defineTile('mid-right', 2, 1);

            sprites.defineTile('bot-left', 0, 2);
            sprites.defineTile('bot-mid', 1, 2);
            sprites.defineTile('bot-right', 2, 2);

            return sprites;
        });
}