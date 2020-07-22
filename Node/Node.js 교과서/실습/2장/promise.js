// function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     var sum = a + b
//     if(sum < 0) {
//       reject(sum)
//     } else {
//       resolve(sum)
//     }
//   })
// }

// sum(5,3)
//   .then((result) => {
//     console.log(result)
//     return result
//   })
//   .then((sum) => {
//     console.log(sum * sum)
//     return sum * sum
//   })
//   .catch((result) => {
//     console.log(result)
//   })
const crypto = require('crypto');

const encryption = (password => {
	crypto.randomBytes(10, (err, buf) => {
    const salt = buf.toString('base64')
    
    console.log( salt );
		crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) =>{
      console.log( "");
      console.log( key.toString('base64'));
      
		})
	})
})

encryption("mashup_recuriting");