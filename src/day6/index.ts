
export const getTotalPart1 = (input:string) : number => {

    const races = getRace(input);
    return races.reduce((acc,el)=>acc * getNumbersOfOptionForRace(el),1)

}

export const getTotalPart2 = (input:string) : number => {
    let buildRacePart = buildRacePart2(input);
    let races = getRace(buildRacePart);
    return races.reduce((acc,el)=>acc * getNumbersOfOptionForRace(el),1)
}

export function buildRacePart2(input: string) : string {
    return input.replace(/ /g,'')
}

export const getRace = (input:string) : Race[] => {
    const races = [];

    const times = input.split("\n")[0].match((/\d+/g)).map(e=>+e);
    const distances = input.split("\n")[1].match((/\d+/g)).map(e=>+e);

    for(let i=0;i<times.length;i++){
        races.push({
            time:times[i],
            distance:distances[i]
        })
    }

    return races;
}

export const getNumbersOfOptionForRace = (race: Race) : number => {

    return getAllOptionsForRace(race).length;
}

export const getAllOptionsForRace = (race:Race) : number[] => {

    const options = [];

    for(let i=1;i<race.time;i++){
        // si j'appuie x seconde, je perd x seconde et j'avance de x * time-x
        if(i*(race.time-i) > race.distance){
            options.push(i)
        }


    }

    return options;

}

export type Race = {
    time:number;
    distance:number;
}