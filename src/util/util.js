"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
var fs = require("fs");
function readFile(fileName) {
    var content;
    try {
        content = fs.readFileSync(fileName, 'utf-8');
    }
    catch (error) {
        console.log(error);
    }
    return content;
}
exports.readFile = readFile;
