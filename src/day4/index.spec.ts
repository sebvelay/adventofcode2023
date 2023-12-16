import {calculatePoint, getTotalForElf, getWinningNumbers, part2} from "./index";
import {readFile} from "../util/util";

const example =
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n" +
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n" +
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n" +
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n" +
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n" +
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"


describe("part 1",()=>{

    it("should return 13 from example",()=>{
        expect(getTotalForElf(example)).toBe(13);
    })

    it("should return wining number for card1",()=>{
        expect(getWinningNumbers("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")).toStrictEqual([48,83,86,17])
    })


    it("should return points for one line",()=>{


        expect(calculatePoint([48,83,17,86])).toBe(8);
    })

    it("part 1 ", () => {
        console.log(getTotalForElf(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day4\\input.txt")));
    })

})



describe("part 2",()=>{
    it("example",()=>{
        expect(part2(example)).toBe(30);
    })
})