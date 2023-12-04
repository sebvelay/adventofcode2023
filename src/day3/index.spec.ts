import {
    getAllNumbers,
    getPartNumbers, getStarsFromInput,
    getSumOfPartNumbersWithoutAdjacentSymbol,
    isAdjacent,
    isSymbol,
    positionOf, Star, sumOfGears
} from "./index";
import {readFile} from "../util/util";

const example = "467..114..\n" +
    "...*......\n" +
    "..35..633.\n" +
    "......#...\n" +
    "617*......\n" +
    ".....+.58.\n" +
    "..592.....\n" +
    "......755.\n" +
    "...$.*....\n" +
    ".664.598.."

const example2 =
    "12.......*..\n" +
    "+.........34\n" +
    ".......-12..\n" +
    "..78........\n" +
    "..*....60...\n" +
    "78.........9\n" +
    ".5.....23..$\n" +
    "8...90*12...\n" +
    "............\n" +
    "2.2......12.\n" +
    ".*.........*\n" +
    "1.1..503+.56"

describe("part 1", () => {
    it("example return 4361", () => {
        expect(getSumOfPartNumbersWithoutAdjacentSymbol(example)).toBe(4361);
    })

    it("should return position", () => {
        expect(positionOf(example, "467")).toStrictEqual({ligne: 0, colonne: 0})
    })

    it("should return position 755", () => {
        expect(positionOf(example, "755")).toStrictEqual({ligne: 7, colonne: 6})
    })

    it("should return part numbers", () => {
        expect(getPartNumbers(example)).toStrictEqual([467, 35, 633, 617, 592, 755, 664, 598]);
    })

    it("should return part numbers with identic numbers sometimes", () => {
        const example = "467..114..\n" +
            "...*......\n" +
            "..35..633.\n" +
            "......#...\n" +
            "617*......\n" +
            ".....+.58.\n" +
            "..592.....\n" +
            "......755.\n" +
            "...$.*....\n" +
            ".114.598.."

        expect(getPartNumbers(example)).toStrictEqual([467, 35, 633, 617, 592, 755, 114, 598]);
    })

    it("should be true si j'ai un symbol au début",()=>{
        const example = "467..114..\n" +
            "...*56.....\n";
        expect(isAdjacent(example,56)).toBeTruthy();
    })

    it("should be false si je suis en début de ligne",()=>{
        const example = "467..114..\n" +
            "....56.....\n";
        expect(isAdjacent(example,467)).toBeFalsy();
    })

    it("617 is adjacent to a symbol at the end",()=>{
        expect(isAdjacent(example,617)).toBeTruthy();
    })

    it("467 is adjacent to a symbol", () => {
        expect(isAdjacent(example, 467)).toBeTruthy();
    })

    it("114 is not adjacent to a symbol", () => {
        expect(isAdjacent(example, 114)).toBeFalsy();
    })

    it("664 is adjacent to a symbol (au dessus)", () => {
        expect(isAdjacent(example, 664)).toBeTruthy();
    })

    it("should return all numbers", () => {
        expect(getAllNumbers(example)).toStrictEqual([467, 114, 35, 633, 617, 58, 592, 755, 664, 598])
    })

    it.each(["%", "@", "="])("detect symbol", (s) => {
        expect(isSymbol(s)).toBeTruthy();
    })
})

describe('part2', function () {
    it("example return 467835",()=>{
        expect(sumOfGears(example)).toBe(467835);
    })

    it("example 2 return 6756",()=>{
        expect(sumOfGears(example2)).toBe(6756);
    })

    it("should get stars",()=>{

        expect(getStarsFromInput(example)[0]).toStrictEqual({
            star:{
                ligne:1,
                colonne:3
            },
            nombreAdjacent:[467,35]
        });
        expect(getStarsFromInput(example)[1]).toStrictEqual({
            star:{
                ligne:4,
                colonne:3
            },
            nombreAdjacent:[617]
        })
    })

    it("should get stars from input 2",()=>{

        expect(getStarsFromInput(example2)[1]).toStrictEqual({
            star:{
                ligne:4,
                colonne:2
            },
            nombreAdjacent:[78,78]
        })
    })
});


test("part 1 ", () => {
    console.log(getSumOfPartNumbersWithoutAdjacentSymbol(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day3\\input.txt")));
})

test("part 2 ", () => {
    console.log(sumOfGears(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day3\\input.txt")));
})