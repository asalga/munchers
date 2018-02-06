export function createSpriteLayer(entity) {
    return function drawSpriteLayer(ctx) {
        entity.draw(ctx);
    }
}