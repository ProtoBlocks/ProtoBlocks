const crypto = require('crypto')
const uuid = require('uuid-random')

module.exports.hash = (str) => {
  return crypto.createHash('sha256').update(str).digest('hex')
}

module.exports.nonce = uuid
