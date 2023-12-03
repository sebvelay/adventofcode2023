export function sumOfIdsForPossibleGame(input: string): number {
    return exportGameFromInput(input)
        .filter(game => {
                for (const set of game.sets) {
                    if (set.red > 12) {
                        return false
                    }
                    if (set.blue > 14) {
                        return false;
                    }
                    if (set.green > 13) {
                        return false;
                    }
                }
                return true;
            }
        )
        .map(game => game.id)
        .reduce((acc, id) => acc + id, 0);
}

export function powerOfGames(input: string): number {

    return exportGameFromInput(input)
        .map(game=>{
            let minBlue = 0;
            let minRed = 0;
            let minGreen = 0;
            for(const set of game.sets){
                if(minBlue<set.blue){
                    minBlue=set.blue;
                }
                if(minRed<set.red){
                    minRed=set.red;
                }
                if(minGreen<set.green){
                    minGreen=set.green
                }
            }
            return minGreen*minRed*minBlue;
        })
        .reduce((acc,val)=>acc+val,0);
}



export function exportGameFromInput(input: string): Game[] {
    return input.split("\n")
        .map(line => createGameFromLine(line));
}

export function createGameFromLine(input: string): Game {
    let id = parseInt(input.match(/Game (\d+):/)[1]);
    let sets: Set[] = [];

    let groupeOfSet = input.match(/([^;]+)/g);
    groupeOfSet.map(group => {
        sets.push(exportSetOfColor(group));
    })
    return {
        id,
        sets
    };
}

export function exportSetOfColor(input: string): Set {

    let blue = 0;
    if (input.match(/(\d+) blue/)) {
        blue = parseInt(input.match(/(\d+) blue/)[1])
    }

    let red = 0;
    if (input.match(/(\d+) red/)) {
        red = parseInt(input.match(/(\d+) red/)[1])
    }

    let green = 0;
    if (input.match(/(\d+) green/)) {
        green = parseInt(input.match(/(\d+) green/)[1])
    }

    return {
        blue,
        red,
        green
    }
}

export type Game = {
    id: number;
    sets: Set[];
}

export type Set = {
    green: number;
    red: number;
    blue: number;
}