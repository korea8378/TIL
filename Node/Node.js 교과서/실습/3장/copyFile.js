const fs = require('fs');

fs.copyFile('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/readme4.txt', '/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/writeme4.txt', (error) => {
  if (error) {
    return console.error(error);
  }
  console.log('복사 완료');
});