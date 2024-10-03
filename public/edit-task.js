// Selecting the necessary DOM elements
const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
let tempName;

// Function to show the task from local storage
const showTask = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find((task) => task.id === id);

  if (task) {
    const { id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    taskCompletedDOM.checked = completed;
  } else {
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Task not found';
    formAlertDOM.classList.add('text-error');
  }
};

// Show the task when the page loads
showTask();

// Event listener for editing the task
editFormDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  editBtnDOM.textContent = 'Loading...';

  const taskName = taskNameDOM.value;
  const taskCompleted = taskCompletedDOM.checked;

  // Update the task in local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { id, name: taskName, completed: taskCompleted };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update UI
    taskIDDOM.textContent = id;
    tempName = taskName;
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Success, edited task';
    formAlertDOM.classList.add('text-success');
  } else {
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Error, please try again';
  }

  editBtnDOM.textContent = 'Edit';
  
  // Reset the form alert after a delay
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});
