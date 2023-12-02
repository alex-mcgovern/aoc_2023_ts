/**
* two1nine
* eightwothree
* abcone2threexyz
* xtwone3four
* 4nineeightseven2
* zoneight234
* 7pqrstsixteen
*
* In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
*/

import minimist from "minimist";
import fs from "fs";

type Args = {
    file: string;
};

const args = minimist(process.argv.slice(2)) as unknown as Args;

const textNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

fs.readFile(args.file, "utf8", function (err: unknown, data: string) {
    let sum = 0

    data.split("\n")
        .map((line: string) => {
            const numbers = [...line.matchAll(new RegExp(`(?=(\\d|${textNumbers.join("|")}))`, "g"))!].map(m => m[1])
            return numbers?.map((v) => textNumbers.includes(v) ? `${textNumbers.indexOf(v) + 1}` : v)
        })
        .forEach((d) => {
            if (!d) return;
            sum = sum + Number(`${d[0]}${d.at(-1)}`)
        })

    console.log(sum); // 54578
});
