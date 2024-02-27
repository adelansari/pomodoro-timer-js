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

updateTimer(workTimer, workSeconds)
updateTimer(breakTimer, breakSeconds)

const updateTimer = (timer, numSeconds) => {
    const minutes = Math.floor(numSeconds / 60);
    const seconds = numSeconds % 60;
    const formattedSeconds = seconds.toString().padStart(2, '0');
    timer.textContent = `${minutes}:${formattedSeconds}`;
}

controlBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    controlBtn.classList.toggle('control-btn-paused', !isPaused);
})