import { convertTxtToArrSync } from './utils'
import tap from 'tap'
import path from 'path'

const relativePath = './test-arr.txt'
const p = path.resolve(__dirname, relativePath)

tap.strictSame(convertTxtToArrSync(p), [54044,
  14108,
  79294,
  29649,
  25260,
  60660,
  2995,
  53777,
  49689,
  9083])
