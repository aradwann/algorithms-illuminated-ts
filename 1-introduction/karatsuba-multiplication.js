let firstHalf = (no, n2) => BigInt(String(no).slice(0, n2));
let secondHalf = (no, n2) => BigInt(String(no).slice(n2, n2 * 2));

function karatsuba(x, y) {
  // assume x, y are n-digit positive integers
  // assume  n is a power of two

  if (x < 10 || y < 10) {
    return x * y;
  } else {
    let nx = String(x).length;
    let ny = String(y).length;
    let nx2 = Math.round(nx / 2);
    let ny2 = Math.round(ny / 2);
    let a = firstHalf(x, nx2);
    let b = secondHalf(x, nx2);
    let c = firstHalf(y, ny2);
    let d = secondHalf(y, ny2);

    let p = a + b;
    let q = c + d;

    let ac = karatsuba(a, c);
    let bd = karatsuba(b, d);
    let pq = karatsuba(p, q);
    ac = Number(ac);
    bd = Number(bd);
    pq = Number(pq);

    let adbc = pq - ac - bd;
    adbc = Number(adbc);

    let n2 = Math.min(nx2, ny2);
    return Math.pow(10, n2 * 2) * ac + Math.pow(10, n2) * adbc + bd;
  }
}

let num1 = 3141592653589793238462643383279502884197169399375105820974944592n;
let num2 = 2718281828459045235360287471352662497757247093699959574966967627n;
let r = karatsuba(num1, num2);
let r2 = num1 * num2;
console.log(r);
console.log(r2);
