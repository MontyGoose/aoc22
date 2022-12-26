//load data into structure
var fs = require('fs')
var data = fs.readFileSync('./d25/data.txt', 'utf8').toString().split("\n");
//       ^ change this

const getDec = (snafu) => {
    let value = 0
    snafu = snafu.split("").reverse()
    snafu.forEach((digit, power) => {
        if (digit == '=') digit = -2;
        if (digit == '-') digit = -1;
        let base = Math.pow(5, power)
        value += digit * base
    })
    return value
}

const getSnafu = (decimal) => {
    let root = 30;
    let snafu = []
    do {
        root--
        let factor = Math.pow(5, root)
        let check = Math.round(decimal / factor)
        if (Math.abs(check) != 0) {
            factor *= check;
            decimal -= factor
        }
        if (check == -2) snafu.push('=')
        else if (check == -1) snafu.push('-')
        else snafu.push(check)
    } while (root > 0)


    return snafu.join('').replace(/^0+/, '')
}

let total = 0
data.forEach((s, i) => {
    let value = getDec(s)
    total += value;
})
console.log(total)
let snafu = getSnafu(total)
console.log(snafu)