const ProgressBar = require('progress');
const spinner = require('./spinner');
const spinnerObj = require('cli-spinners').dots;

class Progress {
    constructor({ title, total }) {
        // this.bar
        // this.interval
        this.title = title;
        this.currentFrame = 0;

        this.bar = new ProgressBar(
            `:symbol ${title} [:bar] :current / :total`,
            {
                total,
                width: 20,
                complete: '■',
                incomplete: '─',
                clear: true,
            }
        );

        this.symbolTicking();
        this.interval = setInterval(
            () => this.symbolTicking(),
            spinnerObj.interval
        );
    }

    symbolTicking() {
        if (!this.bar) return;

        this.bar.tick(0, {
            symbol:
                '\x1b[36m' + spinnerObj.frames[this.currentFrame] + '\x1b[0m',
        });
        this.currentFrame++;
        if (this.currentFrame > spinnerObj.frames.length - 1) {
            this.currentFrame = 0;
        }
    }

    tick() {
        if (!this.bar) return;

        this.bar.tick();
        // console.log(' | ', this.bar.curr, this.bar.total)
        if (this.bar.complete) {
            this.complete();
        }
        // if (this.bar.curr >= this.bar.total) {
        //     this.complete()
        // }
    }

    complete() {
        if (!this.bar) return;
        if (this.bar.complete) {
            clearInterval(this.interval);
            this.bar.terminate();
            spinner(this.title).finish();
            this.bar = undefined;
        }
    }
}

module.exports = Progress;
