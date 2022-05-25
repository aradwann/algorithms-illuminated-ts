import { convertTxtToArrSync } from './utils'
import tap from 'tap'

tap.strictSame(convertTxtToArrSync('./test-arr.txt'), [54044,
  14108,
  79294,
  29649,
  25260,
  60660,
  2995,
  53777,
  49689,
  9083])
