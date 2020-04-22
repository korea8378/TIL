setImmediate(() => {
  console.log('immediate');
});
process.nextTick(() => { //마이크로 태스크 - 우선순위가 높음
  console.log('nextTcik');
});
setTimeout(() => {
  console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise')); //마이크로 태스크 - 우선순위가 높음
