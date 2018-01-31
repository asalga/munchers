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