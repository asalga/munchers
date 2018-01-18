export default class SpriteSheet {

    constructor(obj) {
        Object.assign(this, obj);
        this.tiles = new Map;
    }

    define(name, x, y, w, h) {
        let cvs = document.createElement('canvas');
        [cvs.width, cvs.height] = [w, h];

        let ctx = cvs.getContext('2d');
        ctx.drawImage(this.sheet, x, y, w, h, 0, 0, w, h);

        this.tiles.set(name, cvs);
    }

    defineTile(name, xIndex, yIndex) {
        this.define(name, xIndex * this.tileWidth, yIndex * this.tileHeight, this.tileWidth, this.tileHeight);
    }

    draw(name, ctx, x, y) {
        let tile = this.tiles.get(name);
        try{
            ctx.drawImage(tile, x, y);
        }catch(e){
            console.log(`"${name}"" has not been defined`);
        }
    }

    drawTile(name, ctx, x, y) {
        this.draw(name, ctx, x * this.tileWidth, y * this.tileHeight);
    }
}