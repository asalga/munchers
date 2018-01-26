import Entity from './Entity.js';
import { Muncher } from './Entity.js';
import { loadMuncherSprite } from './sprites.js';
import Keyboard from './KeyboardStates.js';

export default function createMuncher() {

    return loadMuncherSprite()
        .then(function(sprite) {

            let kb = new Keyboard(window);

            let muncherEntity = new Muncher();
            muncherEntity.posIndex = { row: 0, col: 0 };
            muncherEntity.pos.set(0, 0);

            muncherEntity.update = function updateEntity(delta) {
                // this.pos.x += this.vel.x * delta;
                // this.pos.y += this.vel.y * delta;
            };

            muncherEntity.drawProxy = function(ctx) {
                sprite.draw('idle', ctx,
                    this.posIndex['col'] * this.board.cellWidth,
                    this.posIndex['row'] * this.board.cellWidth);

                // sprite.draw('idle', ctx, this.pos.x, this.pos.y);
            };

            kb.addMapping('ArrowRight', state => {
                if (state === 1) {
                    let pos = muncherEntity.posIndex;
                    if (pos.col + 1 < muncherEntity.board.numCols) {
                        pos.col++;
                    }
                }
            });

            kb.addMapping('ArrowLeft', state => {
                if (state === 1) {
                    let pos = muncherEntity.posIndex;
                    if (pos.col - 1 >= 0) {
                        pos.col--;
                    }
                }
            });

            kb.addMapping('ArrowDown', state => {
                if (state === 1) {
                    let pos = muncherEntity.posIndex;
                    if (pos.row + 1 < muncherEntity.board.numRows) {
                        pos.row++;
                    }
                }
            });

            kb.addMapping('ArrowUp', state => {
                if (state === 1) {
                    let pos = muncherEntity.posIndex;
                    if (pos.row - 1 >= 0) {
                        pos.row--;
                    }
                }
            });

            return muncherEntity;
        });
}