/*
** Interaction 1 **
When the user clicks the start button:
- change the icon to a pause button
- decrease counter
- animations start

** Interaction 2 **
when first timer ends, start break time
- change the background color to green
- decrease counter

** Interaction 3 **
when break time ends
- stop everything

** Interaction 4 **
when the user clicks the add 1 minute button
- add time to the currrent timer

** Interaction 5 **
As timer decrements
- rotate the arm
0 change the lenrgth of the svg circle

** Interaction 6 **
when the user clicks the pause button
- animations stop
- timers stop
- button changes from pause o play


*/


const controlBtn = document.querySelector('.control-btn');
const workTimer = document.querySelector('#workTimer');
const breakTimer = document.querySelector('#breakTimer');
const addTimeBtn = document.querySelector('#addTimeBtn');
const arm = document.querySelector('.arm');
const circle = document.querySelector('#circleTimer');
const workSeconds = 10;
const breakSeconds = 10;
const increment = 60;
const circumference = 2 * Math.PI * 50;


let isPaused, timerInterval, currentSeconds, currentTimer, isWorkPhase, currentTotal

isPaused = true;
isWorkPhase = true;
currentSeconds = workSeconds;
currentTotal = workSeconds;
currentTimer = workTimer;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

const updateTimer = (timer, numSeconds) => {
    const minutes = Math.floor(numSeconds / 60); // integer divisions
    const seconds = numSeconds % 60;
    const formattedSeconds = seconds.toString().padStart(2, '0');
    // calculate the time before updating
    timer.innerText = `${minutes}:${formattedSeconds}`;
}

updateTimer(workTimer, workSeconds)
updateTimer(breakTimer, breakSeconds)

controlBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    controlBtn.classList.toggle('control-btn-paused', !isPaused);
    if (!timerInterval) {
        timerInterval = setInterval(decrement, 1000);
    }
})

const decrement = () => {
    if (isPaused) return;

    currentSeconds--;

    updateTimer(currentTimer, currentSeconds);
    const percentage = (currentTotal - currentSeconds) / currentTotal;
    setProgress(percentage);

    if (currentSeconds == 0) {
        clearInterval(timerInterval)
        if (isWorkPhase) {
            isWorkPhase = false;
            currentSeconds = breakSeconds;
            currentTimer = breakTimer;
            workTimer.classList.remove('timer--active');
            breakTimer.classList.add('timer--active');
            document.body.classList.add('break-phase');
            timerInterval = setInterval(decrement, 1000);
        } else {
            controlBtn.classList.remove('control-btn-paused');
            controlBtn.setAttribute('disabled', 'disabled');
            addTimeBtn.setAttribute('disabled', 'disabled');
        }
    }
}

const setProgress = (newPercentageValue) => {
    const offset = circumference - (newPercentageValue * circumference);
    circle.style.strokeDashoffset = offset;
    const rotation = 360 * newPercentageValue;
    arm.style.transform = `rotate(${rotation}deg)`;
}


addTimeBtn.addEventListener('click', () => {
    if (!isPaused) {
        currentSeconds += increment;
        currentTotal += increment;
        updateTimer(currentTimer, currentSeconds);
    }
});