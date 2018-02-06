/*
	frames Array
	framePlayLen
*/
export function createAnim(frames, framePlayLen) {

    return function resolveFrame(timeLine) {
        let frameIndex = Math.floor(timeLine / framePlayLen) % frames.length;
        return frames[frameIndex];
    };
}