export default class Timer {
    constructor(timeStep = 1 / 60) {
    	this.accumTime = 0;
        this.timeStep = timeStep;

        this.updateProxy = (time) => {
            accumTime += (time - lastTime) / 1000;

            while (accumTime > timeStep) {
                this.update(timeStep);
                accumTime -= timeStep;
            }
            lastTime = time;

            this.enqueue();
        };
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}