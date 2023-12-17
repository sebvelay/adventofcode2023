import {
    buildRacePart2,
    getAllOptionsForRace,
    getNumbersOfOptionForRace,
    getRace,
    getTotalPart1,
    getTotalPart2,
    Race
} from "./index";
import {readFile} from "../util/util";

const example = "Time:      7  15   30\n" +
    "Distance:  9  40  200"

describe("part1",()=>{

    it("get the race",()=>{
        expect(getRace(example).length).toBe(3);
    })

    it("get 4 options for race 1",()=>{
        const race : Race = {
            time:7,
            distance:9
        }

        expect(getNumbersOfOptionForRace(race)).toStrictEqual(4)
    })

    it("should return options for race 1",()=>{
        const race : Race = {
            time:7,
            distance:9
        }

        expect(getAllOptionsForRace(race)).toStrictEqual([2,3,4,5])

    })

    it("should return options for race 3",()=>{
        const race : Race = {
            time:30,
            distance:200
        }

        expect(getAllOptionsForRace(race)).toStrictEqual([11,12,13,14,15,16,17,18,19])

    })

    it("should return total",()=>{
        expect(getTotalPart1(example)).toBe(288);
    })

    it("part 1 ", () => {
        console.log(getTotalPart1(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day6\\input")));
    })

})

describe("part 2 ",()=>{
    it("build part 2",()=>{
        expect(getRace(buildRacePart2(example))).toStrictEqual([{time:71530,distance:940200}])
    })

    it("part 2 ", () => {
        console.log(getTotalPart2(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day6\\input")));
    })
})
