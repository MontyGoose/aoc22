//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d2/data.txt','utf8').toString().split("\n");

const rps = {
  AX:4, //'draw', 3+1
  AY:8, //'win',  6+2
  AZ:3, //'lose', 0+3
  BX:1, //'lose', 0+1
  BY:5, //'draw', 3+2
  BZ:9, //'win',  6+3
  CX:7, //'win',  6+1
  CY:2, //'lose', 0+2
  CZ:6, //'draw'  3+3
} 


const rps2 = {
  AX:3, //lose 0+3 rock ... sci 0+3
  AY:4, //draw 3+1 rock ... rock  3+1
  AZ:8, //win 6+2  rock ... paper  6+2
  BX:1, //lose 0+1 paper .... rock  0+1
  BY:5, // draw 3+2 paper ... paper 3+2
  BZ:9, // win 6+3  paper .. sci   6+3
  CX:2, //lose 0+3  sci .. paper  0+2
  CY:6, // draw 3+3  sci ... sci  3+3
  CZ:7, //win 6+1   sci .. rock  6+1
} 

totalscore = 0
for (let moves of data) {
  movedata = moves.split(' ').join('')
 totalscore += rps2[movedata]
}
console.log(totalscore)
