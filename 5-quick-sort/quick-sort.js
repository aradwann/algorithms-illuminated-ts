/*
Quick sort is an algorithms for sorting of time complexity of O(n.log(n))
but it has a merit above merge sort that:
 it sorts array in place (space cpmplexity of O(1))
*/

// to be implemented differently (tracking by recursion)
let globComparisonNum = 0;
/**

                            psoudocode of Partition
Input: array of A of n distict integers,
       left and right endpoints l, r ∈ {1,2, ...., n} with l<=r
Postcondition:
  elements of the subarray A[l], A[l+1], ..., A[r] are partitioned around A[l]
Output: final position of pivot element
-----------------------------------------------------
p := A[l]
i := l+1
for j := l+1 to r do
  if A[j] < p then
    swap A[j] and A[i]
    i := i + 1  // restores invariant

swap A[l] and A[i-1]   // place pivot correctly

return i-1   // report final pivot position

 * @param {Array} arr array(that contain subarray of beginning l and ending r endpoints) 
                      to partition around a pivot element
 * @param {Number} l left endpoint (the begining of the subarray)
 * @param {Number} r right endpoint (the ending of the subarray)
 * @return {Number} the final position of the pivot element
 */
function partition(arr, l, r) {
  globComparisonNum += r - l;

  const p = arr[l];
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
/**
 * returns the index of the first element in the sub array
 * @param {Array} arr array(that contain subarray of beginning l and ending r endpoints)
 * @param {Number} l left endpoint (the begining of the subarray)
 * @param {Number} r right endpoint (the ending of the subarray)
 * @return {Number} l (the ending of the subarray)
 */
function choosePivotAsFirst(arr, l, r) {
  return l;
}
/**
 * returns the index of the last element in the sub array
 * @param {Array} arr array(that contain subarray of beginning l and ending r endpoints)
 * @param {Number} l left endpoint (the begining of the subarray)
 * @param {Number} r right endpoint (the ending of the subarray)
 * @return {Number} r (the ending of the subarray)
 */
function choosePivotAsFinal(arr, l, r) {
  return r;
}

/**
 * returns the index of the median element in the sub array
 * @param {Array} arr array(that contain subarray of beginning l and ending r endpoints)
 * @param {Number} l left endpoint (the begining of the subarray)
 * @param {Number} r right endpoint (the ending of the subarray)
 * @return {Number} m + l ( index of the median of the subarray)
 */
function medianIndex(arr, l, r) {
  let m;
  const subArrLen = r - l + 1;
  if (subArrLen % 2) {
    m = (subArrLen - 1) / 2;
  } else {
    m = subArrLen / 2 - 1;
  }
  return m + l;
}

/**
 * choosing pivot element based on median of three rule
   Consider the first, middle, and final elements of the given array
   Identify which of these three elements is the median
 * 
 * @param {Array} arr array(that contain subarray of beginning l and ending r endpoints) 
 * @param {Number} l left endpoint (the begining of the subarray)
 * @param {Number} r right endpoint (the ending of the subarray)
 * @return {Number}  ( index of the median of the three)
 */
function choosePivotAsMedian(arr, l, r) {
  // determine the index of the middle element of the sub-array
  const m = medianIndex(arr, l, r);

  if (
    (arr[l] > arr[m] && arr[l] < arr[r]) ||
    (arr[l] < arr[m] && arr[l] > arr[r])
  ) {
    return l;
  }
  if (
    (arr[m] > arr[l] && arr[m] < arr[r]) ||
    (arr[m] < arr[l] && arr[m] > arr[r])
  ) {
    return m;
  }
  if (
    (arr[r] > arr[m] && arr[r] < arr[l]) ||
    (arr[r] < arr[m] && arr[r] > arr[l])
  ) {
    return r;
  }
}

/**
 *  
 *                                   psoudocode of Quick Sort
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
 * 
 * quick sort sorts array in place
 * @param {Array} arr array(that contain subarray of beginning l and ending r endpoints) 
 * @param {Number} l left endpoint (the begining of the subarray)
 * @param {Number} r right endpoint (the ending of the subarray)
 */
function quickSort(arr, l, r) {
  // 0- or 1-element subarray
  if (l >= r) {
    return;
  }

  const i = choosePivotAsMedian(arr, l, r);

  // make pivot first
  [arr[l], arr[i]] = [arr[i], arr[l]];

  // j = new pivot position
  const j = partition(arr, l, r);

  quickSort(arr, l, j - 1);
  quickSort(arr, j + 1, r);
}

// ////////////////////////////// testing /////////////////////////////////////
/*
Test case #1: This file contains 10 integers, representing a 10-element array.
  Your program should count 25 comparisons if you always use the first element as the pivot,
  31 comparisons if you always use the last element as the pivot,
  and 21 comparisons if you always use the median-of-3 as the pivot
  (not counting the comparisons used to compute the pivot).

Test case #2: This file contains 100 integers, representing a 100-element array.
  Your program should count 620 comparisons if you always use the first element as the pivot,
  573 comparisons if you always use the last element as the pivot,
  and 502 comparisons if you always use the median-of-3 as the pivot
  (not counting the comparisons used to compute the pivot).
 */

import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

fs.readFile(`${__dirname}/test1.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const arr = data.split("\n").map(Number);

  quickSort(arr, 0, arr.length - 1);
  console.log(
    `the sum on comparisons by choosing pivot  is ${globComparisonNum}`
  );
});
