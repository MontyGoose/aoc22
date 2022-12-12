//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d11/sample.txt', 'utf8').toString().split("\n");
//       ^ change this


let sample_monkeys = [{
        items: [79, 98],
        op: 'old * 19',
        test: 23,
        ok: 2,
        nok: 3,
        inspected: 0
    },
    {
        items: [54, 65, 75, 74],
        op: 'old+6',
        test: 19,
        ok: 2,
        nok: 0,
        inspected: 0
    },
    {
        items: [79, 60, 97],
        op: 'old*old',
        test: 13,
        ok: 1,
        nok: 3,
        inspected: 0
    },
    {
        items: [74],
        op: 'old+3',
        test: 17,
        ok: 0,
        nok: 1,
        inspected: 0
    }
]
let data_monkeys = [{
        items: [50, 70, 54, 83, 52, 78],
        op: 'old * 3',
        test: 11,
        ok: 2,
        nok: 7,
        inspected: 0
    },
    {
        items: [71, 52, 58, 60, 71],
        op: 'old*old',
        test: 7,
        ok: 0,
        nok: 2,
        inspected: 0
    },
    {
        items: [66, 56, 56, 94, 60, 86, 73],
        op: 'old+1',
        test: 3,
        ok: 7,
        nok: 5,
        inspected: 0
    },
    {
        items: [83, 99],
        op: 'old+8',
        test: 5,
        ok: 6,
        nok: 4,
        inspected: 0
    },
    {
        items: [98, 98, 79],
        op: 'old + 3',
        test: 17,
        ok: 1,
        nok: 0,
        inspected: 0
    },
    {
        items: [76],
        op: 'old+4',
        test: 13,
        ok: 6,
        nok: 3,
        inspected: 0
    },
    {
        items: [52, 51, 84, 54],
        op: 'old*17',
        test: 19,
        ok: 4,
        nok: 1,
        inspected: 0
    },
    {
        items: [82, 86, 91, 79, 94, 92, 59, 94],
        op: 'old+7',
        test: 2,
        ok: 5,
        nok: 3,
        inspected: 0
    }
]

let monkeys = data_monkeys

//get number that is divisble by all the tests we have
let divisor = monkeys.reduce((acc, monkey) => {
    return acc * monkey.test;
  }, 1);
console.log(divisor)

let loop = 0
do {
    loop++
    for (let cheeky of monkeys) {
        for (let item of cheeky.items) {
            let old = item
            let number = eval(cheeky.op) //part1 /3
            //if number is divisible by divisor, then reduce it.
            number %= divisor
            if (number % cheeky.test == 0) {
                // console.log('-- throw to',cheeky.ok)
                monkeys[cheeky.ok].items.push(number)
            } else {
                // console.log('-- throw to',cheeky.nok)
                monkeys[cheeky.nok].items.push(number)
            }
            cheeky.inspected++
        }
        cheeky.items = []
    }
    if (loop % 500 == 0) console.log(loop)
} while (loop < 10000)

//console.log(monkeys)
console.log('--------')
for (let m of monkeys) {
    console.log(m.inspected)
}
//console.log(monkeys.sort((a,b)=>a.inspected-b.inspected))