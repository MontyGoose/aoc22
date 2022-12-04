//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d4/data.txt', 'utf8').toString().split("\n");

let found = 0;
for (let assigmment of data) {

    let groups = assigmment.split(',')
    console.log(groups)
    let clean = []
    for (let pairs of groups) {
        let range = pairs.split('-').map(Number)
        for (let number of range) {
            clean.push(number)
        }
    }

   console.log(clean)
    if ((clean[0] >= clean[2] && clean[1] <= clean[3]) || (clean[2] >= clean[0] && clean[3] <= clean[1]) || 
        (clean[0] <= clean[2] && clean[1] >= clean[2]) || (clean[2] <= clean[0] && clean[3] >= clean[0])) {
        console.log("found")
        found++
    }
}
console.log('found:',found)