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
/**
 *
 * @param {Array} firstArr first sorted array of length n / 2
 * @param {Array} secondArr second sorted array of length n / 2
 *
 * assume n is even
 *
 * @return {Array} array of two elements,
 *  the first element is the merged sorted array and second element is the split count
 */
// /////// read the assignment txt file and convert it to array ////////////
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
function mergeAndCountSplitInv (firstArr, secondArr) {
  let splitInv = 0
  const arr = []

  while (firstArr.length && secondArr.length) {
    if (firstArr[0] < secondArr[0]) {
      arr.push(firstArr.shift())
    } else {
      arr.push(secondArr.shift())
      splitInv += firstArr.length
    }
  }
  const merged = [...arr, ...firstArr, ...secondArr]
  return [merged, splitInv]
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
/**
 *
 * @param {Array} arr unsorted array
 * @return {Array}  array of two elements,
 *  the first element is the merged sorted array and second element is the split count
 */
function sortAndCountInv (arr) {
  // assume len is even
  const len = arr.length
  if (len <= 1) {
    // base case
    return [arr, 0]
  }
  // recursive cases
  const [firstArr, leftInv] = sortAndCountInv(arr.slice(0, len / 2))
  const [secondArr, rightInv] = sortAndCountInv(arr.slice(len / 2))
  const [mergedArr, splitInv] = mergeAndCountSplitInv(firstArr, secondArr)
  const invCount = leftInv + rightInv + splitInv
  return [mergedArr, invCount]
}

export default sortAndCountInv

const filename = 'arr'
const __dirname = dirname(fileURLToPath(import.meta.url))

fs.readFile(`${__dirname}/${filename}.txt`, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const arr = data.split('\n').map(Number)
  sortAndCountInv(arr)
})
