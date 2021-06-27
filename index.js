const refs = {
    days: document.querySelector('.value[data-value="days"]'),
    hours: document.querySelector('.value[data-value="hours"]'),
    mins: document.querySelector('.value[data-value="mins"]'),
    secs: document.querySelector('.value[data-value="secs"]'),
}


class CountdownTimer {
    constructor({ onTick, dueTime }) {
        this.onTick = onTick;
        this.dueTime = dueTime;
    };

    start() {
        // const startTime = Date.now();
        
        setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = this.dueTime - currentTime;
        const time = this.getTimeComponents(deltaTime);

        this.onTick(time);

        }, 1000);
    };

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    };

    pad(value) {
       return String(value).padStart(2, '0');
    };
}

const timer = new CountdownTimer({
    onTick: updateTimerFace,
    dueTime: Date.parse(new Date('Jul 07, 2021')),
});

timer.start();

function updateTimerFace({ days, hours, mins, secs }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}
