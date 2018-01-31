import { Muncher } from './Entity.js';
import { loadSpriteSheet } from './loaders.js';
import Keyboard from './KeyboardStates.js';
import { createAnim } from './anim.js';
import Go from './Components/Go.js';

export default function createMuncher() {

    return loadSpriteSheet('muncher')
        .then(function(sprite) {

            let kb = new Keyboard(window);

            let muncher = new Muncher();
            muncher.addTrait(new Go());

            muncher.posIndex = { row: 0, col: 0 };
            muncher.pos.set(0, 0);

            muncher.updateProxy = function updateEntity(delta) {
                this.pos.x += this.vel.x * delta;
                this.pos.y += this.vel.y * delta;
            };

            let resolveAnim = createAnim([1, 2].map(v => 'run-' + v), 1);

            function routeFrame(muncherSprite) {
                return resolveAnim(muncher.go.distance);
            }

            muncher.drawProxy = function(ctx) {
                let val = this.board.getDataAt(this.posIndex.row, this.posIndex.col);

                if (this.vel.x === 0) {
                    var spriteState = (val === null) ? 'idle' : 'openMouth';
                    sprite.draw(spriteState, ctx, 0, 0);
                } else {

                    // flip if walking left
                    if (this.vel.x < 0) {
                        ctx.scale(-1, 1);
                        ctx.translate(-56, 0)
                    }
                    sprite.draw(routeFrame(this), ctx, 0, 0);
                }
                //         this.posIndex.col * this.board.cellWidth + this.board.cellWidth / 2 - sprite.tileWidth / 2,
                //         this.posIndex.row * this.board.cellHeight + this.board.cellHeight / 2 - sprite.tileHeight / 2);
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
                if (state === 1 && muncher.posIndex.col + 1 < muncher.board.numCols) {
                    muncher.vel.x = muncher.go.WalkSpeed;
                    muncher.go.boardColDest = muncher.posIndex.col + 1;
                }
            });

            kb.mapKey('ArrowLeft', state => {
                if (state === 1 && muncher.posIndex.col - 1 > -1) {
                    muncher.vel.x = -muncher.go.WalkSpeed;
                    muncher.go.boardColDest = muncher.posIndex.col - 1;
                }
            });

            kb.mapKey('ArrowDown', state => {
                if (state === 1 && muncher.posIndex.row + 1 < muncher.board.numRows) {
                    muncher.vel.y = muncher.go.WalkSpeed;
                    muncher.go.boardRowDest = muncher.posIndex.row + 1;
                }
            });

            kb.mapKey('ArrowUp', state => {
                if (state === 1 && muncher.posIndex.row - 1 > -1) {
                    muncher.vel.y = -muncher.go.WalkSpeed;
                    muncher.go.boardRowDest = muncher.posIndex.row - 1;
                }
            });

            return muncher;
        });
}