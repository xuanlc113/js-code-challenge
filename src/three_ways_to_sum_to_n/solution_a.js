// Problem 1 A
// Task: Provide 3 unique implementations of the following function.
// Input: `n` - any integer from `0` to `Number.MAX_SAFE_INTEGER`.
// Output: `return` - summation to `n`, i.e. sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15.

var sum_to_n = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) { // while?
    sum += i;
  }
  return sum;
};

console.log(sum_to_n(5));
