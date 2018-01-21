import Entity from './Entity.js';
import { loadMuncherSprite } from './sprites.js';

export default function createMuncher() {

    return loadMuncherSprite()
        .then(function(sprite) {

            let muncherEntity = new Entity();
            muncherEntity.pos.set(0, 180);
            muncherEntity.vel.set(2, -10);

            muncherEntity.update = function updateEntity() {
                this.pos.x += this.vel.x;
                this.pos.y += this.vel.y;
                // this.vel.y += gravity * delta;
            };

            muncherEntity.draw = function drawEntity(ctx) {
                sprite.draw('idle', ctx, this.pos.x, this.pos.y);
            };
            return muncherEntity;
        });
}