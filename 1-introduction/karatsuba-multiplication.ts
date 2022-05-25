
function splitNumberIntoHalves (n:number):Array<number> {
  const numberLen = String(n).length
  const halfNumberLen = Math.round(numberLen / 2)
  const firstHalf = Number(String(n).slice(0, halfNumberLen))
  const secondHalf = Number(String(n).slice(halfNumberLen, numberLen))
  return [firstHalf, secondHalf]
}

/**
 * multiplie two numbers together using karatsuba algorithm.
 * @param {int} x The first number.
 * @param {int} y The second number.
 * @return {int} The multiplication of the two numbers.
 */
function karatsuba (x:number, y: number):number {
  // assume x, y are n-digit positive integers
  // assume  n is a power of two

  if (x < 10 || y < 10) {
    return x * y
  }

  const [a, b] = splitNumberIntoHalves(x)
  const [c, d] = splitNumberIntoHalves(y)

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

  const n2 = Math.min(String(x).length, String(y).length)
  return 10 ** (n2 * 2) * ac + 10 ** n2 * adbc + bd
}

export default karatsuba
