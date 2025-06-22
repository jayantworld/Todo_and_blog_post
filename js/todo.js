let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const dueDateInput = document.getElementById('dueDateInput').value;
  const priorityInput = document.getElementById('priorityInput').value;

  if (!taskInput) return;

  tasks.push({
    text: taskInput,
    completed: false,
    dueDate: dueDateInput,
    priority: priorityInput
  });

  document.getElementById('taskInput').value = '';
  document.getElementById('dueDateInput').value = '';
  document.getElementById('priorityInput').value = 'Low';
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

function renderTasks(filter = 'all') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    if (
      (filter === 'completed' && !task.completed) ||
      (filter === 'pending' && task.completed)
    ) return;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row';

    const left = document.createElement('div');
    left.className = 'flex-grow-1';
    left.style.cursor = 'pointer';
    left.onclick = () => toggleTask(index);
    left.innerHTML = `<strong>${task.text}</strong><br />
      <small>Due: ${task.dueDate || 'None'} | Priority: ${task.priority}</small>`;
    if (task.completed) {
      left.style.textDecoration = 'line-through';
    }

    const right = document.createElement('div');
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-sm btn-danger';
    delBtn.innerText = 'Delete';
    delBtn.onclick = () => deleteTask(index);
    right.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(right);
    taskList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => renderTasks());
