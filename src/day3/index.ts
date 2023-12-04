export function getSumOfPartNumbersWithoutAdjacentSymbol(input: string): number {
    return getPartNumbers(input)
        .reduce((acc, number) => acc + number, 0);
}

export function getPartNumbers(input: string): number[] {

    const partNumbers: number[] = [];

    let allNumbers = getAllNumbers(input);

    //pour chaque nombre, je regarde si j'ai un symbol
    for (const numberToCheck of allNumbers) {
        if (isAdjacent(input, numberToCheck)) {
            partNumbers.push(numberToCheck);
        }
        //ensuite je remplace le nombre par une suite de point
        input = input.replace(numberToCheck.toString(), '.'.repeat(numberToCheck.toString().length))
    }
    return partNumbers;
}

export function isAdjacent(input: string, number: number): boolean {
    /*
        etre adjacent à un symbol, ça veut dire :
        que j'ai un symbol en début ou fin de nombre
        ou j'ai un symbol au dessus de n'importe quel de mes nombres
        ou j'ai un symbol en dessous de n'importe quel de mes nombres
        ou j'ai un symbol en haut à gauche du premier nombre
        ou j'ai un symbol en haut à droite du dernier nombre
        ou j'ai un symbol en bas à gauche du premier nombre
        ou j'ai un symbol en bas à droite du dernier nombre
         */

    //je récupère la position de mon occurence

    let position = positionOf(input, number.toString());
    if (position === undefined) {
        throw new Error("Position non trouvé")
    }
    let lignes = input.split("\n");
    //si j'ai un symbol au début
    if (isSymbol(lignes[position.ligne].charAt(position.colonne - 1))) {
        return true;
    }
    //si j'ai un symbol à la fin
    if (isSymbol(lignes[position.ligne].charAt(position.colonne + number.toString().length))) {
        return true;
    }
    //si j'ai un symbol quelque part au dessus (inclus dessus diagonale +1 -1)
    if (position.ligne > 0) {
        for (let i = position.colonne - 1; i <= number.toString().length + position.colonne; i++) {
            if (isSymbol(lignes[position.ligne - 1].charAt(i))) {
                return true;
            }
        }
    }

    //si j'ai un symbol quelque part en dessous (inclus dessous diagonale +1 -1)
    if (position.ligne < lignes.length) {
        for (let i = position.colonne - 1; i <= number.toString().length + position.colonne; i++) {
            if (isSymbol(lignes[position.ligne + 1].charAt(i))) {
                return true;
            }
        }
    }


    return false;
}


export function adjacentStar(input: string, number: number): Position {
    //je récupère la position de mon occurence

    let position = positionOf(input, number.toString());
    if (position === undefined) {
        return undefined;
    }
    let lignes = input.split("\n");
    //si j'ai un symbol au début
    if (isStar(lignes[position.ligne].charAt(position.colonne - 1))) {
        return {
            ligne: position.ligne,
            colonne: position.colonne - 1
        };
    }
    //si j'ai un symbol à la fin
    if (isStar(lignes[position.ligne].charAt(position.colonne + number.toString().length))) {
        return {
            ligne: position.ligne,
            colonne: position.colonne + number.toString().length
        };
    }
    //si j'ai un symbol quelque part au dessus (inclus dessus diagonale +1 -1)
    if (position.ligne > 0) {
        for (let i = position.colonne - 1; i <= number.toString().length + position.colonne; i++) {
            if (isStar(lignes[position.ligne - 1].charAt(i))) {
                return {
                    ligne: position.ligne - 1,
                    colonne: i
                };
            }
        }
    }

    //si j'ai un symbol quelque part en dessous (inclus dessous diagonale +1 -1)
    if (position.ligne + 1 < lignes.length) {
        for (let i = position.colonne - 1; i <= number.toString().length + position.colonne; i++) {
            if (isStar(lignes[position.ligne + 1].charAt(i))) {
                return {
                    ligne: position.ligne + 1,
                    colonne: i
                }
            }
        }
    }


    return undefined;
}

export function positionOf(inputMultiLigne: string, textToSearch: string): Position {

    const lignes = inputMultiLigne.split("\n");
    for (let i = 0; i < lignes.length; i++) {
        let pos = lignes[i].indexOf(textToSearch);
        if (pos != -1) {
            return {ligne: i, colonne: pos}
        }
    }

    return undefined;
}

export function isSymbol(c: string): boolean {
    if (c.match(/^[^0-9.]$/)) {
        return true;
    }
    return false;
}

export function isStar(c: string): boolean {
    if (c.match(/\*/)) {
        return true;
    }
    return false;
}

export function getAllNumbers(example: string): number[] {

    return example.match(/(\d+)/g).map(el => parseInt(el));
}

export function getStarsFromInput(inputMultiLigne: string): Star[] {

    let stars: Star[] = [];
    const lignes = inputMultiLigne.split("\n");
    for (let i = 0; i < lignes.length; i++) {
        for (let j = 0; j < lignes[i].length; j++) {
            if (lignes[i].charAt(j) === "*") {
                stars.push({
                    star: {
                        ligne: i,
                        colonne: j
                    },
                    nombreAdjacent: []
                })
            }
        }
    }

    //on prend chaque nombre
    let allNumbers = getAllNumbers(inputMultiLigne);
    //on regarde si on a une star adjacente
    for(const number of allNumbers){
        let adjacent = adjacentStar(inputMultiLigne,number);
        if(adjacent){
            //on va mettre à jour la star
            for(const star of stars){
                if(star.star.colonne===adjacent.colonne && star.star.ligne===adjacent.ligne){
                    star.nombreAdjacent.push(number);
                }

            }
        }
        const subst = 'ù'.repeat(number.toString().length);
        inputMultiLigne = inputMultiLigne.replace(number.toString(), subst);
    }


    return stars;
}

export function sumOfGears(input: string): number {

    const baseInput = input;

    let total = 0;

    let starsFromInput = getStarsFromInput(input);
    for(const star of starsFromInput){
        if(star.nombreAdjacent.length===2){
            total=total+(star.nombreAdjacent[0]*star.nombreAdjacent[1])
        }
    }

    return total;
}

type Position = {
    ligne: number;
    colonne: number
}

export type Star = {
    star: Position;
    nombreAdjacent: number[];
}