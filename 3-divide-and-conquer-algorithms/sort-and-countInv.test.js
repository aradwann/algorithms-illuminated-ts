import tap from "tap";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import sortAndCountInv from "./sort-and-countInv.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

tap.test(
  "reading text file of numbers separated by newlines into an array",
  (childTest) => {
    fs.readFile(`${__dirname}/test-arr.txt`, "utf8", (err, data) => {
      if (err) {
        throw err; // tap will handle this
      }
      const arr = data.split("\n").map(Number);
      childTest.strictSame(
        arr,
        [54044, 14108, 79294, 29649, 25260, 60660, 2995, 53777, 49689, 9083]
      );

      childTest.end();
    });
  }
);

tap.test("test count inversions", (childTest) => {
  const arr = [
    54044, 14108, 79294, 29649, 25260, 60660, 2995, 53777, 49689, 9083,
  ];
  childTest.strictSame(sortAndCountInv(arr)[1], 28);
  childTest.end();
});
