//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d10/data.txt', 'utf8').toString().split("\n");

// let cycle = 1;
// let X = 1
// let values = []
// for (let command of data) {
//     let instruction = command.split(' ');
//     if (instruction[0] == 'addx') {
//         cycle += 2
//         X += (Number(instruction[1]))
//     } else {
//         cycle++
//     }
//     values.push({
//         cycle: cycle,
//         value: X
//     })
// }
// console.log(cycle)

// console.log(values.find(x => x.cycle == 20).value*20 +
//     values.find(x => x.cycle == 59).value*60 +
//     values.find(x => x.cycle == 100).value*100 +
//     values.find(x => x.cycle == 139).value*140 +
//     values.find(x => x.cycle == 180).value*180 +
//     values.find(x => x.cycle == 220).value*220)

let cycle=0
let dataPos = 0
let CRT = []
let X=1 // middle of sprint
let sprite=0;
do {
    cycle++
    let instruction = data[dataPos].split(' ');
    if (instruction[0] == 'addx') {
        draw()
        cycle++
        draw()
        X += (Number(instruction[1]))
    } else {
        draw()
    }
    dataPos++
} while (cycle < 240)
console.log(cycle)
//console.log(CRT)
console.log(CRT.slice(0,40).join(''))
console.log(CRT.slice(41,80).join(''))
console.log(CRT.slice(81,120).join(''))
console.log(CRT.slice(121,160).join(''))
console.log(CRT.slice(161,200).join(''))
console.log(CRT.slice(201,240).join(''))

function draw() {
    let strip = Math.floor(CRT.length/40)
    let position = CRT.length - (40*strip)
    //console.log(cycle,strip,CRT.length,position)
    if (position >= X-1 && position <= X+1) {
        CRT.push('#')
    } else {
        CRT.push('.')
    }
}