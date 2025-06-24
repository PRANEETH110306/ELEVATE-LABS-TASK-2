document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-button');
  const taskList = document.getElementById('task-list');
  const emptyImage = document.querySelector('.empty-image');
  const todosContainer = document.querySelector('.todos-container');
  const taskForm = document.getElementById('task-form');

  const toggleEmptyState = () => {
    emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
  };

  const addTask = (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span>${taskText}</span>
      <div class="task-buttons">
        <button class="edit-btn">
            <img src="Pen.png" alt="Edit">
        </button>
        <button class="delete-btn">
            <img src="Trash.png" alt="Delete">
        </button>
        </div>

    `;

    const checkbox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
    });

    editBtn.addEventListener('click', () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector('span').textContent;
        li.remove();
        toggleEmptyState();
      }
    });

    deleteBtn.addEventListener('click', () => {
      li.remove();
      toggleEmptyState();
    });

    taskList.appendChild(li);
    taskInput.value = '';
    toggleEmptyState();
  };

  taskForm.addEventListener('submit', addTask);

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask(e);
    }
  });

  toggleEmptyState();
});
