import { Vec2 } from './Math.js';
import { config } from './config.js';

export class Trait {
    constructor(name) {
        this.name = name;
    }
    update(deltaTime) {
        console.log('unhandled update call in Trait');
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2;
        this.vel = new Vec2;

        this.entities = [];
        this.traits = [];
    }

    addChild(child) {
        this.entities.push(child);
    }

    update(deltaTime) {
        this.traits.forEach((t) => {
            t.update(this, deltaTime);
        });
        this.entities.forEach(v => {
            v.update(deltaTime);
            v.updateProxy(deltaTime);
        });
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.name] = trait;
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
        ctx.translate(
            this.board.cellWidth / 2 - config.charWidth / 2,
            this.board.cellHeight / 2 - config.charHeight / 2);
        super.draw(ctx);
    }
}

export class Board extends Entity {

    constructor() {
        super();

        this.numRows = 5;
        this.numCols = 6;
        this.numCells = this.numRows * this.numCols;

        this.widthInPx = config.boardWidth;
        this.heightInPx = config.boardHeight;

        this.cellWidth = this.widthInPx / this.numCols;
        this.cellHeight = this.heightInPx / this.numRows;

        this.pos.x = config.gameWidth / 2 - this.widthInPx / 2;
        this.pos.y = config.gameHeight / 2 - this.heightInPx / 2;

        this.tableData = [];
    }

    /**
        questionData {Array}
    */
    loadQuestions(questionData) {
        for (let row = 0; row < this.numRows; ++row) {
            this.tableData.push(new Array(this.numCols));
            for (let col = 0; col < this.numCols; ++col) {
                this.tableData[row][col] = questionData.getNext();
            }
        }
    }

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

    getDataAt(row, col) {
        return this.tableData[row][col];
    }

    eat(row, col) {
        this.tableData[row][col] = null;
    }

    /*

    */
    drawData(ctx) {
        ctx.fillStyle = config.answerColor;
        ctx.font = '30px monospace';

        for (let row = 0; row < this.numRows; ++row) {
            for (let col = 0; col < this.numCols; ++col) {

                // Data may have already been eaten
                let data = this.getDataAt(row, col);
                if (!data) { continue; }

                let textWidth = ctx.measureText(data.value).width;

                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,200)';
                ctx.fillText(data.value,
                    col * this.cellWidth + this.cellWidth / 2 - textWidth / 2 + 3,
                    row * this.cellHeight + this.cellHeight / 2 + 10 + 3);

                // Text
                ctx.fillStyle = config.answerColor;
                ctx.fillText(data.value,
                    col * this.cellWidth + this.cellWidth / 2 - textWidth / 2,
                    row * this.cellHeight + this.cellHeight / 2 + 10);
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