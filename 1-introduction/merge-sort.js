"use strict";

function merge(firstArr, secondArr) {
  // first array and second arrays are two sorted arrays of length n / 2
  // returns a merged sorted array
  // assume n is even

  let arr = [];
  while (firstArr.length && secondArr.length) {
    if (firstArr[0] < secondArr[0]) {
      arr.push(firstArr.shift());
    } else {
      arr.push(secondArr.shift());
    }
  }
  const merged = [...arr, ...firstArr, ...secondArr];
  return merged;
}

function mergeSort(arr) {
  // assume len is even
  let len = arr.length;
  if (len <= 1) {
    // base case
    return arr;
  } else {
    // recursive cases
    let firstArr = mergeSort(arr.slice(0, len / 2));
    let secondArr = mergeSort(arr.slice(len / 2));
    return merge(firstArr, secondArr);
  }
}

let arr = [85, 9, 11, 27, 73, 74, 58, 23];
console.log(mergeSort(arr));
console.log(mergeSort(arr).length);
