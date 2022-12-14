//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d14/data.txt', 'utf8').toString().split("\r\n");

let minX0 = Infinity,
    maxX0 = 0
let minY0 = 0,
    maxY0 = 0
data.forEach(row => row.split(" -> ").forEach(pair => {
    let vals = pair.split(",").map(Number);
    if (vals[0] > maxX0) maxX0 = vals[0]
    if (vals[0] < minX0) minX0 = vals[0]
    if (vals[1] > maxY0) maxY0 = vals[1]

}))
console.log(minX0, maxX0, minY0, maxY0)

//lets baseline x and y and build a sandmap
//PARTONE
// let minX = 0
// let maxX = maxX0 - minX0 + 1
// let minY = 0
// let maxY = maxY0 + 1

//PARTTWO
let minX = 0
let maxX = 1000
let minY = 0
let maxY = maxY0 + 2

let sandMap = Array.from({
    length: maxY
}, () => Array.from({
    length: maxX
}, () => '.'));
console.log(minX, maxX, minY, maxY)

//PARTTWO
sandMap.push(Array.from({
    length: maxX
}, () => '#'))

//add blocks
data.forEach(row => {
    let pairs = row.split(" -> ");
    pairs.forEach((pair, i) => {
        let thisPair = pair.split(",").map(Number)
        //thisPair[0] -= minX0 //baslineX //PARTTWO 
        //  console.log("-- ",pair)
        if (i < pairs.length - 1) {
            let nextPair = pairs[i + 1].split(",").map(Number)
            //nextPair[0] -= minX0 //baselineX //PARTTWO
            let startX = thisPair[0],
                endX = nextPair[0]
            let startY = thisPair[1],
                endY = nextPair[1]
            if (thisPair[0] > nextPair[0]) {
                startX = nextPair[0];
                endX = thisPair[0]
            }
            if (thisPair[1] > nextPair[1]) {
                startY = nextPair[1];
                endY = thisPair[1]
            }
            if (startX != endX) {
                //  console.log("    -- adding x ", startX,endX)
                for (let x = startX; x <= endX; x++) {
                    sandMap[startY][x] = '#'
                }
            }
            if (startY != endY) {
                //  console.log("    -- adding y ", startY,endY)
                for (let y = startY; y <= endY; y++) {
                    sandMap[y][startX] = '#'
                }
            }

        } else { //just the last one
            sandMap[thisPair[1]][thisPair[0]] = '#'
        }
    })
})

sandMap.forEach(x => console.log(x.join('')))

//drop some sand
let sandStart = {
    x: 500,// - minX0,
    y: 0
};
let i = 0;
let sandDrop = true;
do {
    i++
    let currentPos = sandStart
    do {
        sandMoving = true
        let down = {
            x: currentPos.x,
            y: currentPos.y + 1
        }
        let downL = {
            x: currentPos.x - 1,
            y: currentPos.y + 1
        }
        let downR = {
            x: currentPos.x + 1,
            y: currentPos.y + 1
        }


        if (sandMap[down.y][down.x] == undefined || sandMap[downL.y][downL.x] == undefined || sandMap[downR.y][downR.x] == undefined) {
            sandMoving = false
            sandDrop = false;
        } else {

            if (sandMap[down.y][down.x] == '.') {
                currentPos = down;
            } else if (sandMap[downL.y][downL.x] == '.') {
                currentPos = downL;
            } else if (sandMap[downR.y][downR.x] == '.') {
                currentPos = downR
            } else {
                if (sandMap[currentPos.y][currentPos.x] == 'o') {sandDrop=false} //PARTWO
                sandMap[currentPos.y][currentPos.x] = 'o'
                sandMoving = false
            }
        }
    } while (sandMoving)
} while (sandDrop)

console.log("\n\n\n--------- SO PRETTY ------------\n\n")
sandMap.forEach(x => console.log(x.join('')))
console.log(i-1)