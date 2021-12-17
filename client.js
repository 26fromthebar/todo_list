// Select DOM elements
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

// Event Listeners
todoBtn.addEventListener('click', addItem);
todoList.addEventListener('click', modifyTask);

// Functions
function addItem(e) {
  e.preventDefault();

  if (todoInput.value === '') return;

  const item = document.createElement('li');
  item.classList.add('todo-item');

  const itemDiv = document.createElement('div');
  itemDiv.classList.add('todo-item-content');

  const itemText = document.createElement('p');
  itemText.textContent = todoInput.value;
  itemText.classList.add('todo-item-text');

  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = `&check;`;
  completedBtn.classList.add('options-btn', 'completed-btn');

  const ongoingBtn = document.createElement('button');
  ongoingBtn.innerHTML = `&#9711;`;
  ongoingBtn.classList.add('options-btn', 'ongoing-btn', 'ongoing');

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = `&#10005;`;
  deleteBtn.classList.add('options-btn', 'delete-btn');

  itemDiv.append(itemText, completedBtn, ongoingBtn, deleteBtn);
  item.appendChild(itemDiv);
  todoList.appendChild(item);
  todoInput.value = '';
}

function modifyTask(e) {
  const clickedItem = e.target;

  if (clickedItem.classList.contains('delete-btn')) {
    // clickedItem.parentElement.classList.add('delete');
    clickedItem.parentElement.remove();
  } else if (clickedItem.classList.contains('completed-btn')) {
    clickedItem.classList.toggle('completed-marked');
    clickedItem.previousElementSibling.classList.toggle('completed-text');
    clickedItem.nextElementSibling.classList.toggle('ongoing');
  }
}
