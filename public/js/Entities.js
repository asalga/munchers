import Entity from './Entity.js';
import { Muncher } from './Entity.js';
import { loadMuncherSprite } from './sprites.js';
import Keyboard from './KeyboardStates.js';

export default function createMuncher() {

    return loadMuncherSprite()
        .then(function(sprite) {

            let kb = new Keyboard(window);

            let muncherEntity = new Muncher();
            muncherEntity.pos.set(0, 0);

            muncherEntity.update = function updateEntity(delta) {
                // this.pos.x += this.vel.x * delta;
                // this.pos.y += this.vel.y * delta;
            };

            muncherEntity.drawProxy = function(ctx) {
                sprite.draw('idle', ctx, this.pos.x, this.pos.y);
            };

            kb.addMapping('ArrowRight', state => {
                console.log('test');
                let vel = (state === 1) ? 40 : 0;
                muncherEntity.vel.set(vel, 0);
            });

            return muncherEntity;
        });
}