import tap from 'tap'
import karatsuba from './karatsuba-multiplication'

// const num1 = 3141592653589793238462643383279502884197169399375105820974944592n;
// const num2 = 2718281828459045235360287471352662497757247093699959574966967627n;

// tap.equal(karatsuba(99999, 9999), 99999 * 9999);
// tap.equal(karatsuba(num1, num2), num1 * num2);

tap.equal(karatsuba(30, 30), 30 * 30)
