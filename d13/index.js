//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d13/sample.txt', 'utf8').toString().split("\r\n");

let pairs = [] // pairs as objects for part 1
let pairs2 = [] // pairs as array for part 2
for (let i = 0; i < data.length; i += 3) {
    const chunk = data.slice(i, i + 3);
    pairs.push({
        left: chunk[0],
        right: chunk[1]
    })
    pairs2.push(chunk[0])
    pairs2.push(chunk[1])
}
//special additions for part2
pairs2.push('[[2]]')
pairs2.push('[[6]]')

let order = null //super sloppy global var for capturing order ... I know, I know


//PART ONE
let pairNo = 0;
let answer = 0;
for (let pair of pairs) {
    pairNo++;
    let left = eval(pair.left)
    let right = eval(pair.right)
    order = null;
    checkArray(left, right)
    if (order) answer += pairNo
}
console.log(answer)

//PART TWO ... need to sort the whole array ... QuickSort impl https://www.geeksforgeeks.org/quick-sort/?ref=lbp
let quickSort = (arr, start = 0, end = arr.length) => {
    let pivotIndex = pivot(arr, start, end);

    if (start >= end) return arr;
    quickSort(arr, start, pivotIndex);
    quickSort(arr, pivotIndex + 1, end);

    return arr;
};

let pivot = (arr, start = 0, end = arr.length + 1) => {
    let swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];

    let pivot = arr[start],
        pointer = start;
    
    for (let i = start+1; i < arr.length; i++) {
        // create my left and rights for comparison
        let left = eval(arr[i])
        let right = eval(pivot)
        order = null;
        checkArray(left, right)
        if (order) { // if correct order swap 
            pointer++;
            swap(arr, pointer, i);
        }
    };
    swap(arr, start, pointer);

    return pointer;
}


//part two results
console.log(pairs2)
let sorted = quickSort(pairs2)
// let key = (sorted.findIndex(a=>a=='[[2]]')+1)*(sorted.findIndex(a=>a=='[[6]]')+1)
// console.log(key)


//the comparison function for both part1 and part2
function checkArray(left, right) {
    let size = (left.length > right.length) ? left.length : right.length;
    for (let x = 0; x < size; x++) {
        if (order === null) {
            leftType = typeof left[x]
            rightType = typeof right[x]
            if (leftType == rightType) {
                switch (leftType) {
                    case 'number':
                        if (left[x] < right[x]) order = true;
                        if (left[x] > right[x]) order = false;
                        break;
                    case 'object':
                        checkArray(left[x], right[x]);
                        break;
                }
            } else if (leftType == 'undefined' || rightType == 'undefined') {
                if (leftType === 'undefined') order = true;
                else order = false
            } else {
                if (leftType == 'number') left[x] = [left[x]]
                else right[x] = [right[x]]
                checkArray(left[x], right[x])
            }
        }
    }
}