import Entity from './Entity.js';
import { loadMuncherSprite } from './sprites.js';

export default function createMuncher() {

    return loadMuncherSprite()
        .then(function(sprite) {

            let muncherEntity = new Entity();
            muncherEntity.pos.set(0, 180);
            // muncherEntity.vel.set(0, -40);

            muncherEntity.update = function updateEntity(delta) {
                this.pos.x += this.vel.x * delta;
                this.pos.y += this.vel.y * delta;
            };

            muncherEntity.draw = function drawEntity(ctx) {
                sprite.draw('idle', ctx, this.pos.x, this.pos.y);
            };
            return muncherEntity;
        });
}