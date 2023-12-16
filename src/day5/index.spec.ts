import {
    getDestination,
    getMapFor,
    getLowestSeed,
    getRangeLength,
    getDestinationForSource,
    getSource,
    MapExo, getLocationForSeed, getSeeds, getSeedsForPart2, getLowestSeedPart2
} from "./index";
import {getTotalForElf} from "../day4";
import {readFile} from "../util/util";

const example = "" +
    "seeds: 79 14 55 13\n" +
    "\n" +
    "seed-to-soil map:\n" +
    "50 98 2\n" +
    "52 50 48\n" +
    "\n" +
    "soil-to-fertilizer map:\n" +
    "0 15 37\n" +
    "37 52 2\n" +
    "39 0 15\n" +
    "\n" +
    "fertilizer-to-water map:\n" +
    "49 53 8\n" +
    "0 11 42\n" +
    "42 0 7\n" +
    "57 7 4\n" +
    "\n" +
    "water-to-light map:\n" +
    "88 18 7\n" +
    "18 25 70\n" +
    "\n" +
    "light-to-temperature map:\n" +
    "45 77 23\n" +
    "81 45 19\n" +
    "68 64 13\n" +
    "\n" +
    "temperature-to-humidity map:\n" +
    "0 69 1\n" +
    "1 0 69\n" +
    "\n" +
    "humidity-to-location map:\n" +
    "60 56 37\n" +
    "56 93 4";

describe("part1", () => {

    it("the lowest seed is 35", () => {
        const result = getLowestSeed(example);
        expect(result).toBe(35);
    })

    const map: MapExo = {
        name: "seed",
        destinations: [50, 52],
        sources: [98, 50],
        rangeLength: [2, 48]
    }

    it("Seed number 79 corresponds to soil number 81", () => {
        const result = getDestinationForSource(79, map);
        expect(result).toBe(81);
    })

    it("Seed number 14 corresponds to soil number 14", () => {
        const result = getDestinationForSource(14, map);
        expect(result).toBe(14);
    })

    it("Seed number 55 corresponds to soil number 57", () => {
        const result = getDestinationForSource(55, map);
        expect(result).toBe(57);
    })

    it("Seed number 13 corresponds to soil number 13", () => {
        const result = getDestinationForSource(13, map);
        expect(result).toBe(13);
    })

    it("should return destination 50 for 50 98 2", () => {
        expect(getDestination("50 98 2")).toBe(50);
    })

    it("should return source 98 for 50 98 2", () => {
        expect(getSource("50 98 2")).toBe(98);
    })

    it("should return range length 2 for 50 98 2", () => {
        expect(getRangeLength("50 98 2")).toBe(2);
    })

    it("should return list of destinations for seed", () => {
        expect(getMapFor(example, "seed").destinations).toStrictEqual([50, 52]);
    })

    it("should return list of destinations for seed", () => {
        expect(getMapFor(example, "humidity").destinations).toStrictEqual([60, 56]);
    })

    it("should return list of source for seed", () => {
        expect(getMapFor(example, "seed").sources).toStrictEqual([98, 50]);
    })

    it("should return list of range length for seed", () => {
        expect(getMapFor(example, "seed").rangeLength).toStrictEqual([2, 48]);
    })


    // it("should return location 82 for seed 79",()=>{
    //     expect(getLocationForSeed(example,79)).toBe(82);
    // })


    it.each([[79, 82], [14, 43], [55, 86], [13, 35]])("should return location %i for seed %i", (seed, expected) => {
        expect(getLocationForSeed(example, seed)).toBe(expected);
    })

    it("should return seed", () => {
        expect(getSeeds(example)).toStrictEqual([79, 14, 55, 13])
    })


    it("part 1 ", () => {
        console.log(getLowestSeed(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day5\\input")));
    })


})

describe('part2', () => {
    it("should return seed by pair",()=>{
        let originalSeeds = getSeeds(example);
        let part2Seeds = getSeedsForPart2(originalSeeds);

        expect(part2Seeds.length).toBe(27);
    })

    it('get lowest with new seed',()=>{
        expect(getLowestSeedPart2(example)).toBe(46)
    })

    it("part 2 ", () => {
        console.log(getLowestSeedPart2(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day5\\input")));
    })
});