const arr = [1, 2, [3, 4, [5, 6, [7]]]];

// 1. flat
arr.flat(3);

// 2. reduce + concat

const flatDeep = (arr, d = 1) => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
};

// 2. forEach + isArray + push
const eachDeep = (arr, d = 1) => {
  const result = [];
  (function flat(arr, d) {
    arr.forEach(val => {
      if (Array.isArray(val) && d > 0) {
        flat(arr, d - 1);
      } else {
        result.push(val);
      }
    });
  })(arr, d);
  return result;
};

// 3. stack
const stackFlat = arr => {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  return result;
};
