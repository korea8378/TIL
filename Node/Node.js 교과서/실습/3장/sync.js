const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme2.txt');
console.log('3번', data.toString());
console.log('끝');