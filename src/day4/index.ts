export function getTotalForElf(example: string) : number {

    return example.split("\n")
        .map(line=>getWinningNumbers(line))
        .map(n=>calculatePoint(n))
        .reduce((acc,val)=>acc+val,0)


}

function getElfNumbers(allNumbers: RegExpMatchArray) {
    return allNumbers[1].split(" | ")[0].split(/\s+/);
}

function getAllNumbersToTest(allNumbers: RegExpMatchArray) {
    return allNumbers[1].split(" | ")[1].split(/\s+/);
}

export function getWinningNumbers(line: string) : number[] {
    let winningNumber : number[] = [];
    //get all numbers :
    const allNumbers = line.match(/:\s*(\d+\s*.*)/);

    const elfNumbers = getElfNumbers(allNumbers);
    const numbers = getAllNumbersToTest(allNumbers);

    for(const number of elfNumbers){
        if(numbers.indexOf(number)!=-1){
            winningNumber.push(parseInt(number));
        }
    }
    return winningNumber;
}

export function calculatePoint(numbers: number[]):number {
    let res = 0;
    if(numbers.length>0){
        res = 1;
        for(let i=1;i<numbers.length;i++){
            res = res*2;
        }
    }
    return res;
}

export function part2(example: string) {

    let strings = example.split("\n");
    for(let i=0;i<strings.length;i++){
        let winningNumbers = getWinningNumbers(strings[i]);
        let nombreGagnant = winningNumbers.length;
        let lineToDouble : string[]=[];
        for(let j=1;j<=nombreGagnant;j++){
            lineToDouble.push(strings[i+j]);
            //strings.splice(i+j,0,strings[i+j]);
        }
        //on ajoute les lignes
        for(let j=0;j<lineToDouble.length;j++){
            strings.splice(i+1+j,0,lineToDouble[j]);

        }
    }

    return undefined;
}