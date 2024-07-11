# Selectors

Selectors are functions used to extract and format information from the
application state in different forms. Take the following state shape for
example:

```javascript
{
	todos: {
		1: {
			id: 1,
			body: 'learn selectors',
			done: 'done'
		},
		2: {
			id: 2,
			body: 'look good doing it',
			done: 'undone'
		}
	},
	filter: 'undone'
}
```

The state's `todos` are stored as an object. Keys correspond to `todo.id`s and
values correspond to `todo` objects. This yields O(1) for the lookup of a single
todo. However, storing all the todos as values of an object makes it slightly
inconvenient to obtain and render them all at once. To solve this inconvenience,
we use selectors.

* Define all of your app's selectors in a `frontend/reducers/selectors.js` file. Don't forget to export them!
* Selectors are passed the app's `state` and return information from the application state in a specified form (eg. an array).
* Use selectors to format different slice(s) of the state by calling them in a container's `mapStateToProps`.

For example, `getAllTodos` returns all the todos stored in the state as an array
of todo objects, making it easier to iterate over and render each one.

```js
// reducers/selectors.js
export const getAllTodos = ({ todos }) => (
	Object.keys(todos).map(id => todos[id])
);
```

A selector can be used in multiple components' `mapStateToProps`. For example,

```js
// components/containers/todo_list_container.jsx

import { getAllTodos } from '../../reducers/selectors';

const mapStateToProps = state => ({
	todos: getAllTodos(state),
});
```

Selectors are passed the entire application `state` so they can utilize
multiple slices of the application state to assemble data. For example,

```js
// reducers/selectors.js

export const getAllTodos = ({ todos }) => (
	Object.keys(todos).map(id => todos[id])
);

export const getFilteredTodos = ({ todos, filter }) => {
	let result = [];
	for (let id in todos) {
		if (todos[id].done === filter) {
			result.push(todos[id]);
		}
	}
	return result;
};

```

```js
// components/containers/todo_list_container.jsx

import { getAllTodos, getFilteredTodos } from '../../reducers/selectors';

const mapStateToProps = state => ({
	todos: getAllTodos(state),
	filteredTodos: getFilteredTodos(state),
});
```

**NB**: [`for...in`][for-in] iterates over the keys of an object (in an arbitrary order).

[for-in]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

# Selector Examples

```js
// reducers/selectors.js

// returns the state's todos as an array of todos
export const getAllTodos = ({ todos }) => (
	Object.keys(todos).map(id => todos[id]);
);

// returns the state's todos as an array of todos,
// filtered by their done/undone status
export const getFilteredTodos = ({ todos, filter }) => {
	let result = [];
	for (let id in todos) {
		if (todos[id].done === filter) { result.push(todos[id]); }
	}
	return result;
};

// returns the selected todo object or an empty todo object
// if no todo exists with given id
export const selectTodos = ({ todos }, id) => {
	const nullTodo = {
		id: null,
		body: "",
		done: 'undone'
	};
	return todos[id] || nullTodo;
};
```
