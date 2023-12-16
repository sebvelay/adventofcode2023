"use strict";
const {readFile} = require("../util/util");
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapFor = exports.getRangeLength = exports.getSource = exports.getDestination = exports.getDestinationForSource = exports.getLocationForSeed = exports.getSeedsForPart2 = exports.getSeeds = exports.getLowestSeedPart2 = exports.getLowestSeed = void 0;
var getLowestSeed = function (input) {
    var seeds = (0, exports.getSeeds)(input);
    var locations = seeds.map(function (s) { return (0, exports.getLocationForSeed)(input, s); });
    return Math.min.apply(Math, locations);
};
exports.getLowestSeed = getLowestSeed;
var getLowestSeedPart2 = function (input) {
    var seeds = (0, exports.getSeeds)(input);
    var min = (0, exports.getLocationForSeed)(input, seeds[0]);
    for (var i = 0; i < seeds.length; i = i + 2) {
        for (var j = 0; j < seeds[i + 1]; j++) {
            min = Math.min(min, (0, exports.getLocationForSeed)(input, seeds[i] + j));
        }
    }
    return min;
};
exports.getLowestSeedPart2 = getLowestSeedPart2;
var getSeeds = function (input) {
    return input.split("\n")[0].match(/\b\d+\b/g).map(function (e) { return +e; });
};
exports.getSeeds = getSeeds;
var getSeedsForPart2 = function (seeds) {
    var result = [];
    for (var i = 0; i < seeds.length; i = i + 2) {
        for (var j = 0; j < seeds[i + 1]; j++) {
            result.push((seeds[i] + j));
        }
    }
    return result;
};
exports.getSeedsForPart2 = getSeedsForPart2;
var getLocationForSeed = function (input, seed) {
    //step 1 : on recupère le soil for seed
    var seedToSoil = (0, exports.getMapFor)(input, "seed");
    var soil = (0, exports.getDestinationForSource)(seed, seedToSoil);
    var soilToFertilizer = (0, exports.getMapFor)(input, "soil");
    var fertilizer = (0, exports.getDestinationForSource)(soil, soilToFertilizer);
    var fertilizerToWater = (0, exports.getMapFor)(input, "fertilizer");
    var water = (0, exports.getDestinationForSource)(fertilizer, fertilizerToWater);
    var waterToLight = (0, exports.getMapFor)(input, "water");
    var light = (0, exports.getDestinationForSource)(water, waterToLight);
    var lightToTemperature = (0, exports.getMapFor)(input, "light");
    var temperature = (0, exports.getDestinationForSource)(light, lightToTemperature);
    var temperatureToHumidity = (0, exports.getMapFor)(input, "temperature");
    var humidity = (0, exports.getDestinationForSource)(temperature, temperatureToHumidity);
    var humidityToLocation = (0, exports.getMapFor)(input, "humidity");
    var location = (0, exports.getDestinationForSource)(humidity, humidityToLocation);
    return location;
};
exports.getLocationForSeed = getLocationForSeed;
var getDestinationForSource = function (numerToSearch, map) {
    //vérifier si il y a un mapping possible
    //ce qui veut dire ... avoir source <= nombre < source+rangeLength
    for (var i = 0; i < map.sources.length; i++) {
        var source = map.sources[i];
        var length_1 = map.rangeLength[i];
        var destination = map.destinations[i];
        if ((source <= numerToSearch)
            &&
                (numerToSearch < (source + length_1))) {
            return destination + (numerToSearch - source);
        }
    }
    return numerToSearch;
};
exports.getDestinationForSource = getDestinationForSource;
var getDestination = function (input) {
    return +input.match(/\b\d+\b/)[0];
};
exports.getDestination = getDestination;
var getSource = function (input) {
    return +input.match(/\b\d+\b/g)[1];
};
exports.getSource = getSource;
var getRangeLength = function (input) {
    return +input.match(/\b\d+\b/g)[2];
};
exports.getRangeLength = getRangeLength;
var cacheMapFor = new Map;
var getMapFor = function (input, searchParam) {
    if (cacheMapFor.has(searchParam)) {
        return cacheMapFor.get(searchParam);
    }
    var lignes = input.split("\n");
    //on lit les lignes jusqu'au param recherché
    var destinations = [];
    var source = [];
    var rangeLength = [];
    for (var i = 0; i < lignes.length; i++) {
        if (lignes[i].includes(searchParam + "-to-")) {
            //on est sur le bon bloc, on va lire jusqua ce qu'on ai une ligne vide
            i++;
            var end = false;
            for (i; end == false; i++) {
                if (i === lignes.length || lignes[i].trim() === "") {
                    end = true;
                    var newVar = { name: searchParam, destinations: destinations, sources: source, rangeLength: rangeLength };
                    cacheMapFor.set(searchParam, newVar);
                    return newVar;
                }
                destinations.push((0, exports.getDestination)(lignes[i]));
                source.push((0, exports.getSource)(lignes[i]));
                rangeLength.push((0, exports.getRangeLength)(lignes[i]));
            }
        }
    }
    return;
};

exports.getMapFor = getMapFor;

console.log(getLowestSeedPart2(readFile("C:\\Users\\Seb\\dev\\perso\\adventofcode2023\\src\\day5\\input")))