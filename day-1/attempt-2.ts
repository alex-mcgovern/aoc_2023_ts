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


const reverse = (s: string | undefined) => s ? [...s].reverse().join("") : s

const textNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const reversedNumbers = textNumbers.map(reverse);

const toNumericStr = (v: string | undefined) => v && textNumbers.includes(v) ? `${textNumbers.indexOf(v) + 1}` : v

fs.readFile(args.file, "utf8", function (err: unknown, data: string) {
    let sum = 0

    data.split("\n")
        .map((line: string) => {
            const [first] = line.match(new RegExp(`(\\d|${textNumbers.join("|")})`, "g")) ?? [];
            const [lastReversed] = reverse(line)?.match(new RegExp(`(\\d|${reversedNumbers.join("|")})`, "g")) ?? []

            sum = sum + Number(`${toNumericStr(first)}${toNumericStr(reverse(lastReversed))}`)
        })


    console.log(sum); // 54578
});
