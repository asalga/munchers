export default class SpriteSheet {

    // sheet, tilewidth, tileheight
    constructor(obj) {
        Object.assign(this, obj);
        this.tiles = new Map;
    }

    define(name, xIndex, yIndex) {
        let cvs = document.createElement('canvas');
        cvs.width = this.tileWidth;
        cvs.height = this.tileHeight;

        let ctx = cvs.getContext('2d');
        ctx.drawImage(this.sheet,
            xIndex * this.tileWidth, yIndex * this.tileHeight,
            this.tileWidth, this.tileHeight,
            0, 0,
            this.tileWidth, this.tileHeight);

        this.tiles.set(name, cvs);
    }

    draw(name, ctx, x, y) {
        ctx.drawImage(this.tiles.get(name), x, y);
    }

    drawTile(name, ctx, x, y){
    	this.draw(name, ctx, x * this.tileWidth, y * this.tileHeight);
    }

    // drawTile(ctx) {
    // ctx.drawImage(this.img,
    // 0, 0, this.width, this.height,
    // 0, 0, this.width, this.height);
    // }
}