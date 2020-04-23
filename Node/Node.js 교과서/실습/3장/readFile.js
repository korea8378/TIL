const fs = require('fs');

fs.readFile('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});