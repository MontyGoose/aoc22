//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d12/data.txt', 'utf8').toString().split("\n");

let values = 'SabcdefghijklmnopqrstuvwxyzE';

let points = []
let width = 0;
let height = 0;
let start = '';
for (let y in data) {
    width = data[y].length
    if (data[y].indexOf('S') > -1) start = {
        y: Number(y),
        x: data[y].indexOf('S'),
        val: 'S'
    }
    points.push(data[y].split(''))
    height++
}
console.log(width, height)
//seenpoints.push(start)
getOptions(start, 0, [start])

// find possible....
//only possible if 1 higher
// not outside of grid!
// not in any other trail  ()


function getOptions(position, length, seen) {
    //console.log('getting ,,,',position)
    //console.log(length)
    seen = seen.slice(0, length)
    let options = getValues(position, seen)
    //console.log( ' ----- options from here ... ',options.length)
    //seen = seen.concat(options)
    for (let option of options) {
        seen.push(option)
        if (option.val == 'E') {
            console.log('done?', length-1)
        }
        length++
        getOptions(option, length, seen)
    }
}

function getValues(pos, seenpoints) {
    let possible = []
    if (pos.val == 'S') pos.val = 'a'
    let newx = 0,
        newy = 0;
    //up
    newx = pos.x, newy = pos.y - 1;
    if (newy >= 0 && !seenpoints.find(p => (p.x == newx && p.y == newy))) {
        possible = addToArray(possible, pos, newx, newy);
    }
    //down
    newx = pos.x, newy = pos.y + 1;
    if ((pos.y + 1) < height && !seenpoints.find(p => (p.x == newx && p.y == newy))) {
        possible = addToArray(possible, pos, newx, newy);
    }
    //right
    newx = pos.x + 1, newy = pos.y;
    if ((pos.x + 1) < width && !seenpoints.find(p => (p.x == newx && p.y == newy))) {
        possible = addToArray(possible, pos, newx, newy);
    }
    //left
    newx = pos.x - 1, newy = pos.y;
    if ((pos.x - 1) >= 0 && !seenpoints.find(p => (p.x == newx && p.y == newy))) {
        possible = addToArray(possible, pos, newx, newy);
    }
    return possible
}

function addToArray(array, pos, x, y) {
    let p = points[y][x]
    // console.log('looking to add:',x,y,p,pos)
    let diff = values.indexOf(p) - values.indexOf(pos.val)
    if (diff <= 1) {
        //  console.log('adding',diff)
        array.push({
            x: x,
            y: y,
            val: p
        })
    }
    return array
}