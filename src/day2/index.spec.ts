import {createGameFromLine, exportGameFromInput, Game, powerOfGames, sumOfIdsForPossibleGame} from "./index";
import {readFile} from "../util/util";

const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"

test("example of part 1 should return 8", () => {
    expect(sumOfIdsForPossibleGame(input)).toBe(8);
})

test("example for part 2 should return 2286",()=>{

    expect(powerOfGames(input)).toBe(2286);
})



test("should create game from input", () => {

    expect(exportGameFromInput(input).length).toBe(5);
})

test("should create game from line", () => {
    const expected: Game = {
        id: 100,
        sets: [
            {
                blue: 3,
                green: 0,
                red: 4
            },
            {
                blue: 6,
                green: 2,
                red: 1
            },
            {
                blue: 0,
                green: 2,
                red: 0
            }
        ]
    }
    expect(createGameFromLine("Game 100: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")).toStrictEqual(expected);
})


test("part 1 ", () => {
    console.log(sumOfIdsForPossibleGame(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day2\\input.txt")));
})

test("part 2 ", () => {
    console.log(powerOfGames(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day2\\input.txt")));
})