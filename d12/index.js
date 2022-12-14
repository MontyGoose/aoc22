

//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d12/sample.txt', 'utf8').toString().split("\n");

let values = 'SabcdefghijklmnopqrstuvwxyzE';


class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    dijkstra(source) {
        let distances = {},
            parents = {},
            visited = new Set();
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }
            parents[this.vertices[i]] = null;
        }
        
        let currVertex = this.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }
            visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(distances, visited);
        }

        // console.log(parents);
        // console.log(Object.keys(parents).length);
        // console.log(distances);
    }

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }
}
var graph = new Graph();

let points = []
let width = 0;
let height = 0;
let start = '';
let end = '';

//build graph (vertices)
for (let y in data) {
    width = data[y].length
    if (data[y].indexOf('S') > -1) start = data[y].indexOf('S') + ',' + Number(y);
    if (data[y].indexOf('E') > -1) end = data[y].indexOf('E') + ',' + Number(y);
    points.push(data[y].split(''))
    for (let x in data[y].split('')) {
        graph.addVertex(x + ',' + y)
    }
    height++
}
console.log(width, height)
console.log(start, end)
//console.log(points)
//build edges
for (let vertex in graph.adjacencyList) {
    // console.log(vertex)
    //  if (vertex == '0,1') {
    let edges = getEdgeValues(vertex)
    //console.log(edges)
    for (let edge of edges) {
        graph.addEdge(edge.v1, edge.v2, edge.w)
    }
    //   }
}

graph.dijkstra(start, end);
console.log(graph.dijkstra.parents)
///get path
let done = false
let find = end
let path = []
do {
    path.push(find)
    find = graph.dijkstra.parents[find];
    if (find == start) done=true
} while (!done)

console.log(path)



function getEdgeValues(vertex) {
    let possible = []
    let pos = vertex.split(',').map(Number) //x0 y1
    let newx = 0,
        newy = 0;
    //up
    newx = pos[0], newy = pos[1] - 1;
    if (newy >= 0) {
        possible = addToEdgeArray(possible, pos[0], pos[1], newx, newy);
    }
    //down
    newx = pos[0], newy = pos[1] + 1;
    if (newy < height) {
        possible = addToEdgeArray(possible, pos[0], pos[1], newx, newy);
    }
    //right
    newx = pos[0] + 1, newy = pos[1];
    if (newx < width) {
        possible = addToEdgeArray(possible, pos[0], pos[1], newx, newy);
    }
    //left
    newx = pos[0] - 1, newy = pos[1];
    if (newx >= 0) {
        possible = addToEdgeArray(possible, pos[0], pos[1], newx, newy);
    }
    return possible
}

function addToEdgeArray(array, cx, cy, x, y) {
    let cp = points[cy][cx]
    let p = points[y][x]
    // console.log('looking to add:',x,y,p,pos)
    let w = values.indexOf(p) - values.indexOf(cp)
    if (w <= 1) {
        w = Math.abs(w)
        //  console.log('adding',diff)
        array.push({
            v1: cx + ',' + cy,
            v2: x + ',' + y,
            w: w
        })
    }
    return array
}

//seenpoints.push(start)
//getOptions(start, 0, [start])

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
            console.log('done?', length - 1)
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