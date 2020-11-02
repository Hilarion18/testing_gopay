const bcrypt = require('bcryptjs')

function checkPassword (salt, password, email) {
  return new Promise((resolve, reject) => {
      const emailPassword = email + password
      bcrypt.compare(emailPassword, salt, function (err, data) {
          console.log(`data`, data);
          console.log(`err`, err);
          if (data) {
              resolve(data)
          } else {
              reject(err)
          }
      });
  })
}

module.exports = checkPassword
// export default checkPassword