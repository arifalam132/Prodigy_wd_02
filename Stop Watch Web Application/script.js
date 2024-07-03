const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = []; // Array to store lap times

function startTimer() {
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timer.textContent = formatTimer(elapsedTime);
    }, 10);

    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    laps = []; // Clear lap times array
    timer.textContent = "00:00:00.00";
    lapList.innerHTML = ''; // Clear lap list

    startButton.disabled = false;
    stopButton.disabled = false;
}

function formatTimer(elapsedTime) {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const mseconds = Math.floor((elapsedTime % 1000) / 10);
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
        "." +
        (mseconds > 9 ? mseconds : "0" + mseconds)
    );
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Adding lap time functionality
const lapButton = document.createElement('button');
lapButton.textContent = 'Lap';
lapButton.id = 'lap';
lapButton.addEventListener('click', () => {
    laps.push(elapsedTime);
    displayLapTimes();
});

const buttonsContainer = document.getElementById('buttons');
buttonsContainer.appendChild(lapButton);

// Function to display lap times
const lapList = document.createElement('ul');
lapList.id = 'lapTimes';
buttonsContainer.appendChild(lapList);

function displayLapTimes() {
    lapList.innerHTML = ''; // Clear the existing list
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formatTimer(lap)}`;
        lapList.appendChild(lapItem);
    });
}
