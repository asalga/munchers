import SpriteSheet from './SpriteSheet.js';

export function loadJSON(url) {
    console.log(`loadJSON: ${url}`);
    return fetch(url).then(res => res.json());
}

export function loadImage(url) {
    return new Promise(function(resolve) {
        let img = new Image;
        img.onload = function() {
            resolve(img);
        };
        img.src = url;
    });
}

export function loadSpriteSheet(name) {
    console.log(`loadSpriteSheet: ${name}`);

    return loadJSON(`/sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ]))
        .then(([sheetSpec, sheet]) => {
            console.log(sheet);

            const sprites = new SpriteSheet(
                sheet,
                sheetSpec.tileWidth,
                sheetSpec.tileHeight);

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(sprite => {
                    sprites.defineTile(
                        sprite.name,
                        sprite.index[0],
                        sprite.index[1]);
                });
            }

            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(frameSpec => {
                	console.log(...frameSpec.rect);
                    sprites.define(frameSpec.name, ...frameSpec.rect);
                });
            }

            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(animSpec => {
                    const anim = createAnim(animSpec.frames, animSpec.frameLength);
                    sprites.defineAnim(animSpec.name, anim);
                });
            }
            return sprites;
        });
}