const crypto = require('crypto')
const uuid = require('uuid-random')

module.exports.hash = (str) => {
  crypto.createHash('sha256').update(str).digest('hex')
}

module.exports.nonce = uuid
