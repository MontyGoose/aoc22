//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d3/data.txt','utf8').toString().split("\n");

let charString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

// let found = []
// for (let rucksack of data) {
//   const partOne = rucksack.slice(0, rucksack.length / 2)
//   const partTwo = rucksack.slice(rucksack.length / 2, rucksack.length)

//   localCommon = []
//   for(let i in partOne) {
//     partTwo.includes(partOne[i]) ? localCommon.push(partOne[i]) : false;
//   }
//   found.push(localCommon.filter((v, i, a) => a.indexOf(v) === i)); //get unique
// }


// let val = found.map(x=> charString.indexOf(x) + 1)
// val = val.reduce((a, b) => a + b, 0)
// console.log(val)


//Part2
let found=[]
for (let i = 0; i < data.length; i += 3) {
  const chunk = data.slice(i, i + 3);
  chunk.sort(function (a, b) { return b.length - a.length })[0]; // put array in length order

  localCommon = []
  for(let i in chunk[0]) {
    chunk[1].includes(chunk[0][i]) ? localCommon.push(chunk[0][i]) : false; 
  }  
  localCommon =localCommon.filter((v, i, a) => a.indexOf(v) === i); //get unique
  for(let common of localCommon) {
    chunk[2].indexOf(common) > -1 ? found.push(common) : false
  }
}
console.log('--------\n',found.length)
let val = found.map(x=> charString.indexOf(x) + 1)
val = val.reduce((a, b) => a + b, 0)
console.log(val)