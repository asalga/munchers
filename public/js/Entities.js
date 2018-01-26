import { Muncher } from './Entity.js';
import { loadMuncherSprite } from './sprites.js';
import Keyboard from './KeyboardStates.js';
import Entity from './Entity.js';

export default function createMuncher() {

    return loadMuncherSprite()
        .then(function(sprite) {

            let kb = new Keyboard(window);

            let muncher = new Muncher();
            muncher.posIndex = { row: 0, col: 0 };
            muncher.pos.set(0, 0);

            muncher.update = function updateEntity(delta) {
                // this.pos.x += this.vel.x * delta;
                // this.pos.y += this.vel.y * delta;
            };

            muncher.drawProxy = function(ctx) {
                // Draw sprite in center of cell
                sprite.draw('idle', ctx,
                    this.posIndex.col * this.board.cellWidth + this.board.cellWidth / 2 - sprite.tileWidth / 2,
                    this.posIndex.row * this.board.cellHeight + this.board.cellHeight / 2 - sprite.tileHeight / 2);
            };

            kb.mapKey('Space', state => {
                if (state === 1) {
                    
                    // get value from board
                    let val = muncher.board.getDataAt(muncher.posIndex.row,muncher.posIndex.col);

                    if(val.isCorrect === false){
                        console.log(`${val.value} - INCORRECT`);
                    }

                    muncher.board.eat(muncher.posIndex.row, muncher.posIndex.col);
                }
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