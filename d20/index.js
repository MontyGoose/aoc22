//load data into structure
var fs = require('fs');
const {
    type
} = require('os');
var data = fs.readFileSync('./d20/data.txt', 'utf8').toString().split("\r\n").map(Number);


let listLen = data.length;

let codeArray = JSON.parse(JSON.stringify(data));

const arraymove = (arr, element, fromIndex, toIndex) => {
    if (toIndex <= 0) {
        arraymove(arr, element, fromIndex, arr.length -1 + toIndex)
    } else if (toIndex > arr.length - 1) {
        arraymove(arr, element, fromIndex, toIndex - arr.length +1)
    } else {
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
}

data.forEach((element, i) => {
    let currentPos = codeArray.indexOf(element)
    let moveTo = currentPos + element
    arraymove(codeArray, element, currentPos, moveTo)
})

let mods = []
mods.push(1000 % codeArray.length)
mods.push(2000 % codeArray.length)
mods.push(3000 % codeArray.length)
let i0 = codeArray.indexOf(0)

mods.forEach(mod => {
    let i = i0+mod
    console.log(i0,mod,i0+mod, codeArray.length)
    if (i > codeArray.length - 1) {
        i = i - codeArray.length
    } 
        console.log(codeArray[i])
})