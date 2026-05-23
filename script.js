const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const deadlineInput = document.getElementById('deadlineInput');
const taskList = document.getElementById('taskList');

const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

const themeToggle = document.getElementById('themeToggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateStats() {

    totalTasks.innerText = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.innerText = completed;

    pendingTasks.innerText = tasks.length - completed;
}


function renderTasks() {

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {

        const li = document.createElement('li');
        li.classList.add('task');

        if(task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">

                <div class="task-details">
                    <span class="task-name">${task.text}</span>

                    <p class="deadline-text">
                        📅 Deadline: ${task.deadline || 'No deadline'}
                    </p>
                </div>

                <div class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </div>
            </div>

            <button class="delete-btn" onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
    saveTasks();
}


addTaskBtn.addEventListener('click', () => {

    const text = taskInput.value.trim();

    if(text === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        text,
        deadline: deadlineInput.value,
        priority: prioritySelect.value,
        completed: false
    };

    tasks.push(task);

    taskInput.value = '';
    deadlineInput.value = '';

    renderTasks();
});


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}


renderTasks();


const quotes = [
    "Discipline beats motivation.",
    "Small progress is still progress.",
    "Focus on consistency, not perfection.",
    "Your future is built by today's effort.",
    "Success comes from repeated small actions."
];

const quoteElement = document.getElementById('quote');

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.innerText = quotes[randomIndex];
}, 5000);


themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('light-mode');

    if(document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerText = '☀️';
    }
    else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerText = '🌙';
    }
});


const savedTheme = localStorage.getItem('theme');

if(savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerText = '☀️';
}


let timer;
let timeLeft = 1500;

const timerDisplay = document.getElementById('timer');
const startTimer = document.getElementById('startTimer');
const resetTimer = document.getElementById('resetTimer');


function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.innerText =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


startTimer.addEventListener('click', () => {

    clearInterval(timer);

    timer = setInterval(() => {

        if(timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        }
        else {
            clearInterval(timer);
            alert('Pomodoro session completed!');
        }

    }, 1000);
});


resetTimer.addEventListener('click', () => {

    clearInterval(timer);

    timeLeft = 1500;

    updateTimerDisplay();
});
