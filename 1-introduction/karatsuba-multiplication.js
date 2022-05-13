// defining the first half and the second half of a Number
const firstHalf = (no, n2) => BigInt(String(no).slice(0, n2))
const secondHalf = (no, n2) => BigInt(String(no).slice(n2, n2 * 2))

/**
 * multiplie two numbers together using karatsuba algorithm.
 * @param {int} x The first number.
 * @param {int} y The second number.
 * @return {int} The multiplication of the two numbers.
 */
function karatsuba (x, y) {
  // assume x, y are n-digit positive integers
  // assume  n is a power of two

  if (x < 10 || y < 10) {
    return x * y
  }
  const nx = String(x).length
  const ny = String(y).length
  const nx2 = Math.round(nx / 2)
  const ny2 = Math.round(ny / 2)
  const a = firstHalf(x, nx2)
  const b = secondHalf(x, nx2)
  const c = firstHalf(y, ny2)
  const d = secondHalf(y, ny2)

  const p = a + b
  const q = c + d

  let ac = karatsuba(a, c)
  let bd = karatsuba(b, d)
  let pq = karatsuba(p, q)
  ac = Number(ac)
  bd = Number(bd)
  pq = Number(pq)

  let adbc = pq - ac - bd
  adbc = Number(adbc)

  const n2 = Math.min(nx2, ny2)
  return 10 ** (n2 * 2) * ac + 10 ** n2 * adbc + bd
}

export default karatsuba
