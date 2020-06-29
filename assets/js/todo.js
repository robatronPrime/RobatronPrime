// selectors
const todoInput = document.querySelector('.todos__input');
const todoButton = document.querySelector('.todos__button');
const todoList = document.querySelector('.todos__list');
const filter = document.querySelector('.todos__select__filter');
const todoObj = new Object();
let localTodos;

// functions
const addTodo = e => {
  // prevent form submition
  e.preventDefault();

  todoBuild(todoInput.value, todoObj.checked);
  // add to localStorage
  saveTodos(todoInput.value);
  //  clear value
  todoInput.value = '';
};

const todoBuild = (value, checked) => {
  // todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // create li
  const newTodo = document.createElement('li');
  newTodo.innerText = value;
  newTodo.classList.add('todo__item');
  todoDiv.appendChild(newTodo);
  // check button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"><i/>';
  completeButton.classList.add('complete-button');
  todoDiv.appendChild(completeButton);
  // create trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
  trashButton.classList.add('trash-button');
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);
  // mark as checked
  if (checked !== null && checked === true) {
    todoDiv.classList.add('completed');
  }
};

const deleteCheck = e => {
  const item = e.target;
  const todo = item.parentElement;

  // delete todo
  if (item.classList.contains('trash-button')) {
    // animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => todo.remove());
  }
};

const completeCheck = e => {
  const item = e.target;
  const todo = item.parentElement;

  //  check mark
  if (item.classList.contains('complete-button')) {
    todo.classList.toggle('completed');
    localTodos = checkLocal(localTodos);

    localTodos.forEach(localTodo => {
      if (localTodo.text !== todo.querySelector('.todo__item').innerText)
        return;
      switch (localTodo.checked) {
        case false:
          localTodo.checked = true;
          break;

        case true:
          localTodo.checked = false;
          break;

        default:
          break;
      }
    });
    localStorage.setItem('todos', JSON.stringify(localTodos));
  }
};

const filterTodos = e => {
  const todos = todoList.childNodes;
  // const filter = document.querySelector('.todos__select__filter');

  todos.forEach(todo => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        todo.classList.contains('completed')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none');
        break;

      case 'uncompleted':
        !todo.classList.contains('completed')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none');
        break;

      default:
        break;
    }
  });
};

const checkLocal = localTodos => {
  // check local storage
  localStorage.getItem('todos') === null
    ? (localTodos = [])
    : (localTodos = JSON.parse(localStorage.getItem('todos')));
  return localTodos;
};

const saveTodos = (todoText, checked = false) => {
  localTodos = checkLocal(localTodos);

  todoObj.text = todoText;
  todoObj.checked = checked;

  localTodos.push(todoObj);
  localStorage.setItem('todos', JSON.stringify(localTodos));
};

const getTodos = () => {
  localTodos = checkLocal(localTodos);

  if (localTodos === null) return;
  localTodos.forEach(localTodo => todoBuild(localTodo.text, localTodo.checked));
};

const removeLocalTodos = todo => {
  localTodos = checkLocal(localTodos);
  todoText = todo.querySelector('.todo__item').innerText;
  // remove the todo from the array with the index
  localTodos.splice(localTodos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(localTodos));
};

// event listners
if (todoButton !== null && todoList !== null && filter !== null) {
  todoButton.addEventListener('click', addTodo);
  todoList.addEventListener('click', deleteCheck);
  todoList.addEventListener('click', completeCheck);
  filter.addEventListener('click', filterTodos);
  window.addEventListener('DOMContentLoaded', getTodos);
  window.addEventListener('DOMContentLoaded', getTodos);
  window.addEventListener('DOMContentLoaded', filterTodos);
}
