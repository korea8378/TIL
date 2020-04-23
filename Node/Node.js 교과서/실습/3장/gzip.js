const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);