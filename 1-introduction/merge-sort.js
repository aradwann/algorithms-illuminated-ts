"use strict";

function merge(firstArr, secondArr) {
  // first array and second arrays are two sorted arrays of length n / 2
  // returns a merged sorted array
  // assume n is even
  let i = 0;
  let j = 0;
  let n = firstArr.length * 2;
  let merged = [];

  for (let k = 0; k <= n - 1; k++) {
    // when one of the two sorted arrays is fully inserted into the merged array
    // then insert the rest of the elements of the remaining array
    if (j === secondArr.length || i === firstArr.length) {
      let rest = [];
      if (j === secondArr.length) {
        rest = firstArr.slice(i);
      } else {
        rest = secondArr.slice(j);
      }

      merged.push(...rest);
      return merged;
    }

    if (firstArr[i] < secondArr[j]) {
      merged[k] = firstArr[i];
      i++;
    } else {
      merged[k] = secondArr[j];
      j++;
    }
  }
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
