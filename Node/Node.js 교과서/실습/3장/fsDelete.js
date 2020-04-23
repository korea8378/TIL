const fs = require('fs');

fs.readdir('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/folder', (err, dir) => {
  if (err) {
    throw err;
  }
  console.log('폴더 내용 확인', dir);
  fs.unlink('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/folder/newFile.js', (err) => {
    if (err) {
      throw err;
    }
    console.log('파일 삭제 성공');
    fs.rmdir('/Users/leedongjun/git/TIL/Node/Node.js 교과서/실습/3장/folder', (err) => {
      if (err) {
        throw err;
      }
      console.log('폴더 삭제 성공');
    });
  });
});