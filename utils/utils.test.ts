import { convertTxtToArrSync, convertTxtToGraphSync } from './utils'
import tap from 'tap'
import path from 'path'
import Graph from '../Karger-algorithm/karger-algorithm'
// import Graph from '../Karger-algorithm/karger-algorithm'

const arrayPath = path.resolve(__dirname, './test-arr.txt')
const array = [54044,
  14108,
  79294,
  29649,
  25260,
  60660,
  2995,
  53777,
  49689,
  9083]
const graphPath = path.resolve(__dirname, './graph-test.txt')
const graph = new Graph([1, 2, 3, 4], [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4]])

tap.strictSame(convertTxtToArrSync(arrayPath), array)

tap.strictSame(convertTxtToGraphSync(graphPath), graph)
