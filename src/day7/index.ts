export function getHands(example: string): Hand[] {

    return example.split("\n").map(
        l => {
            let strings = l.split(" ");
            return {
                cards:strings[0],
                //orderCard: strings[0].split("").sort().reverse().join(""),
                bid: +strings[1]
            }
        }
    )

}

export function isFiveOf(cards: string): boolean {
    cards = cards.split("").sort().reverse().join("");
    return /(.)\1\1\1\1/.test(cards);
}

export function isFourOf(cards: string): boolean {
    cards = cards.split("").sort().reverse().join("");
    return /(.).*\1.*\1.*\1/.test(cards);
}

export function isFull(cards: string): boolean {
    cards = cards.split('').sort().join('');
    let regex = /^(\w)\1\1(\w)\2$/;
    if (regex.test(cards)) {
        return true;
    }
    cards = cards.split('').sort().reverse().join('');
    return regex.test(cards);
}

export function isThreeOf(cards: string): boolean {
    cards = cards.split("").sort().reverse().join("");

    let regex = /^.*(\w).*\1.*\1.*$/;
    return regex.test(cards)
}

export function isTwoPair(cards: string): boolean {
    if(isThreeOf(cards) || isFull(cards) || isFourOf(cards) || isFiveOf(cards)){
        return false;
    }
    const orderedCards = cards.split("").sort();
    let previous = "";
    let firstPair = false;
    for (const c of orderedCards) {
        if (c == previous) {
            if (!firstPair) {
                firstPair = true
            } else {
                return true
            }
        }
        previous=c;
    }
    return false

}

export function isOnePair(cards: string): boolean {
    cards = cards.split("").sort().reverse().join("");

    if (isTwoPair(cards) || isThreeOf(cards) || isFourOf(cards) || isFull(cards) || isFiveOf(cards)) {
        return false;
    }
    return /^.*(\w).*\1.*$/.test(cards);
}

export function valueOf(c: string): number {

    if (c === "T")
        return 10
    if (c === "J")
        return 11
    if (c === "Q")
        return 12
    if (c === "K") {
        return 13
    }
    if (c === "A") {
        return 14
    }

    return +c;
}

export function maxValue(s: string): number {
    let max = 0;
    let strings = s.split("");
    for (let i = 0; i < strings.length; i++) {
        let value = valueOf(strings[i]);
        if (value > max) {
            max = value;
        }
    }
    return max;
}

export function orderByRankCards(example: string): Hand[] {
    return getHands(example).sort(orderCard);
}


/*
* si a < b = -1
* si a = b = 0
* si a > b = 1
 */
function orderCard(a: Hand, b: Hand): number {

    if (isFiveOf(a.cards) && !isFiveOf(b.cards)) {
        return 1;
    }
    if (!isFiveOf(a.cards) && isFiveOf(b.cards)) {
        return -1;
    }
    if (isFiveOf(a.cards) && isFiveOf(b.cards)) {
        return compareCards(a, b)
    }

    if (isFourOf(a.cards) && !isFourOf(b.cards)) {
        return 1;
    }
    if (!isFourOf(a.cards) && isFourOf(b.cards)) {
        return -1;
    }
    if (isFourOf(a.cards) && isFourOf(b.cards)) {
        return compareCards(a, b);
    }


    if (isFull(a.cards) && !isFull(b.cards)) {
        return 1;
    }
    if (!isFull(a.cards) && isFull(b.cards)) {
        return -1;
    }
    if (isFull(a.cards) && isFull(b.cards)) {
        return compareCards(a, b);
    }

    if (isThreeOf(a.cards) && !isThreeOf(b.cards)) {
        return 1;
    }
    if (!isThreeOf(a.cards) && isThreeOf(b.cards)) {
        return -1;
    }
    if (isThreeOf(a.cards) && isThreeOf(b.cards)) {
        return compareCards(a, b);
    }

    if (isTwoPair(a.cards) && !isTwoPair(b.cards)) {
        return 1
    }
    if (!isTwoPair(a.cards) && isTwoPair(b.cards)) {
        return -1
    }
    if (isTwoPair(a.cards) && isTwoPair(b.cards)) {
        return compareCards(a, b)
    }

    if (isOnePair(a.cards) && !isOnePair(b.cards)) {
        return 1
    }
    if (!isOnePair(a.cards) && isOnePair(b.cards)) {
        return -1
    }
    if (isOnePair(a.cards) && isOnePair(b.cards)) {
        return compareCards(a, b)
    }

    if (maxValue(a.cards) > maxValue(b.cards)) {
        return 1
    }
    if (maxValue(a.cards) < maxValue(b.cards)) {
        return -1
    }

    if (maxValue(a.cards) === maxValue(b.cards)) {
        let valuesForA = a.cards.split("").map(c => valueOf(c)).sort(function (a, b) {
            return b - a;
        });
        let valuesForb = b.cards.split("").map(c => valueOf(c)).sort(function (a, b) {
            return b - a;
        });
        for (let i = 0; i < valuesForA.length; i++) {
            if (valuesForA[i] != valuesForb[i]) {
                if (valuesForA[i] > valuesForb[i]) {
                    return 1
                } else {
                    return -1
                }
            }
        }
    }

    console.log("egalité entre " + a.cards + " et " + b.cards)
    return 0
}

function compareCards(a: Hand, b: Hand) {
    if (biggerFirstCard(a.cards, b.cards)) {
        return 1
    } else {
        return -1
    }
}

function biggerFirstCard(a: string, b: string): boolean {
    for (let i = 0; i < a.length; i++) {
        if (valueOf(a[i]) != valueOf(b[i])) {
            return valueOf(a[i]) > valueOf(b[i]);
        }
    }
    return false;
}

export function getTotal(example: string): number {
    let hands = orderByRankCards(example);
    let total = 0;
    for (let i = 0; i < hands.length; i++) {
        total = total + (hands[i].bid * (i + 1))
    }
    return total;
}

export type Hand = {
    cards: string,
    //orderCard?: string,
    bid: number
}