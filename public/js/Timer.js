export default class Timer {
    constructor(timeStep = 1 / 60) {
        this.timeStep = timeStep;
        this.lastTime = 0;
        this.accumTime = 0;


        this.updateProxy = (time) => {
            this.accumTime += (time - this.lastTime) / 1000;

            while (this.accumTime > timeStep) {
                this.update(timeStep);
                this.accumTime -= timeStep;
            }
            this.lastTime = time;

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