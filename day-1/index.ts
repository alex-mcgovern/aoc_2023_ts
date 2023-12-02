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
