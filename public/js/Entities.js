import { config } from './config.js';
import { Muncher } from './Entity.js';
import { loadSpriteSheet } from './loaders.js';
import { createAnim } from './anim.js';
import Keyboard from './KeyboardStates.js';
import Go from './Components/Go.js';

export default function createMuncher() {

    return loadSpriteSheet('muncher')
        .then(sprite => {

            let kb = new Keyboard(window);

            let muncher = new Muncher();
            muncher.addTrait(new Go());
            muncher.ready = true;

            muncher.posIndex = { row: 0, col: 0 };
            muncher.pos.set(0, 0);

            muncher.updateProxy = function updateEntity(delta) {
                if (this.ready && kb.keyQueue.length > 0) {
                    this.ready = false;
                    kb.nextKey();
                }

                this.pos.x += this.vel.x * delta;
                this.pos.y += this.vel.y * delta;
            };

            let resolveAnimHoriz = createAnim([1, 2].map(v => 'horiz-walk-' + v), 1);
            let resolveAnimVert = createAnim([1, 2].map(v => 'vert-walk-' + v), 1);

            function routeFrame(muncherSprite) {
                if (muncherSprite.vel.x !== 0) {
                    return resolveAnimHoriz(muncher.go.distance);
                } else if (muncherSprite.vel.y !== 0) {
                    return resolveAnimVert(muncher.go.distance);
                }
            }

            muncher.drawProxy = function(ctx) {
                // ctx.fillStyle = 'rgb(255, 0, 0);';
                // ctx.fillRect(0, 0, 40, 40);

                let val = this.board.getDataAt(this.posIndex.row, this.posIndex.col);

                if (this.vel.x === 0 && this.vel.y === 0) {
                    let spriteState = (val === null) ? 'idle' : 'openMouth';
                    sprite.draw(spriteState, ctx, 0, 0);
                } else {
                    // flip if walking left
                    if (this.vel.x < 0) {
                        ctx.scale(-1, 1);
                        ctx.translate(-config.charWidth, 0)
                    }
                    sprite.draw(routeFrame(this), ctx, 0, 0);
                }
            };

            kb.mapKey('Space', state => {
                // if (state === 0) { muncher.ready = true; }
                muncher.ready = true;

                let val = muncher.board.getDataAt(muncher.posIndex.row, muncher.posIndex.col);
                if (val === null || state === 0) { return; }

                if (val.isCorrect === false) {
                    console.log(`${val.value} - INCORRECT`);
                }

                muncher.board.eat(muncher.posIndex.row, muncher.posIndex.col);
            });

            // map the arrow right key to the function:
            // once the sprite is finished doing his animation,
            // then get the next key
            // kb.keyQueue.pop();
            kb.mapKey('ArrowRight', function(state) {
                // if (state === 0) { muncher.ready = true; }

                if (state === 1 && muncher.posIndex.col + 1 < muncher.board.numCols) {
                    muncher.vel.x = muncher.go.WalkSpeed;
                    muncher.go.boardColDest = muncher.posIndex.col + 1;
                }
            });

            kb.mapKey('ArrowLeft', state => {
                // if (state === 0) { muncher.ready = true; }

                if (state === 1 && muncher.posIndex.col - 1 > -1) {
                    muncher.vel.x = -muncher.go.WalkSpeed;
                    muncher.go.boardColDest = muncher.posIndex.col - 1;
                }
            });

            kb.mapKey('ArrowDown', state => {
                // if (state === 0) { muncher.ready = true; }

                if (state === 1 && muncher.posIndex.row + 1 < muncher.board.numRows) {
                    muncher.vel.y = muncher.go.WalkSpeed;
                    muncher.go.boardRowDest = muncher.posIndex.row + 1;
                }
            });

            kb.mapKey('ArrowUp', state => {
                // if (state === 0) { muncher.ready = true; }

                if (state === 1 && muncher.posIndex.row - 1 > -1) {
                    muncher.vel.y = -muncher.go.WalkSpeed;
                    muncher.go.boardRowDest = muncher.posIndex.row - 1;
                }
            });

            return muncher;
        });
}