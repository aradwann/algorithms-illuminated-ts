/**
 *
 * @param {Array} firstArr sorted array of length n / 2, assuming n is even
 * @param {Array} secondArr sorted array of length n / 2, assuming n is even
 * @return {Array} merged sorted array from firstArr and secondArr
 */
function merge (firstArr, secondArr) {
  const arr = []
  while (firstArr.length && secondArr.length) {
    if (firstArr[0] < secondArr[0]) {
      arr.push(firstArr.shift())
    } else {
      arr.push(secondArr.shift())
    }
  }
  const merged = [...arr, ...firstArr, ...secondArr]
  return merged
}
/**
 *
 * @param {Array} arr an array of length n , assuming n is even
 * @return {Array} sorted array
 */
function mergeSort (arr) {
  // assume len is even
  const len = arr.length
  if (len <= 1) {
    // base case
    return arr
  }
  // recursive cases
  const firstArr = mergeSort(arr.slice(0, len / 2))
  const secondArr = mergeSort(arr.slice(len / 2))
  return merge(firstArr, secondArr)
}

export default mergeSort
