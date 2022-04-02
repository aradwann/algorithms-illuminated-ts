"use strict";
/* 
An inversion of an array: is apair of elements that are out of order
This is script is an implementation of sort and count inversions algorithm, 
which piggbacks the merge sort algorithms to achieve a fast algorithm
of O(n.log(n))
*/

/* psoudocode of Merge-and-CountSplitInv

input: sorted arrays C and D (length n/2 each)
output: sorted array B (length n)  and the number of split inversions 
simplifying assumption: n is even
-------------------------------------------------------------------
i:=1, j:=1, splitInv := 0
for k := 1 to n do
  if C[i] < D[j] then
    B[k] := C[i]
    i := i + 1
  else 
    B[k] := D[j]
    j := j + 1
    splitInv := splitInv + (n/2 - i + 1)
*/

function MergeAndCountSplitInv(firstArr, secondArr) {
  // first array and second arrays are two sorted arrays of length n / 2
  // returns a merged sorted array
  // assume n is even
  let i = 0;
  let j = 0;
  let n = firstArr.length * 2;
  let splitInv = 0;
  let arr = [];

  while (firstArr.length && secondArr.length) {
    if (firstArr[0] < secondArr[0]) {
      arr.push(firstArr.shift());
    } else {
      arr.push(secondArr.shift());
      splitInv += firstArr.length;
    }
  }
  const merged = [...arr, ...firstArr, ...secondArr];
  return [merged, splitInv];
}
/* psoudocode of Sort-and-CountInv

input: array A of n distinct integers
output: sorted array B with the same integers, and the number of inversions of A
-------------------------------------------------------------------
if n = 0 or n = 1 then
  return (A,0)
else
  (C, leftInv) := Sort-and-counterInv(first half of A)
  (D, rightInv) := Sort-and-CountInv(second half of A)
  (B, splitInv) := Merge-and-CountSplitInV(C, D)
  return (B, leftInv + rightInv + splitInv)
*/
function sortAndCountInv(arr) {
  // assume len is even
  let len = arr.length;
  if (len <= 1) {
    // base case
    return [arr, 0];
  } else {
    // recursive cases
    let [firstArr, leftInv] = sortAndCountInv(arr.slice(0, len / 2));
    let [secondArr, rightInv] = sortAndCountInv(arr.slice(len / 2));
    let [mergedArr, splitInv] = MergeAndCountSplitInv(firstArr, secondArr);
    const invCount = leftInv + rightInv + splitInv;
    return [mergedArr, invCount];
  }
}

/////////////////////// read the assignment txt file and convert it to array ////////////////////

const fs = require("fs");

fs.readFile(`${__dirname}/arr.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let arr = data.split("\n").map(Number);

  let [mergedArr1, invNum1] = sortAndCountInv(arr);
  console.log("number of inversions of arr 1 is " + invNum1);
});
