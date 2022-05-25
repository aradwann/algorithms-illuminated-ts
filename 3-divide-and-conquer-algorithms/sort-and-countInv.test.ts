import tap from 'tap'
import sortAndCountInv from './sort-and-countInv'

tap.test('test count inversions', (childTest) => {
  const arr = [
    54044, 14108, 79294, 29649, 25260, 60660, 2995, 53777, 49689, 9083
  ]
  childTest.strictSame(sortAndCountInv(arr)[1], 28)
  childTest.end()
})
