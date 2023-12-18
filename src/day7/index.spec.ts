import {
    getHands, getTotal,
    isFiveOf,
    isFourOf,
    isFull,
    isOnePair,
    isThreeOf,
    isTwoPair, maxValue,
    orderByRankCards,
} from "./index";
import {readFile} from "../util/util";

const example = "32T3K 765\n" +
    "T55J5 684\n" +
    "KK677 28\n" +
    "KTJJT 220\n" +
    "QQQJA 483"

describe("part 1", () => {

    it("get hands", () => {

        expect(getHands(example)).toContainEqual({
            cards: "KTJJT",
            bid: 220
        })

        expect(getHands(example).length).toBe(5);
    })

    it("should return true if five of", () => {
        expect(isFiveOf("AAAAA")).toBeTruthy();
    })

    it("should return false if not five of", () => {
        expect(isFiveOf("AAAA1")).toBeFalsy();
    })

    it("should return true if four of", () => {
        expect(isFourOf("AAA3A")).toBeTruthy();
    })

    it("should return false if not five of", () => {
        expect(isFourOf("AAAB1")).toBeFalsy();
    })

    it("it's a full ", () => {
        expect(isFull("ABABB")).toBeTruthy();
    })

    it("it's not a full ", () => {
        expect(isFull("ABA1B")).toBeFalsy();
    })

    it.each([["53332"], ["AB1BB"]])("%p it's a three of ", (number) => {
        expect(isThreeOf(number)).toBeTruthy();
    })

    it("it's not a three of ", () => {
        expect(isThreeOf("ABA1B")).toBeFalsy();
    })

    //{
    //   "cards": "55443",
    //   "bid": 835
    // }
    it.each([["A1AEE"], ["55443"]])("%p it's a two pair", (cards) => {
        expect(isTwoPair(cards)).toBeTruthy()
    })
//TJ443
    it.each([["TJ443"], ["A1AE2"]])("%p it's not two pair", (cards) => {
        expect(isTwoPair(cards)).toBeFalsy()
    })

    it("it's one pair", () => {
        expect(isOnePair("A1231")).toBeTruthy()
    })

    it.each([["A1AEE"], ["55443"], ["A1234"]])("%p it's not one pair", (cards) => {
        expect(isOnePair(cards)).toBeFalsy()
    })

    it("should return max value of hands", () => {


        expect(maxValue("23KA9")).toBe(14)
    })

    it("should order hands", () => {


        expect(orderByRankCards(example)).toStrictEqual([{cards: "32T3K", bid: 765}, {cards: "KTJJT", bid: 220}, {
            cards: "KK677",
            bid: 28
        }, {cards: "T55J5", bid: 684}, {cards: "QQQJA", bid: 483}])
    })

    it("should order hand with only value", () => {
        const example = "3J247 765\n" +
            "56472 684\n" +
            "J5628 28"

        expect(orderByRankCards(example)).toStrictEqual([{cards: "56472", bid: 684}, {
            cards: "3J247",
            bid: 765
        }, {cards: "J5628", bid: 28}])
    })

    it("should order 33332 and 2AAAA", () => {
        const example = "33332 0\n" +
            "2AAAA 0";

        expect(orderByRankCards(example)).toStrictEqual([{
            cards: "2AAAA",
            bid: 0
        }, {cards: "33332", bid: 0}])
    })

    it("should order 77888 and 77788", () => {
        const example = "77888 0\n" +
            "77788 0";

        expect(orderByRankCards(example)).toStrictEqual([{
            cards: "77788",
            bid: 0
        }, {cards: "77888", bid: 0}])
    })

    it("should calculate result", () => {


        expect(getTotal(example)).toBe(6440);
    })

    it("should order hand with two and one pair", () => {
        const example = "QKJA6 0\n" +
            "55443 0\n" +
            "TJ443 0\n" +
            "TJ522 0"

        expect(orderByRankCards(example)).toStrictEqual([
            {cards: "QKJA6", bid: 0},
            {cards: "TJ443", bid: 0},
            {cards: "TJ522", bid: 0},
            {cards: "55443", bid: 0}])
    })

    /*
189 = Object {cards: "QKJA6",
bid: 150}
190 = Object {cards: "55443",
bid: 835}
294 = Object {cards: "TJ443",
bid: 963}
295 = Object {cards: "TJ522",
bid: 190}
     */

    it("part 1 ", () => {
        console.log(getTotal(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day7\\input")));
    })

})

