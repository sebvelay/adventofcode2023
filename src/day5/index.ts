export const getLowestSeed = (input: string): number => {

    let seeds = getSeeds(input);

    let locations = seeds.map(s=>getLocationForSeed(input,s));

    return Math.min(...locations);
}

export const getLowestSeedPart2 = (input: string): number => {

    let seeds = getSeeds(input);

    let min : number = getLocationForSeed(input,seeds[0]);

    for(let i=0;i<seeds.length;i=i+2){
        for(let j = 0; j<seeds[i+1];j++){

            min = Math.min(min,getLocationForSeed(input,seeds[i]+j));
        }
    }




    return min;
}

export const getSeeds = (input:string): number[] => {
    return input.split("\n")[0].match(/\b\d+\b/g).map(e=>+e);
}

export const getSeedsForPart2 = (seeds:number[]) : number[] => {
    const result : number[] = [];

    for(let i=0;i<seeds.length;i=i+2){
        for(let j = 0; j<seeds[i+1];j++){
            result.push((seeds[i]+j));
        }
    }

    return result;
}

export const getLocationForSeed = (input:string,seed:number) => {
    //step 1 : on recupère le soil for seed

    const seedToSoil = getMapFor(input,"seed");
    const soil = getDestinationForSource(seed,seedToSoil);

    const soilToFertilizer = getMapFor(input,"soil");
    const fertilizer = getDestinationForSource(soil,soilToFertilizer);

    const fertilizerToWater = getMapFor(input,"fertilizer")
    const water = getDestinationForSource(fertilizer,fertilizerToWater);

    const waterToLight = getMapFor(input,"water")
    const light = getDestinationForSource(water,waterToLight)

    const lightToTemperature = getMapFor(input,"light")
    const temperature = getDestinationForSource(light,lightToTemperature)

    const temperatureToHumidity = getMapFor(input,"temperature")
    const humidity = getDestinationForSource(temperature,temperatureToHumidity)

    const humidityToLocation = getMapFor(input,"humidity")
    const location = getDestinationForSource(humidity,humidityToLocation)

    return location

}

export const getDestinationForSource = (numerToSearch: number, map: MapExo): number => {

    //vérifier si il y a un mapping possible
    //ce qui veut dire ... avoir source <= nombre < source+rangeLength

    for (let i = 0; i < map.sources.length; i++) {
        let source = map.sources[i];
        let length = map.rangeLength[i];
        let destination = map.destinations[i];
        if (
            (source <= numerToSearch)
            &&
            (numerToSearch < (source + length))
        ) {

            return destination + (numerToSearch-source);

        }
    }

    return numerToSearch;
}

export const getDestination = (input: string): number => {
    return +input.match(/\b\d+\b/)[0];
}

export const getSource = (input: string): number => {
    return +input.match(/\b\d+\b/g)[1];
}

export const getRangeLength = (input: string): number => {
    return +input.match(/\b\d+\b/g)[2];
}

const cacheMapFor = new Map<string,MapExo>;

export const getMapFor = (input: string, searchParam: string): MapExo => {


    if(cacheMapFor.has(searchParam)){
        return cacheMapFor.get(searchParam);
    }

    const lignes = input.split("\n");

    //on lit les lignes jusqu'au param recherché
    const destinations: number[] = [];
    const source: number[] = [];
    const rangeLength: number[] = [];
    for (let i = 0; i < lignes.length; i++) {
        if (lignes[i].includes(searchParam + "-to-")) {
            //on est sur le bon bloc, on va lire jusqua ce qu'on ai une ligne vide
            i++;
            let end = false;
            for (i; end == false; i++) {
                if (i === lignes.length || lignes[i].trim() === "") {
                    end = true;
                    let newVar = {name: searchParam, destinations, sources: source, rangeLength};
                    cacheMapFor.set(searchParam,newVar)
                    return newVar;
                }
                destinations.push(getDestination(lignes[i]));
                source.push(getSource(lignes[i]));
                rangeLength.push(getRangeLength(lignes[i]));
            }
        }
    }

    return
}

export type MapExo = {
    name: string;
    destinations: number[];
    sources: number[];
    rangeLength: number[];
}