const tasksDOM = document.querySelector('.tasks');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// Load tasks from localStorage
const showTasks = () => {
  loadingDOM.style.visibility = 'visible';
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks.length < 1) {
    tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
    loadingDOM.style.visibility = 'hidden';
    return;
  }

  const allTasks = tasks
  .map((task) => {
    const { completed, id, name } = task;
    return `<div class="single-task ${completed && 'task-completed'}">
      <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
      <div class="task-links">

        <!-- edit link -->
        <a href="task.html?id=${id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>

        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${id}">
          <i class="fas fa-trash"></i>
        </button>

      </div>
    </div>`;
  })
  .join('');

  tasksDOM.innerHTML = allTasks;
  loadingDOM.style.visibility = 'hidden';
};

// Add task to localStorage
const addTask = (task) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Delete task from localStorage
const deleteTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  showTasks();
};

// Event listener for deleting tasks
tasksDOM.addEventListener('click', (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains('delete-btn')) {
    const id = el.parentElement.dataset.id;
    deleteTask(id);
  }
});

// Form submit for adding new tasks
formDOM.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = taskInputDOM.value.trim();
  if (!name) {
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = `Please enter a task`;
    return;
  }

  const task = {
    id: new Date().getTime().toString(),
    name,
    completed: false,
  };
  addTask(task);
  showTasks();
  taskInputDOM.value = '';
  formAlertDOM.style.display = 'block';
  formAlertDOM.textContent = `Success, task added!`;
  formAlertDOM.classList.add('text-success');

  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 3000);
});

// Initial call to show tasks on page load
showTasks();
