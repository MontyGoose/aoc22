//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d8/data.txt', 'utf8').toString().split("\n");

let trees = []
for (let rows of data) {
    trees.push(rows.split(''))
}

// --------
// PART ONE
// --------

// let numberTrees = Math.pow(trees.length, 2) - Math.pow(trees.length-2 , 2)
// //dont like double loops .... but
// for (let row in trees) {
// for (let col in trees[row]) {
// //ignore outside trees
// if (row > 0 && row < trees.length-1 && col > 0 && col < trees.length-1) {
// let tree = trees[row][col]
// vis = 0;
// // did I say I didn't like dbl loops .. grr
// if (isVisible(0, Number(col)-1, row,col, 'row') ||
// isVisible(Number(col)+1, trees.length-1, row,col, 'row') ||
// isVisible(0, Number(row)-1, row,col, 'col') ||
// isVisible(Number(row)+1, trees.length-1, row,col, 'col'))
// {numberTrees++}
// }
// }
// }
// console.log(numberTrees)

// ---------
// PART TWO
// ---------

//still dont like double loops .... but
let senicScore = 0
for (let row in trees) {
    for (let col in trees[row]) {
        //ignore outside trees
        if (row > 0 && row < trees.length - 1 && col > 0 && col < trees.length - 1) {
            let tree = trees[row][col]
            // did I say I didn't like dbl loops .. grr
            let senicS = senic(row, col);
            if (senicS > senicScore) senicScore = senicS
        }
    }
}
console.log("--------------")
console.log(senicScore)

function isVisible(start, finish, treerow, treecol, direction) {
    let vis = true;
    if (direction == 'row') {
        for (let x = start; x <= finish; x++) {
            if (treeCheck(treerow, x, treerow, treecol)) vis = false;
        }
    }
    if (direction == 'col') {
        for (let x = start; x <= finish; x++) {
            if (treeCheck(x, treecol, treerow, treecol)) vis = false
        }
    }
    return vis
}

function senic(treerow, treecol) {
    let l = 0,
        r = 0,
        u = 0,
        d = 0;
    //look left - go back
    for (let x = treecol - 1; x >= 0; x--) {
        l++;
        if (treeCheck(treerow, x, treerow, treecol)) break;
    }
    //look right - go fwd
    for (let x = Number(treecol) + 1; x < trees.length; x++) {
        r++;
        if (treeCheck(treerow, x, treerow, treecol)) break;
    }
    // look up - go back
    for (let x = treerow - 1; x >= 0; x--) {
        u++;
        if (treeCheck(x, treecol, treerow, treecol)) break;
    }
    // look down - go fwd
    for (let x = Number(treerow) + 1; x < trees.length; x++) {
        d++;
        if (treeCheck(x, treecol, treerow, treecol)) break;
    }
    return lru * d
}

function treeCheck(tr1, tc1, tr2, tc2) {
    return trees[tr1][tc1] >= trees[tr2][tc2]
}