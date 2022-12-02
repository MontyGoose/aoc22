//load data into structure
var fs = require('fs')
var data = fs.readFileSync('data.txt','utf8').toString().split("\n").map(Number);

let totalCal = 0
let results = []
for (let cal of data) {
  if (cal > 0) {
      totalCal+=cal
  }
  else if (cal === 0) {
    results.push(totalCal)
    totalCal = 0
  }
}

results = results.sort(function(a, b){return b-a})
let top3 = results.slice(0,3)
let addedUp = top3.reduce((a,b) => a+b,0)

console.log(top3)
console.log(addedUp)