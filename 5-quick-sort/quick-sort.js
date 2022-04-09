"use strict";
/* 
Quick sort is an algorithms for sorting of time complexity of O(n.log(n)) 
but it has a merit above merge sort that it sorts array in place (space cpmplexity of O(1))
*/

/*
                            psoudocode of Partition
Input: array of A of n distict integers, left and right endpoints l, r ∈ {1,2, ...., n} with l<=r
Postcondition: elements of the subarray A[l], A[l+1], ..., A[r] are partitioned around A[l]
Output: final position of pivot element
------------------------------------------------------------------------------------------------------
p := A[l]
i := l+1
for j := l+1 to r do
  if A[j] < p then
    swap A[j] and A[i]
    i := i + 1  // restores invariant

swap A[l] and A[i-1]   // place pivot correctly 
 
return i-1   // report final pivot position
*/

function partition(arr, l, r) {
  let p = arr[l];
  let i = l + 1;
  for (let j = l + 1; j <= r; j++) {
    if (arr[j] < p) {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i++;
    }
  }
  [arr[l], arr[i - 1]] = [arr[i - 1], arr[l]];
  return i - 1;
}

function choosePivotAsFirst(arr, l, r) {
  return l;
}
function choosePivotAsFinal(arr, l, r) {
  return r;
}
function choosePivotAsMedian(arr, l, r) {
  // choosing pivot element based on median of three rule
  // Consider the first, middle, and final elements of the given array
  // Identify which of these three elements is the median

  // determine the index of the middle element of array
  let m;
  if (arr.length % 2) {
    m = (arr.length - 1) / 2;
  } else {
    m = arr.length / 2 - 1;
  }

  let p;
  if (
    (arr[m] < arr[l] && arr[m] > arr[r]) ||
    (arr[m] > arr[l] && arr[m] < arr[r])
  ) {
    p = m;
  } else if (
    (arr[r] < arr[l] && arr[r] > arr[m]) ||
    (arr[r] > arr[l] && arr[r] < arr[m])
  ) {
    p = r;
  } else {
    p = l;
  }
  return p;
}

/*
                            psoudocode of Quick Sort
Input: array of A of n distict integers, left and right endpoints l, r ∈ {1,2, ...., n} 
Postcondition: elements of the subarray A[l], A[l+1], ..., A[r] are sorted from smallet to largest
------------------------------------------------------------------------------------------------------
if l >= r then  // 0- or 1-element subarray
  return
i := ChoosePivot(A, l, r)  // different implementations
swap A[l] and A[i]   // make pivot first
j:= Partition(A, l, r)  // j = new pivot position
QuickSort(A, l, j-1) // recurse on first part
QuickSort(A, j+1, r)  // recurse on second part 
*/

function quickSort(arr, l, r) {
  if (l >= r) {
    return;
  }
  let i = choosePivotAsFirst(arr, l, r);

  [arr[l], arr[i]] = [arr[i], arr[l]];
  let j = partition(arr, l, r);

  quickSort(arr, l, j - 1);
  quickSort(arr, j + 1, r);
}

// let arr = [3, 8, 2, 5, 1, 4, 7, 6];
// console.log(arr);
// console.log(choosePivotAsMedian(arr, 0, arr.length - 1));
// partition(arr, 0, arr.length - 1);
// quickSort(arr, 0, arr.length - 1);
// console.log(arr);

const fs = require("fs");

fs.readFile(`${__dirname}/arr.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let arr = data.split("\n").map(Number);

  console.log(arr);
  quickSort(arr, 0, arr.length);
  console.log(arr);
});
