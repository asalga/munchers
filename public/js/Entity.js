import Vec2 from './Math.js';

export default class Entity {
    constructor() {
        console.log("Entity ctor");
        this.pos = new Vec2;
        this.entities = [];
    }

    addChild(child) {
        this.entities.push(child);
    }

    update(deltaTime) {
        this.entities.forEach(v => v.update(deltaTime));
    }

    draw(ctx) {
        ctx.translate(this.pos.x, this.pos.y);
        this.drawProxy(ctx);
        this.drawChildren(ctx);
        ctx.translate(-this.pos.x, -this.pos.y);
    }

    drawChildren(ctx) {
        this.entities.forEach(v => v.draw(ctx));
    }
}

export class Muncher extends Entity {
    constructor() {
        super();
    }

    draw(ctx) {
        super.draw(ctx);
    }
}


export class Board extends Entity {

    constructor() {
        super();

        this.gameTime = 0;
        this.numRows = 5;
        this.numCols = 5;

        this.widthInPx = 200;
        this.heightInPx = 224;

        this.cellWidth = this.widthInPx / this.numRows;
        this.cellHeight = this.heightInPx / this.numCols;

        console.log(this.cellWidth, this.cellHeight);
    }

    createBackgroundLayer(background, sprites) {
        function drawBackground(background, context, sprites) {
            background.ranges.forEach(([x1, x2, y1, y2]) => {
                for (let x = x1; x < x2; ++x) {
                    for (let y = y1; y < y2; ++y) {
                        sprites.drawTile(background.tile, context, x, y);
                    }
                }
            });
        }

        let bkCvs = document.createElement('canvas');
        bkCvs.width = 320;
        bkCvs.height = 240;
        [bkCvs.width, bkCvs.height] = [bkCvs.width, bkCvs.height];

        let bkCtx = bkCvs.getContext('2d');

        background.forEach(bk => {
            drawBackground(bk, bkCtx, sprites);
        });

        this.drawBackgroundLayer = function drawBackgroundLayer(ctx) {
            ctx.drawImage(bkCvs, 0, 0);
        };
    }

    update(deltaTime) {}

    drawProxy(ctx) {
        this.drawBackgroundLayer(ctx);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}