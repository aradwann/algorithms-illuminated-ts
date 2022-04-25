import mergeSort from "./merge-sort.js";
import tap from "tap";

const arr = [85, 9, 11, 27, 73, 74, 58, 23];
const sortedArr = [9, 11, 23, 27, 58, 73, 74, 85];

tap.strictSame(mergeSort(arr), sortedArr);
