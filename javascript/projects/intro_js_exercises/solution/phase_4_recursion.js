// range
function range(start, end) {
  if (start === end) {
    return [];
  }

  let r = range(start, end - 1);
  r.push(end - 1);
  return r;
}

console.log(`range(3, 10) = ${range(3, 10)}`);

// sumRec
function sumRec(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  let lastNum = numbers[numbers.length - 1];
  return sumRec(numbers.slice(0, numbers.length - 1)) + lastNum;
}

console.log(`sumRec([1, 3, 5]) = ${sumRec([1, 3, 5])}`);

// sumIter
function sumIter(numbers) {
  let sum = 0;

  numbers.forEach(function (number) {
    sum += number;
  });

  // or use reduce
  const reducedSum = numbers.reduce((acc, el) => acc + el);

  return sum;
  // return reducedSum;
}

console.log(`sumIter([1, 3, 5]) = ${sumIter([1, 3, 5])}`);

// exp1, exp2
function exp1(base, exponent) {
  return exponent === 0 ? 1 : (base * exp1(base, exponent - 1));
}

console.log(`exp1(2, 4) = ${exp1(2, 4)}`);

function exp2(base, exponent) {
  if (exponent === 0) {
    return 1;
  }

  if (exponent % 2 === 0) {
    let subAnswer = exp2(base, exponent / 2);
    return subAnswer * subAnswer;
  } else {
    let subAnswer = exp2(base, ((exponent - 1) / 2));
    return subAnswer * subAnswer * base;
  }
}

console.log(`exp2(2, 4) =  ${exp2(2, 4)}`);
console.log(`exp2(2, 5) =  ${exp2(2, 5)}`);

// fibsRec, fibsIter
function fibsRec(n) {
  if (n < 3) {
    return [0, 1].slice(0, n);
  }

  let fibs = fibsRec(n - 1);
  fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);

  return fibs;
}

console.log(`fibsRec(5) = ${fibsRec(5)}`);

function fibsIter(n) {
  let fibs = [0, 1];
  if (n < 3) {
    return fibs.slice(0, n);
  }

  while (fibs.length < n) {
    fibs.push(fibs[fibs.length - 2] + fibs[fibs.length - 1]);
  }

  return fibs;
}

console.log(`fibsIter(5) = ${fibsIter(5)}`);

// deepDup

// This function is a type-checking helper function
// See this article for an explanation:
// https://toddmotto.com/understanding-javascript-types-and-reliable-type-checking/

function deepDup(arr) {
  if (!(arr instanceof Array)) {
    return arr;
  }
  return arr.map((el) => {
    return deepDup(el);
  });
}

const array = [[2],3];
const dupedArray = deepDup(array);
console.log(`deepDup original = ${JSON.stringify(array)}`);

dupedArray[0].push(4);

console.log(`deepDup original = ${JSON.stringify(array)} (should not be mutated)`);
console.log(`deepDup duped = ${JSON.stringify(dupedArray)} (should be mutated)`);

// bsearch
function bsearch(numbers, target) {
  if (numbers.length === 0) {
    return -1;
  }

  const probeIdx = Math.floor(numbers.length / 2);
  const probe = numbers[probeIdx];

  if (target === probe) {
    return probeIdx;
  } else if (target < probe) {
    const left = numbers.slice(0, probeIdx);
    return bsearch(left, target);
  } else {
    const right = numbers.slice(probeIdx + 1);
    const subProblem = bsearch(right, target);

    return subProblem === -1 ? -1 : subProblem + (probeIdx + 1);
  }
}

console.log(`bsearch([1, 2, 3], 3) = ${bsearch([1, 2, 3], 3)}`);
console.log(`bsearch([1, 2, 3], 2.5) = ${bsearch([1, 2, 3], 2.5)}`);

// merge, mergeSort
function merge(left, right) {
  const merged = [];

  while (left.length > 0 && right.length > 0) {
    let nextItem = (left[0] < right[0]) ? left.shift() : right.shift();
    merged.push(nextItem);
  }

  return merged.concat(left, right);
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else {
    const middle = Math.floor(array.length / 2);

    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));

    return merge(left, right);
  }
}

console.log(`mergeSort([4, 5, 2, 3, 1]) = ${mergeSort([4, 5, 2, 3, 1])}`);

// subsets
function subsets(array) {
  if (array.length === 0) {
    return [[]];
  }

  const first = array[0];
  const withoutFirst = subsets(array.slice(1));
  // remember, we don't want to mutate the subsets without the first element
  // hence, the 'concat'
  const withFirst = withoutFirst.map(sub => [first].concat(sub) );

  return withoutFirst.concat(withFirst);
}

console.log(`subsets([1, 3, 5]) = ${JSON.stringify(subsets([1, 3, 5]))}`);
