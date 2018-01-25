export default class Compositor {
    constructor() {
        this.layers = [];
    }

    draw(ctx) {
        // ctx.save();
        this.layers.forEach(layer => layer(ctx));
        // ctx.restore();
    }
}