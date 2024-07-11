# Lodash

`lodash` is a JavaScript utility library and [npm-package][lodash] that provides many useful helper functions for solving common problems. For this course, we're going to employ two `lodash` helper methods to write cleaner and more concise React/Redux code: `merge()` and `union()`.

## merge

`merge(new, original)` is a quick and effective way to 'deep-dup' an object. Prefer it to `Object.assign()`, which only shallowly copies objects and can cause issues with deeply-nested re-assignment.

```js
import merge from 'lodash/merge';

let original = {a: {b: 'original'}};

let shallowCopy = Object.assign({}, original);
let deepCopy = merge({}, original);

deepCopy.a.b = 'changed';
console.log(original); // {a: {b: 'original'}}

shallowCopy.a.b = 'changed';
console.log(original); // {a: {b: 'changed'}}
```

## union

`union(arr1, arr2)` creates an array of unique values, in insertion order, from two given arrays.

Consider using `union` when you want to add items to a unique array that
might already contain them. Be careful with non-primitive elements, since objects with identical key-value
pairs are unique vis-a-vis each other.

```js
import union from 'lodash/union';

let ids = [1, 4, 5];
let newIds = [2, 3, 4];

let result = union(ids, newIds); //=> [1, 4, 5, 2, 3]
```

Contrast this to vanilla JS:

In ES6:

```js
let ids = [1, 4, 5];
let newIds = [2, 3, 4];

// ES6

let result = [];

// O(n^2) 
// or use a hash for O(n) ;)
[...ids, ...newIds].forEach(id => {
	if (!result.includes(id)) {
		result.push(id);
	}
});
```

In ES5:

```js
var result = [];
var ids = [1, 4, 5];
var newIds = [2, 3, 4];

(ids.concat(newIds)).forEach(function(id) {
	var shouldInsert = true;

	result.forEach(function(resultId) {
		if (resultId === id) {
			shouldInsert = false;
		}
	});

	if (shouldInsert) {
		result.push(id);
	}
});
```

[lodash]: https://www.npmjs.com/package/lodash
