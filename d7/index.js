//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d7/data.txt', 'utf8').toString().split("\n");
//       ^ change this


let currentpos = ['/']
let allfiles = []
let totalfilesize = 0;

for (let info of data) {
    let details = info.split(' ')
    if (details[0] === '$') {

        if (details[1] === 'cd') {
            switch(details[2]) {
                case '/':
                    currentpos = ['/'];
                    break;
                case '..' :
                    currentpos.pop()
                    break;
                default:
                    currentpos.push(details[2])
            }
        }
    } else {
            let file = Number(details[0])
            if (!isNaN(file)) {
            for (let i in currentpos) {  
              let dir = currentpos[i];
              let parent = (i>0) ? currentpos[i-1] : ''; //need to know the parent as we have duplicate folders ... sneaky
                let found = allfiles.find(x => (x.dir === dir && x.parent === parent))
                if (found) {found.filesize += file}
                else {allfiles.push({'dir':dir,'parent':parent,'filesize':file})}
            }
        }
    }
}

console.log('\n\n----part 1---')
let dirs = allfiles.filter(x => x.filesize <= 100000).reduce((acc,val) => {return acc+val.filesize},0)
console.log(dirs)

console.log('\n\n----part 2---')
let fspc = 70000000
let update = 30000000
let totalused = allfiles.find(x=>x.dir === '/').filesize
let unused = fspc - totalused
let required = update - unused;
let candidates = allfiles.filter(x => x.filesize >= required)
let smallest = candidates.reduce((acc,size) => acc.filesize < size.filesize ? acc : size)
console.log(smallest)

