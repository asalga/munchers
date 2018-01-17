export function loadJSON(url) {
    return fetch(url).then(res => res.json());
}


export function loadImage(url) {
    return new Promise(function(resolve) {
        let img = new Image;
        img.onload = function() {
            resolve(img);
        };
        img.src = url;
    });
}