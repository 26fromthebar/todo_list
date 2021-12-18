// Select DOM elements
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const select = document.querySelector('.todo-select');

// Event Listeners
todoBtn.addEventListener('click', addItem);
todoList.addEventListener('click', modifyTask);
select.addEventListener('click', todoFilter);
window.addEventListener('DOMContentLoaded', getStoredTodos);

// Functions
function addItem(e) {
  e.preventDefault();

  if (todoInput.value === '') return;

  const item = document.createElement('li');
  item.classList.add('todo-item');
  item.classList.add('status-ongoing');

  const itemDiv = document.createElement('div');
  itemDiv.classList.add('todo-item-content');

  const itemText = document.createElement('p');
  itemText.textContent = todoInput.value;
  itemText.classList.add('todo-item-text');

  // Save todo to localStorage
  saveTodoLocal(itemText.textContent);

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
    clickedItem.closest('li').classList.add('remove');
    removeTodoLocal(clickedItem.closest('div').childNodes[0].textContent);
    clickedItem.closest('li').addEventListener('transitionend', () => {
      clickedItem.closest('li').remove();
    });
  } else if (clickedItem.classList.contains('completed-btn')) {
    clickedItem.classList.toggle('completed-marked');
    clickedItem.previousElementSibling.classList.toggle('completed-text');
    clickedItem.nextElementSibling.classList.toggle('ongoing');
    clickedItem.closest('li').classList.toggle('status-completed');
    clickedItem.closest('li').classList.toggle('status-ongoing');
  }
}

function todoFilter(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.classList.remove('hide');
        break;
      case 'ongoing':
        if (!todo.classList.contains('status-ongoing')) {
          todo.classList.add('hide');
        } else {
          todo.classList.remove('hide');
        }
        break;
      case 'completed':
        if (!todo.classList.contains('status-completed')) {
          todo.classList.add('hide');
        } else {
          todo.classList.remove('hide');
        }
        break;
    }
  });
}

function saveTodoLocal(todo) {
  const todoItems = [];

  if (localStorage.getItem('todoItems') !== null) {
    const storedTodos = JSON.parse(localStorage.getItem('todoItems'));
    todoItems.push(...storedTodos);
  }
  todoItems.push(todo);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function removeTodoLocal(todo) {
  const todoItems = JSON.parse(localStorage.getItem('todoItems'));
  let index = todoItems.indexOf(todo);
  todoItems.splice(index, 1);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function getStoredTodos() {
  const todoItems = [];
  if (localStorage.getItem('todoItems') !== null) {
    const storedTodos = JSON.parse(localStorage.getItem('todoItems'));
    todoItems.push(...storedTodos);
  }

  todoItems.forEach((todoItem) => {
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.classList.add('status-ongoing');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('todo-item-content');

    const itemText = document.createElement('p');
    itemText.textContent = todoItem;
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
  });
}
