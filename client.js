// Select DOM elements
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const select = document.querySelector('.todo-select');

// Event Listeners
todoBtn.addEventListener('click', addItem);
todoList.addEventListener('click', modifyTask);
select.addEventListener('click', todoFilter);

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
  console.log(todos);

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
