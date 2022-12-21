//load data into structdataure
var fs = require('fs')
var data = fs.readFileSync('./d21/data.txt', 'utf8').toString().split("\r\n");

let monkeys = []

let testData = [
    'root: abcd + efgh',
    'abcd: 5',
    'efgh: 8'
]

data.forEach((e,i) => {
    let monkeySum = e.split(": ");
    let isNumber = (isNaN(monkeySum[1])) ? false : true;
    monkeys.push( {
        monkey:monkeySum[0],
        value: (isNumber) ? Number(monkeySum[1]) : null ,
        sum: (!isNumber) ? '('+monkeySum[1]+')' : null ,
    } )
})
                    
//PARTONE
let fullSum = 'root'
const getValue = (monkey) => {
    if (monkey.value) fullSum = fullSum.replace(new RegExp(monkey.monkey,""),monkey.value)
    else {
        fullSum = fullSum.replace(new RegExp(monkey.monkey,""),monkey.sum)
        let newMonkeys = []
        newMonkeys.push(monkeys.find(m=>m.monkey == monkey.sum.substring(1,5)))
        newMonkeys.push(monkeys.find(m=>m.monkey == monkey.sum.substring(8,12)))
        newMonkeys.forEach(m => getValue(m))
    }
}
let rootMonkey = monkeys.find(m=>m.monkey=='root')
getValue(rootMonkey)
console.log(eval(fullSum))


const getValuePart2 = (monkey,sumlist) => {
  //  console.log("found:",monkey,fullSum2,sumlist)
    if (monkey.monkey =='humn') return
    if (monkey.value) fullSum2[sumlist] = fullSum2[sumlist].replace(new RegExp(monkey.monkey,""),monkey.value)
    else {
        fullSum2[sumlist] = fullSum2[sumlist].replace(new RegExp(monkey.monkey,""),monkey.sum)
        let newMonkeys = []
        newMonkeys.push(monkeys.find(m=>m.monkey == monkey.sum.substring(1,5)))
        newMonkeys.push(monkeys.find(m=>m.monkey == monkey.sum.substring(8,12)))
        newMonkeys.forEach(m => getValuePart2(m,sumlist))
    }
}


const newtonRaphson = (equation) => {  //https://medium.com/recreational-maths/solving-equations-using-the-newton-raphson-method-938824ddc479
    let error = 1, errorTreshold = 0.1;
    let iteration = 0, maxIterations = 1000;
    let re = /(\d+)/g, match, guess = 0;
    while(match = re.exec(equation)) guess = Math.max(guess, match[1]); //find highest number in sum, an start with that ... doesn't really matter as it will jump
    while (Math.abs(error) >= errorTreshold && iteration <= maxIterations) {
        console.log(iteration,guess)
        let bestGuess = eval(equation.replace(/humn/g, guess))
        let nbg = eval(equation.replace(/humn/g, guess+1))
        let nextBestGuess = (bestGuess - nbg) / -1
        error = bestGuess / nextBestGuess;
        guess = guess - error;
        iteration += 1;
      }
    return guess;
}


//PART 2
let fullSum2 = [];
let monkeyOne = rootMonkey.sum.substring(1,5);
let monkeyTwo = rootMonkey.sum.substring(8,12);
fullSum2.push(monkeyOne)
fullSum2.push(monkeyTwo)
let monkeySum1 = monkeys.find(m=>m.monkey == monkeyOne)
getValuePart2(monkeySum1,0)
let monkeySum2 = monkeys.find(m=>m.monkey == monkeyTwo)
getValuePart2(monkeySum2,1)
let solveThis = fullSum2[0] + '-' + fullSum2[1]
console.log(newtonRaphson(solveThis))