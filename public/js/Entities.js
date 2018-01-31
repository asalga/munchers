import Entity from './Entity.js';
import { Muncher } from './Entity.js';
import { loadMuncherSprite } from './sprites.js';
import { loadSpriteSheet } from './loaders.js';
import Keyboard from './KeyboardStates.js';
import { createAnim } from './anim.js';

export default function createMuncher() {
    /*
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
    */

    return loadSpriteSheet('muncher')
        // return loadMuncherSprite()
        .then(function(sprite) {

            let kb = new Keyboard(window);

            let muncher = new Muncher();
            muncher.posIndex = { row: 0, col: 0 };
            muncher.pos.set(0, 0);

            muncher.update = function updateEntity(delta) {
                // this.pos.x += this.vel.x * delta;
                // this.pos.y += this.vel.y * delta;
            };

            let resolveAnim = createAnim([1, 2].map(v => 'run-' + v), 10);

            function routeFrame(muncherSprite) {
                return resolveAnim(0);
            }

            muncher.drawProxy = function(ctx) {
                let val = this.board.getDataAt(this.posIndex.row, this.posIndex.col);
                var spriteState = (val === null) ? 'idle' : 'openMouth';

                if (true) {
                    sprite.draw(
                        spriteState,
                        ctx,
                        this.posIndex.col * this.board.cellWidth + this.board.cellWidth / 2 - sprite.tileWidth / 2,
                        this.posIndex.row * this.board.cellHeight + this.board.cellHeight / 2 - sprite.tileHeight / 2);
                }
                //
                else {
                    sprite.draw(
                        routeFrame(this),
                        ctx,
                        this.posIndex.col * this.board.cellWidth + this.board.cellWidth / 2 - sprite.tileWidth / 2,
                        this.posIndex.row * this.board.cellHeight + this.board.cellHeight / 2 - sprite.tileHeight / 2);
                }
            };

            kb.mapKey('Space', state => {
                let val = muncher.board.getDataAt(muncher.posIndex.row, muncher.posIndex.col);

                if (val === null || state === 0) { return; }

                if (val.isCorrect === false) {
                    console.log(`${val.value} - INCORRECT`);
                }

                muncher.board.eat(muncher.posIndex.row, muncher.posIndex.col);
            });

            kb.mapKey('ArrowRight', state => {
                if (state === 1) {
                    let pos = muncher.posIndex;
                    if (pos.col + 1 < muncher.board.numCols) {
                        pos.col++;
                    }
                }
            });

            kb.mapKey('ArrowLeft', state => {
                if (state === 1) {
                    let pos = muncher.posIndex;
                    if (pos.col - 1 >= 0) {
                        pos.col--;
                    }
                }
            });

            kb.mapKey('ArrowDown', state => {
                if (state === 1) {
                    let pos = muncher.posIndex;
                    if (pos.row + 1 < muncher.board.numRows) {
                        pos.row++;
                    }
                }
            });

            kb.mapKey('ArrowUp', state => {
                if (state === 1) {
                    let pos = muncher.posIndex;
                    if (pos.row - 1 >= 0) {
                        pos.row--;
                    }
                }
            });

            return muncher;
        });
}