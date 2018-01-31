import { Trait } from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');
        this.WalkSpeed = 400;
        this.distance = 0;
    }

    update(entity, deltaTime) {
        const vel = entity.vel;
        const cellHeight = entity.board.cellHeight;
        const cellWidth = entity.board.cellWidth;

        function displace(col, row) {
            entity.vel.x = 0;
            entity.vel.y = 0;

            entity.posIndex.col = col;
            entity.posIndex.row = row;

            entity.pos.x = col * cellWidth;
            entity.pos.y = row * cellHeight;
        }

        if (vel.x > 0 && entity.pos.x >= cellWidth * this.boardColDest) {
            displace(this.boardColDest, entity.posIndex.row);
        } else if (vel.x < 0 && entity.pos.x <= cellWidth * this.boardColDest) {
            displace(this.boardColDest, entity.posIndex.row);
        }

        if (vel.y > 0 && entity.pos.y >= cellHeight * this.boardRowDest) {
            displace(entity.posIndex.col, this.boardRowDest);
        } else if (vel.y < 0 && entity.pos.y <= cellHeight * this.boardRowDest) {
            displace(entity.posIndex.col, this.boardRowDest);
        }

        // kinda hacky
        this.distance = entity.pos.x + entity.pos.y;
    }
}