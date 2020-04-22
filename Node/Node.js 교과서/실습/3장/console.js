const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
          key: 'value',
        },
    },
};
console.time('전체 시간'); // time end와 대응되어 사용
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean); // 평범한 로그
console.error('에러 메시지는 console.error에 담아주세요.'); // 에러 

console.dir(obj, { colors: false, depth: 2});
console.dir(obj, { colors: true, depth: 1}); //객체 표시

console.time('시간 측정');
for (let i = 0; i < 100000; i++) {
  continue;
}
console.timeEnd('시간 측정'); //시간 측정

function b() {
  console.trace('에러 위치 추적'); //상세 보기
}
function a() {
  b();
}
a();

console.timeEnd('전체 시간');
