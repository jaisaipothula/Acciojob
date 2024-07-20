function createTimer(hours, minutes, seconds) {
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        intervalId: null
    };
}

function startNewTimer(hours, minutes, seconds) {
    const timer = createTimer(hours, minutes, seconds);

    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.innerHTML = `
        <div class="time-left">${formatTime(timer.hours)}:${formatTime(timer.minutes)}:${formatTime(timer.seconds)}</div>
        <div class="timer-controls">
            <button class="stop-timer">Stop Timer</button>
        </div>
    `;
    document.getElementById('timersContainer').appendChild(timerElement);

    timer.intervalId = setInterval(() => {
        timer.seconds--;
        if (timer.seconds < 0) {
            timer.seconds = 59;
            timer.minutes--;
            if (timer.minutes < 0) {
                timer.minutes = 59;
                timer.hours--;
                if (timer.hours < 0) {
                    clearInterval(timer.intervalId);
                    timerElement.querySelector('.time-left').textContent = '00:00:00';
                    timerElement.style.backgroundColor = '#28a745'; 
                    playTimerAlert();
                    return;
                }
            }
        }
        timerElement.querySelector('.time-left').textContent = `${formatTime(timer.hours)}:${formatTime(timer.minutes)}:${formatTime(timer.seconds)}`;
    }, 1000);

    timerElement.querySelector('.stop-timer').addEventListener('click', () => {
        clearInterval(timer.intervalId);
        timerElement.remove();
    });
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function playTimerAlert() {
    const alertSound = document.getElementById('timerAlert');
    alertSound.play();
}

document.getElementById('startTimer').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    startNewTimer(hours, minutes, seconds);
});
