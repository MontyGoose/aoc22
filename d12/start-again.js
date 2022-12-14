//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d12/sample.txt', 'utf8').toString().split("\r\n");

let values = 'SabcdefghijklmnopqrstuvwxyzE';

let points = []
let width = 0;
let height = 0;
let start = '';
let end = '';

//build points ... y and x
for (let y in data) {
    width = data[y].length
    if (data[y].indexOf('S') > -1) start = {
        x: data[y].indexOf('S'),
        y: Number(y)
    }
    if (data[y].indexOf('E') > -1) end = {
        x: data[y].indexOf('E'),
        y: Number(y)
    }
    points.push(data[y].split(''))
    height++
}

console.log(width, height)
console.log(start, end)

let visited = points.map((line) => line.map(() => false));
let shortestPaths = points.map((line) => line.map(() => Infinity));
shortestPaths[end.y][end.x] = 0

//start at the end and work to start

let nodes = [end]
do {

    let pos = nodes.shift() //grab the first of the node list & add to visited
    let posHeight = values.indexOf(points[pos.y][pos.x])

    visited[pos.y][pos.x] = true

    let neighbours = [{
            x: pos.x,
            y: pos.y - 1
        },
        {
            x: pos.x,
            y: pos.y + 1
        },
        {
            x: pos.x - 1,
            y: pos.y
        },
        {
            x: pos.x + 1,
            y: pos.y
        },
    ];


    // filter to only those in bounds
    neighbours = neighbours.filter((neighbour) => {
        return points[neighbour.y]?.[neighbour.x] !== undefined;
    });

    neighbours.forEach(n => {
        let nHeight = values.indexOf(points[n.y][n.x])
       // console.log(pos, posHeight, n, nHeight)
        if (posHeight >= nHeight - 1) {
            let shortestDist = shortestPaths[n.y][n.x] + 1;
            let currShortestDist = shortestPaths[pos.y][pos.x];
            shortestPaths[pos.y][pos.x] = Math.min(currShortestDist, shortestDist);
        }
        if (!visited[n.y][n.x] && posHeight <= nHeight + 1) {
           nodes.push(n);
           visited[n.y][n.x] = true;

        }
    })

} while (nodes.length > 0)

console.log(shortestPaths)
console.log(shortestPaths[start.y][start.x])