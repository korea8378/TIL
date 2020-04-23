const fs = require('fs');

setInterval(() => {
  fs.unlink('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/abcdefg.js', (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);