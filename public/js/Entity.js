import { Vec2 } from './Math.js';
import { config } from './config.js';

export default class Entity {
    constructor() {
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

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);

        this.drawProxy(ctx);
        this.drawChildren(ctx);

        ctx.restore();
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

        this.numRows = 5;
        this.numCols = 5;

        this.widthInPx = 500;
        this.heightInPx = 400;

        this.cellWidth = this.widthInPx / this.numRows;
        this.cellHeight = this.heightInPx / this.numCols;

        this.pos.x = config.gameWidth / 2 - this.widthInPx / 2;
        this.pos.y = config.gameHeight / 2 - this.heightInPx / 2;

        this.tableData = [];
    }

    /**
        questionData {Array}
    */
    loadQuestions(questionData) {
        let i = 0;
        for (let x = 0; x < this.numCols; ++x) {
            this.tableData.push([]);

            for (let y = 0; y < this.numCols; ++y) {
                this.tableData[x].push(questionData[i]);
                ++i;
            }
        }
    }


    update(deltaTime) {}

    drawProxy(ctx) {
        ctx.strokeStyle = 'rgb(255, 70, 255)';

        // Vertical lines
        for (let x = 0; x <= this.widthInPx; x += this.cellWidth) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.heightInPx);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= this.heightInPx; y += this.cellHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.widthInPx, y);
            ctx.stroke();
        }
    }

    getDataAt(col, row) {
        return this.tableData[col][row];
    }

    eat(col, row) {
        this.tableData[col][row] = null;
    }

    /*

    */
    drawData(ctx) {
        ctx.fillStyle = 'rgb(255,255,255)';

        for (let x = 0; x < this.numCols; ++x) {
            for (let y = 0; y < this.numCols; ++y) {


                let data = this.tableData[y][x];

                // Data may have already been eaten
                if (data) {
                    let textWidth = ctx.measureText(data.value).width;

                    ctx.fillText(data.value,
                        x * this.cellWidth + this.cellWidth / 2 - textWidth / 2,
                        y * this.cellHeight + this.cellHeight / 2);
                }

            }
        }
    }

    //
    draw(ctx) {
        super.draw(ctx);

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        this.drawData(ctx);
        ctx.restore();
    }
}