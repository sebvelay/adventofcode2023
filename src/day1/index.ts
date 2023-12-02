import {readFile} from "../util/util";

export function sumOfCalibrationValues(input:String):number{
    return input.split("\n")
        .map(e=>e.replace(/\D/g,''))
        .map(e=>{
            if(e.length==0){
                return "0";
            }
            return e[0]+e[e.length-1]
            }
        )
        .map(e=>parseInt(e))
        .reduce((acc,el)=>acc+el,0)
}

export function sumOfCalibrationValuesPart2(input:String):number{

    input = input.replace(/one/g,'o1ne');
    input = input.replace(/two/g,'t2wo');
    input = input.replace(/three/g,'t3hree');
    input = input.replace(/four/g,'f4our');
    input = input.replace(/five/g,'f5ive');
    input = input.replace(/six/g,'s6ix');
    input = input.replace(/seven/g,'s7even');
    input = input.replace(/eight/g,'e8ight');
    input = input.replace(/nine/g,'n9ine');

    return sumOfCalibrationValues(input);
}