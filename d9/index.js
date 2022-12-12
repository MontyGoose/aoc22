//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d9/data.txt', 'utf8').toString().split("\n");

let knots = [[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}],[{x: 0,y: 0}]] // all positions ... we'll unique after

//knot[0] = head   knot['lastone'] = tail
for (let move of data) {
    console.log("move:",move)
    let command = move.split(' ') // 0 direction 1 amount
    let direction = command[0]
    let amount = Number(command[1])

    for (let x = 0; x < amount; x++) {
        //move H
        let head_previous = knots[0][knots[0].length - 1];
        let head_new = {
            x: head_previous.x,
            y: head_previous.y
        }
        switch (direction) {
            case 'R':
                head_new.x++;
                break;
            case 'L':
                head_new.x--;
                break;
            case 'U':
                head_new.y++;
                break;
            case 'D':
                head_new.y--;
                break;
        }
        knots[0].push(head_new) // add the new head position

        for (let t = 1; t < knots.length; t++) { //start at one not 0 (as 0 === head)
            // move T
            let knot_pos = knots[t-1][knots[t-1].length - 1]
            let tail_previous = knots[t][knots[t].length - 1]
            // find distance between H and T
            let directionX = knot_pos.x - tail_previous.x
            let directionY = knot_pos.y - tail_previous.y
            let dist = Math.sqrt(Math.pow(directionX, 2) + Math.pow(directionY, 2))
            //only move dist > 1.5
            if (dist > 1.5) {
                let xDist = Math.abs(directionX) === 2 ? directionX / 2 : directionX
                let yDist = Math.abs(directionY) === 2 ? directionY / 2 : directionY
                let pos_new = {
                    x: tail_previous.x+xDist,
                    y: tail_previous.y+yDist
                }
                knots[t].push(pos_new) 
            }
        }
    }
}

 let unique = new Set(knots[9].map(x => x.x + ',' + x.y));
 console.log(unique.size)
