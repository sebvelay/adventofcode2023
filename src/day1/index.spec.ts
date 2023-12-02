import {sumOfCalibrationValues, sumOfCalibrationValuesPart2} from "./index";
import {readFile} from "../util/util";

test('produce 142 with examples',()=>{

    let input = "1abc2\n" +
        "pqr3stu8vwx\n" +
        "a1b2c3d4e5f\n" +
        "treb7uchet"

    expect(sumOfCalibrationValues(input)).toBe(142);
})

test('part2',()=>{

    let input = "two1nine\n" +
        "eightwothree\n" +
        "abcone2threexyz\n" +
        "xtwone3four\n" +
        "4nineeightseven2\n" +
        "zoneight234\n" +
        "7pqrstsixteen"

    expect(sumOfCalibrationValuesPart2(input)).toBe(281);
})

test('part2 res',()=>{

    console.log(sumOfCalibrationValuesPart2(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day1\\input.txt")));
})