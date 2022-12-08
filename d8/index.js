//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d8/sample.txt', 'utf8').toString().split("\n");

let trees = []
for (let rows of data) {
    trees.push(rows.split(''))
}
                    
//dont like double loops .... but
for (let row in trees) {
    for (let tree in trees[row]) {
        //ignore outside trees
        if (row != 0 && row != trees.length-1 && tree != 0 && tree != trees.length-1){
            console.log(row,tree)

        }
    }
}
