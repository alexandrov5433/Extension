// let numbers = ['2,5',
// '2,5',
// '1,56',
// '23',
// '34,5',
// '34,12',
// '567',
// '357,9',
// '236,78',
// '4.678',
// '2.457,4',
// '2.460,80',
// '234.512.345',
// '234.512.345,3',
// '234.512.345,34',

// '2',
// '2.5',
// '1.56',
// '23',
// '34.5',
// '34.12',
// '567',
// '357.9',
// '236.78',
// '4,678',
// '2,457.4',
// '2,460.80',
// '234,512,345',
// '234,512,345.3',
// '234,512,345.34'];

// let regex = /^([0-9]{1,3}\.)+[0-9]{3}$/;

// numbers.forEach(n => {
//     let match = n.match(regex);
//     if (match) {
//         console.log(match[0]);
//     }
// });

// console.log(Number('234.5'));

function parseToNum(str) {
    //example str = '2.460,80'
    const patterns = {
        'floatCommaDecimalSep': new RegExp(',[0-9]{1,2}$'),
        'floatPointDecimalSep': new RegExp('\\.[0-9]{1,2}$'),
        'intCommaThauSep': new RegExp('^([0-9]{1,3},)+[0-9]{3}$'),
        'intPointThauSep': new RegExp('^([0-9]{1,3}\.)+[0-9]{3}$')
    };
    const parseMeth = {
        'floatCommaDecimalSep': (arg) => {
            let [whole, dec] = arg.split(',');
            if (whole.includes('.')) {
                whole = whole.replaceAll('.', '');
            }
            return Number(`${whole}.${dec}`);
        },
        'floatPointDecimalSep': (arg) => {
            let [whole, dec] = arg.split('.');
            if (whole.includes(',')) {
                whole = whole.replaceAll(',', '');
            }
            return Number(`${whole}.${dec}`);
        },
        'intCommaThauSep': (arg) => {
            return Number(arg.replaceAll(',', ''));
        },
        'intPointThauSep': (arg) => {
            return Number(arg.replaceAll('.', ''));
        },
    };

    for (let pat in patterns) {
        let match = str.match(patterns[pat]);
        if (match) {
            return parseMeth[pat](str);
        }
    }
}

console.log(parseToNum('5,4'));