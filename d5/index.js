//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d5/data.txt', 'utf8').toString().split("\n");

let sample_stacks = {
    1: ['Z', 'N'],
    2: ['M', 'C', 'D'],
    3: ['P']
}


let real_stacks = {
    1: ['D', 'T', 'R', 'B', 'J', 'L', 'W', 'G'],
    2: ['S', 'W', 'C'],
    3: ['R', 'Z', 'T', 'M'],
    4: ['D', 'T', 'C', 'H', 'S', 'P', 'V'],
    5: ['G', 'P', 'T', 'L', 'D', 'Z'],
    6: ['F', 'B', 'R', 'Z', 'J', 'Q', 'C', 'D'],
    7: ['S', 'B', 'D', 'J', 'M', 'F', 'T', 'R'],
    8: ['L', 'H', 'R', 'B', 'T', 'V', 'M'],
    9: ['Q', 'P', 'D', 'S', 'V']
}

let stacks = real_stacks
//part 1
// for (let move of data) {
//     moves = move.split(' ');   // iteration moves[1] ; from moves[3] ; to moves[5]
//     for (let i=0; i< moves[1]; i++) {
//         stacks[moves[5]].push(stacks[moves[3]].pop())
//     }
// }

//part2
for (let move of data) {
    moves = move.split(' '); // crates to move moves[1] ; from moves[3] ; to moves[5]
        stacks[moves[5]].concat(stacks[moves[3]].splice(0 - moves[1], moves[1]));
}



let result = ''
for (const [key, value] of Object.entries(stacks)) {
    result += value.pop()
}
console.log(result)