import * as fs from "fs";

export function readFile(fileName:string):string{
    let content:string;
    try{
        content = fs.readFileSync(fileName,'utf-8')
    } catch (error){
        console.log(error)
    }
    return content;
}