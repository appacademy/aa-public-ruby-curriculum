
const addTodos = document.querySelector('.add-todo-form');
const todoList = document.querySelector('.todos');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

export const addTodo = (e) => {
  e.preventDefault();
  // grab onto the input with the correct name
  const text = document.querySelector('[name=add-todo]').value;
  const todo = {
    text,
    done: false
  };

  todos.push(todo);
  populateList(todos, todoList);

  // Now we just need to set the todos in localStorage - make sure to stringify because 
  // localStorage only accepts strings!
  localStorage.setItem('todos', JSON.stringify(todos));

  // The reset will empty the form after submission
  e.currentTarget.reset();
};

// This function is in charge of rendering the list,
// we hand it the todos array we previously created and the element to 
// append onto. 
export const populateList = (todos = [], todoList) => {

  // go over our todos and append to the item handed in
  todoList.innerHTML = todos.map((todo, i) => {
    return `
        <li>
          <input type="checkbox" data-index=${i} ${todo.done ? 'checked' : ''} />
          <label for="item${i}">${todo.text}</label>
        </li>
      `;
  }).join('');
};

// we have to iterate through our todos to know if they are done or not. 
export function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip this unless it's an input
  const el = e.target;
  // we can get the element in question
  const index = el.dataset.index;
  // flip done status
  todos[index].done = !todos[index].done;
  // set up our new todos in storage and display on the page
  localStorage.setItem('todos', JSON.stringify(todos));
  populateList(todos, todoList);
}

// we are listing for the submit event here to know when the todo form is submitted
addTodos.addEventListener('submit', addTodo);

// we add our listener to the list because it will always be on the page regardless 
// of whether there are todos
todoList.addEventListener('click', toggleDone);

populateList(todos, todoList);
