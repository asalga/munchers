const TileWidth = 28;
const TileHeight = 24;

let cvs = document.getElementById('screen');
let ctx = cvs.getContext('2d');

function loadImage(url) {
    return new Promise(function(resolve) {
        let img = new Image;
        img.onload = function() {
            resolve(img);
        };
        img.src = url;
    });
}

ctx.fillStyle = 'rgba(0,0,0,255)';
ctx.fillRect(0, 0, cvs.width, cvs.height);

loadImage('/images/muncher.png')
    .then(img => ctx.drawImage(img,
        0, 0,
        TileWidth, TileHeight,
        0, 0,
        TileWidth, TileHeight))