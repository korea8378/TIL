const fs = require('fs');

const readStream = fs.createReadStream('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme4.txt');
const writeStream = fs.createWriteStream('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/writeme3.txt');
readStream.pipe(writeStream);