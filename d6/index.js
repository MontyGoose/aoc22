//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d6/data.txt', 'utf8').toString().split("\n");

let comms = []

for (let stream of data) {

    for (const [i, char] of stream.split('').entries()) {
        if (comms.length == 14) { //part1 (4) //part2 (14)
            if (comms.length === new Set(comms).size) {
                console.log('done:', i)
                break;
            }
            comms.shift()
        }
        comms.push(char)
    }
}