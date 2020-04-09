function sum(a, b) {
  return new Promise((resolve, reject) => {
    var sum = a + b
    if(sum < 0) {
      reject(sum)
    } else {
      resolve(sum)
    }
  })
}

sum(5,3)
  .then((result) => {
    console.log(result)
    return result
  })
  .then((sum) => {
    console.log(sum * sum)
    return sum * sum
  })
  .catch((result) => {
    console.log(result)
  })