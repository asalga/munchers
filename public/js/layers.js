export function createSpriteLayer(entity) {
    return function drawSpriteLayer(ctx) {
        entity.draw(ctx);
    }
}

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

export function createBackgroundLayer(background, sprites) {
    let bkCvs = document.createElement('canvas');
    bkCvs.width = 320;
    bkCvs.height = 240;
    [bkCvs.width, bkCvs.height] = [bkCvs.width, bkCvs.height];

    let bkCtx = bkCvs.getContext('2d');

    background.forEach(bk => {
        drawBackground(bk, bkCtx, sprites);
    });

    return function drawBackgroundLayer(ctx) {
        ctx.drawImage(bkCvs, 0, 0);
    }
}