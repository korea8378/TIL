const fs = require('fs');

fs.writeFile('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/writeme.txt', '글이 입력됩니다', (err) => {
  if (err) {
    throw err;
  }
  fs.readFile('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/writeme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data.toString());
  });
});