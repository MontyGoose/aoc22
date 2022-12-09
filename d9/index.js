//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d9/sample.txt', 'utf8').toString().split("\n");
//       ^ change this


let head = [{x:0,y:0}] // all positions
let tail = [{x:0,y:0}] // all positions ... we'll unique after

for (let move of data) {
    console.log(move)
    let command = move.split(' ') // 0 direction 1 amount
    console.log(command)
    for (let x = 0; x <= command[1]; x++) {
        //move H
        let head_previous = head[head.length-1];
        let head_new = {x:head_previous.x,y:head_previous.y}
        switch(command[0]) {
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
        head.push(head_new)
        // move T
        let tail_previous = tail[tail.length-1]
        // find distance between H and T
        let dist = Math.sqrt(Math.pow(head_new.x - tail_previous.x,2) + Math.pow(head_new.y - tail_previous.y,2))
        console.log(dist)
        //only move of > xxxx
        // move to 
    }

}